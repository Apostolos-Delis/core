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

var Util = require('../util.js');
var Post = require('../block/post.js');
var Thread = require('../block/thread.js');
var HashMap = require('../hash/hashMap.js');

module.exports = class Head {
  constructor(originalPost, threadHash, map, startingHeight) {
    // base is the starting point of the chain
    // if this is part of a fork, base is the first block on branch after the fork

    // * run checks *
    Util.assert(originalPost instanceof Post);
    Util.assert(threadHash instanceof Uint8Array);
    Util.assert(map instanceof HashMap);
    Util.assert(typeof(startingHeight) === 'number');
    Util.assert(startingHeight >= 0);

    this.height = startingHeight;
    this.thread = threadHash;
    this.map = map;

    originalPost.thread = this.thread;
    this.head = this.map.set(originalPost);
  }

  pushPost(post) {
    // parameter validation
    Util.assert(post instanceof Post);

    // can't build on top of an empty head
    // XXX: this check *should* be unnecessary
    Util.assert(this.head);

    // check that post points to head
    Util.assertArrayEquality(
      this.head,
      post.header.prevHash()
    );

    // TODO: difficulty check

    // post is OK!
    post.thread = this.thread;
    this.head = this.map.set(post);
    this.height += 1;
  }

  stageThread(thread, hash) {
    // parameter validation
    Util.assert(thread instanceof Thread);
    Util.assert(hash instanceof Uint8Array);

    // can't build on top of an empty head
    Util.assert(this.head);

    // thread has already been checked and set in the map by caller
    // this just runs other checks and sets head
    // hash must equal thread.hash(), but don't waste processing
    // power recomputing it every time

    // get the latest post hash in this thread according to the
    // passed in threadblock
    let latestPost = thread.getPostForThread(this.thread);
    if (latestPost) {
      // assert latestPost hash is equal to head hash
      Util.assertArrayEquality(latestPost, this.head);
    } else {
      // check if genesis case

      // this head's thread hash must equal hash of thread block
      Util.assertArrayEquality(hash, this.thread);

      // post in thread block's genesis row equals this.head
      Util.assertArrayEquality(thread.getPost(0), this.head);
    }

    // thread is OK!
    this.stage = hash;
  }

  discardStage() {
    this.stage = undefined;
  }

  commitThread() {
    Util.assert(this.stage);

    this.head = this.stage;
    this.height += 1;

    this.stage = undefined;
  }

  pushThread(thread, hash) {
    this.stageThread(thread, hash);
    this.commitThread();
  }

  sumWork() {
    return this.work; // don't calculate it every time
  }
}
