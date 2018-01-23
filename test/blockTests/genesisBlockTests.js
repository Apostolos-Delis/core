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

var Genesis = require('../../js/block/genesis.js');
var Header = require('../../js/block/header.js');
var Util = require('../../js/util.js');

module.exports = [
  { description: "Genesis block rejects non-zero previous hash",
    fn: function() {
      let buf = new ArrayBuffer(80);
      let view = new DataView(buf)
      view.setUint8(2, 0x00);
      for (let i = 11; i < 43; i++) {
        view.setUint8(i, 0x01);
      }
      try {
        var b = new Genesis(new Header(buf), new ArrayBuffer(64));
        return false;
      } catch (e) {
        return true;
      }
    }
  },
  { description: "Genesis block accepts all-zero previous hash",
    fn: function() {
      let buf = new ArrayBuffer(80);
      let view = new DataView(buf)
      view.setUint8(2, 0x00);
      for (let i = 11; i < 43; i++) {
        view.setUint8(i, 0x00);
      }
      var b = new Genesis(new Header(buf), new ArrayBuffer(64));
      Util.assert(b);
      Util.assert(b instanceof Genesis);
      return true;
    }
  }
];