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

'use strict';

const Addr = require('../../message/types/addr.js');
const Netaddr = require('../../message/data/netaddr.js');

module.exports = class KnownAccumulator {
  static id() { return 'KNOWN_ACCUMULATOR'; }
  static inputs() { return ['RECEIVER', 'HANDSHAKE']; }

  static attach({ RECEIVER: receiver, HANDSHAKE: handshake }, _, { tracker }) {
    receiver
      // handle addr messages
      .filter(({ data }) => Addr.getCommand(data) === Addr.COMMAND())
      // create the message
      .map(({ data }) => new Addr(data))
      // iterate over netaddr in addr
      .iterate()
      .on(addr => tracker.addKnown(addr));

    handshake
      // add the addresses of incoming connections to known
      .map(({ connection, services }) => {
        const data = new Uint8Array(22);
        Netaddr.set(data, 0, services.mask, connection.ip, connection.port);
        return new Netaddr(data);
      })
      .on(addr => tracker.addConnection(addr));
  }
};
