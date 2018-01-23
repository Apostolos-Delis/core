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

var Difficulty = require('../../js/hash/difficulty.js');
var Util = require('../../js/util.js');

module.exports = [
  { description: "countLeadingZeroes counts number of zeroes in a single byte",
    fn: function() {
      var arr = new Array(32);
      arr[0] = 0b00011011;
      Util.assert(Difficulty.countLeadingZeroes(arr) === 3);
      return true;
    }
  },
  { description: "countLeadingZeroes counts number of zeroes in multiple bytes",
    fn: function() {
      var arr = new Array(32);
      arr[0] = 0;
      arr[1] = 0;
      arr[2] = 0;
      arr[3] = 0b00001011;
      Util.assert(Difficulty.countLeadingZeroes(arr) === 28);
      return true;
    }
  },
  { description: "verifyDifficulty rejects invalid hash",
    fn: function() {
      try {
        Difficulty.verify(undefined, 4);
        return false;
      } catch (e) {
        return true;
      }
    }
  },
  { description: "verifyDifficulty rejects wrong length hash",
    fn: function() {
      try {
        Difficulty.verify(new Array(31), 4);
        return false;
      } catch (e) {
        return true;
      }
    }
  },
  { description: "verifyDifficulty accepts zero array", // XXX: this is pretty weird. code shouldn't allow this?
    fn: function() {
      Difficulty.verify(new Array(32), 4);
      return true;
    }
  },
  { description: "verifyDifficulty rejects too few leading zeroes (single byte)",
    fn: function() {
      var arr = new Array(32);
      arr[0] = 0b00011011; // 3 leading zeroes
      try {
        Difficulty.verify(arr, 4);
        return false;
      } catch (e) {
        return true;
      }
    }
  },
  { description: "verifyDifficulty rejects too few leading zeroes (multiple bytes)",
    fn: function() {
      var arr = new Array(32);
      arr[0] = 0;
      arr[1] = 0;
      arr[2] = 0b00011001; // 19 leading zeroes
      try {
        Difficulty.verify(arr, 20);
        return false;
      } catch (e) {
        return true;
      }
    }
  },
  { description: "verifyDifficulty accepts enough leading zeroes (single byte)",
    fn: function() {
      var arr = new Array(32);
      arr[0] = 0b00000110; // 5 leading zeroes
      Difficulty.verify(arr, 3);
      return true;
    }
  },
  { description: "verifyDifficulty accepts enough leading zeroes (multiple bytes)",
    fn: function() {
      var arr = new Array(32);
      arr[0] = 0;
      arr[1] = 0;
      arr[2] = 0;
      arr[3] = 0;
      arr[4] = 0b00000110; // 37 leading zeroes
      Difficulty.verify(arr, 37);
      return true;
    }
  }
];
