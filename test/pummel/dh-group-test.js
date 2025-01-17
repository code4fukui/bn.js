/* global describe, it */

import { assert, describe, it } from "../describe.js";
import { BN } from "../../lib/bn.js";
import * as fixtures from "../fixtures.js";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";

describe('BN.js/Slow DH test', function () {
  var groups = fixtures.dhGroups;
  Object.keys(groups).forEach(function (name) {
    it('should match public key for ' + name + ' group', function () {
      var group = groups[name];

      //this.timeout(3600 * 1000);

      var base = new BN(2);
      var mont = BN.red(new BN(group.prime, 16));
      var priv = new BN(group.priv, 16);
      var multed = base.toRed(mont).redPow(priv).fromRed();
      var actual = Buffer.from(multed.toArray());
      assert.equal(actual.toString('hex'), group.pub);
    });
  });
});
