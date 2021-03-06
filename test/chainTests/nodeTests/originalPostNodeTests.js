// This file is a part of the protochan project.
// https://github.com/sidmani/protochan
// https://www.sidmani.com/?postid=3

// Copyright (c) 2018 Sid Mani
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const tap = require('tap');
const ErrorType = require('../../../src/core/error.js');
const OriginalPostNode = require('../../../src/core/chain/node/originalPostNode.js');
const HashMap = require('../../../src/core/hash/hashMap.js');

tap.test('OriginalPostNode constructor', (t) => {
  const header = {
    hash: '01020304',
    dataHash: 'fb571f7334867ed0152487f432bd49041e3fb68dc0b5465bfde56f0a59d67c74',
    timestamp() { return 12; },
  };
  const data = new Uint8Array([6, 0, 0, 0, 0, 0]);
  const nodeMap = new HashMap();
  const config = {
    MIN_THREAD_DIFFICULTY: 24,
    MAX_THREAD_DIFFICULTY: 64,
    MAX_THREAD_COUNT: 11,
  };
  let n;
  t.doesNotThrow(() => { n = new OriginalPostNode(header, data, nodeMap, config); });
  t.strictSame(n.data.controlLength, 6, 'OriginalPostNode creates parser');
  t.end();
});

tap.test('OriginalPostNode addChild methods', (t) => {
  const header = {
    hash: '01020304',
    dataHash: 'fb571f7334867ed0152487f432bd49041e3fb68dc0b5465bfde56f0a59d67c74',
    timestamp() { return 12; },
  };
  const data = new Uint8Array([6, 0, 0, 0, 0, 0]);
  const nodeMap = new HashMap();
  const config = {
    MIN_THREAD_DIFFICULTY: 24,
    MAX_THREAD_DIFFICULTY: 64,
    MAX_THREAD_COUNT: 11,
  };
  const n = new OriginalPostNode(header, data, nodeMap, config);
  t.throws(() => n.addChild(), ErrorType.illegalNodeType(), 'addChild always fails');

  const thread = {
    timestamp() { return 12; },
    setThreadHeight(thr, height) {
      this.setThread = thr;
      this.setHeight = height;
    },
    hash: '040508',
  };
  t.throws(() => n.checkThread(thread), ErrorType.timeTravel(), 'checkThread rejects equal timestamps');
  thread.timestamp = () => 13;
  t.doesNotThrow(() => n.checkThread(thread), 'checkThread accepts valid timestamp');
  n.insertThread(thread);
  t.strictSame(thread.setThread, '040508', 'OriginalPostNode sets height of thread in thread block for own hash');
  t.strictSame(thread.setHeight, 0, 'OriginalPostNode sets zero height for thread in thread block');
  t.equal(n.children.get(new Uint8Array([4, 5, 8])), true, 'OriginalPostNode sets thread as child');
  t.end();
});
