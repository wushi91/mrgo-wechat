

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s, n) {
  if (n < s.length + 11) { // TODO: fix for utf-8
    console.error("Message too long for RSA");
    return null;
  }
  var ba = [];
  var i = s.length - 1;
  while (i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if (c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if ((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = [];
  while (n > 2) { // random non-zero pad
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

//#endregion BIT_OPERATIONS

var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  }
  else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}

// Copyright (c) 2005  Tom Wu
// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);
//#region
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
//#endregion
// (public) Constructor
var BigInteger = /** @class */ (function () {
  function BigInteger(a, b, c) {
    if (a != null) {
      if ("number" == typeof a) {
        this.fromNumber(a, b, c);
      }
      else if (b == null && "string" != typeof a) {
        this.fromString(a, 256);
      }
      else {
        this.fromString(a, b);
      }
    }
  }
  //#region PUBLIC
  // BigInteger.prototype.toString = bnToString;
  // (public) return string representation in given radix
  BigInteger.prototype.toString = function (b) {
    if (this.s < 0) {
      return "-" + this.negate().toString(b);
    }
    var k;
    if (b == 16) {
      k = 4;
    }
    else if (b == 8) {
      k = 3;
    }
    else if (b == 2) {
      k = 1;
    }
    else if (b == 32) {
      k = 5;
    }
    else if (b == 4) {
      k = 2;
    }
    else {
      return this.toRadix(b);
    }
    var km = (1 << k) - 1;
    var d;
    var m = false;
    var r = "";
    var i = this.t;
    var p = this.DB - (i * this.DB) % k;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) {
        m = true;
        r = int2char(d);
      }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & ((1 << p) - 1)) << (k - p);
          d |= this[--i] >> (p += this.DB - k);
        }
        else {
          d = (this[i] >> (p -= k)) & km;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if (d > 0) {
          m = true;
        }
        if (m) {
          r += int2char(d);
        }
      }
    }
    return m ? r : "0";
  };
  // BigInteger.prototype.negate = bnNegate;
  // (public) -this
  BigInteger.prototype.negate = function () {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
  };
  // BigInteger.prototype.abs = bnAbs;
  // (public) |this|
  BigInteger.prototype.abs = function () {
    return (this.s < 0) ? this.negate() : this;
  };
  // BigInteger.prototype.compareTo = bnCompareTo;
  // (public) return + if this > a, - if this < a, 0 if equal
  BigInteger.prototype.compareTo = function (a) {
    var r = this.s - a.s;
    if (r != 0) {
      return r;
    }
    var i = this.t;
    r = i - a.t;
    if (r != 0) {
      return (this.s < 0) ? -r : r;
    }
    while (--i >= 0) {
      if ((r = this[i] - a[i]) != 0) {
        return r;
      }
    }
    return 0;
  };
  // BigInteger.prototype.bitLength = bnBitLength;
  // (public) return the number of bits in "this"
  BigInteger.prototype.bitLength = function () {
    if (this.t <= 0) {
      return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
  };
  // BigInteger.prototype.mod = bnMod;
  // (public) this mod a
  BigInteger.prototype.mod = function (a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
      a.subTo(r, r);
    }
    return r;
  };
  // BigInteger.prototype.modPowInt = bnModPowInt;
  // (public) this^e % m, 0 <= e < 2^32
  BigInteger.prototype.modPowInt = function (e, m) {
    var z;
    if (e < 256 || m.isEven()) {
      z = new Classic(m);
    }
    else {
      z = new Montgomery(m);
    }
    return this.exp(e, z);
  };
  // BigInteger.prototype.clone = bnClone;
  // (public)
  BigInteger.prototype.clone = function () {
    var r = nbi();
    this.copyTo(r);
    return r;
  };
  // BigInteger.prototype.intValue = bnIntValue;
  // (public) return value as integer
  BigInteger.prototype.intValue = function () {
    if (this.s < 0) {
      if (this.t == 1) {
        return this[0] - this.DV;
      }
      else if (this.t == 0) {
        return -1;
      }
    }
    else if (this.t == 1) {
      return this[0];
    }
    else if (this.t == 0) {
      return 0;
    }
    // assumes 16 < DB < 32
    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
  };
  // BigInteger.prototype.byteValue = bnByteValue;
  // (public) return value as byte
  BigInteger.prototype.byteValue = function () {
    return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
  };
  // BigInteger.prototype.shortValue = bnShortValue;
  // (public) return value as short (assumes DB>=16)
  BigInteger.prototype.shortValue = function () {
    return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
  };
  // BigInteger.prototype.signum = bnSigNum;
  // (public) 0 if this == 0, 1 if this > 0
  BigInteger.prototype.signum = function () {
    if (this.s < 0) {
      return -1;
    }
    else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
      return 0;
    }
    else {
      return 1;
    }
  };
  // BigInteger.prototype.toByteArray = bnToByteArray;
  // (public) convert to bigendian byte array
  BigInteger.prototype.toByteArray = function () {
    var i = this.t;
    var r = [];
    r[0] = this.s;
    var p = this.DB - (i * this.DB) % 8;
    var d;
    var k = 0;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
        r[k++] = d | (this.s << (this.DB - p));
      }
      while (i >= 0) {
        if (p < 8) {
          d = (this[i] & ((1 << p) - 1)) << (8 - p);
          d |= this[--i] >> (p += this.DB - 8);
        }
        else {
          d = (this[i] >> (p -= 8)) & 0xff;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if ((d & 0x80) != 0) {
          d |= -256;
        }
        if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
          ++k;
        }
        if (k > 0 || d != this.s) {
          r[k++] = d;
        }
      }
    }
    return r;
  };
  // BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.equals = function (a) {
    return (this.compareTo(a) == 0);
  };
  // BigInteger.prototype.min = bnMin;
  BigInteger.prototype.min = function (a) {
    return (this.compareTo(a) < 0) ? this : a;
  };
  // BigInteger.prototype.max = bnMax;
  BigInteger.prototype.max = function (a) {
    return (this.compareTo(a) > 0) ? this : a;
  };
  // BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.and = function (a) {
    var r = nbi();
    this.bitwiseTo(a, op_and, r);
    return r;
  };
  // BigInteger.prototype.or = bnOr;
  BigInteger.prototype.or = function (a) {
    var r = nbi();
    this.bitwiseTo(a, op_or, r);
    return r;
  };
  // BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.xor = function (a) {
    var r = nbi();
    this.bitwiseTo(a, op_xor, r);
    return r;
  };
  // BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.andNot = function (a) {
    var r = nbi();
    this.bitwiseTo(a, op_andnot, r);
    return r;
  };
  // BigInteger.prototype.not = bnNot;
  // (public) ~this
  BigInteger.prototype.not = function () {
    var r = nbi();
    for (var i = 0; i < this.t; ++i) {
      r[i] = this.DM & ~this[i];
    }
    r.t = this.t;
    r.s = ~this.s;
    return r;
  };
  // BigInteger.prototype.shiftLeft = bnShiftLeft;
  // (public) this << n
  BigInteger.prototype.shiftLeft = function (n) {
    var r = nbi();
    if (n < 0) {
      this.rShiftTo(-n, r);
    }
    else {
      this.lShiftTo(n, r);
    }
    return r;
  };
  // BigInteger.prototype.shiftRight = bnShiftRight;
  // (public) this >> n
  BigInteger.prototype.shiftRight = function (n) {
    var r = nbi();
    if (n < 0) {
      this.lShiftTo(-n, r);
    }
    else {
      this.rShiftTo(n, r);
    }
    return r;
  };
  // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  // (public) returns index of lowest 1-bit (or -1 if none)
  BigInteger.prototype.getLowestSetBit = function () {
    for (var i = 0; i < this.t; ++i) {
      if (this[i] != 0) {
        return i * this.DB + lbit(this[i]);
      }
    }
    if (this.s < 0) {
      return this.t * this.DB;
    }
    return -1;
  };
  // BigInteger.prototype.bitCount = bnBitCount;
  // (public) return number of set bits
  BigInteger.prototype.bitCount = function () {
    var r = 0;
    var x = this.s & this.DM;
    for (var i = 0; i < this.t; ++i) {
      r += cbit(this[i] ^ x);
    }
    return r;
  };
  // BigInteger.prototype.testBit = bnTestBit;
  // (public) true iff nth bit is set
  BigInteger.prototype.testBit = function (n) {
    var j = Math.floor(n / this.DB);
    if (j >= this.t) {
      return (this.s != 0);
    }
    return ((this[j] & (1 << (n % this.DB))) != 0);
  };
  // BigInteger.prototype.setBit = bnSetBit;
  // (public) this | (1<<n)
  BigInteger.prototype.setBit = function (n) {
    return this.changeBit(n, op_or);
  };
  // BigInteger.prototype.clearBit = bnClearBit;
  // (public) this & ~(1<<n)
  BigInteger.prototype.clearBit = function (n) {
    return this.changeBit(n, op_andnot);
  };
  // BigInteger.prototype.flipBit = bnFlipBit;
  // (public) this ^ (1<<n)
  BigInteger.prototype.flipBit = function (n) {
    return this.changeBit(n, op_xor);
  };
  // BigInteger.prototype.add = bnAdd;
  // (public) this + a
  BigInteger.prototype.add = function (a) {
    var r = nbi();
    this.addTo(a, r);
    return r;
  };
  // BigInteger.prototype.subtract = bnSubtract;
  // (public) this - a
  BigInteger.prototype.subtract = function (a) {
    var r = nbi();
    this.subTo(a, r);
    return r;
  };
  // BigInteger.prototype.multiply = bnMultiply;
  // (public) this * a
  BigInteger.prototype.multiply = function (a) {
    var r = nbi();
    this.multiplyTo(a, r);
    return r;
  };
  // BigInteger.prototype.divide = bnDivide;
  // (public) this / a
  BigInteger.prototype.divide = function (a) {
    var r = nbi();
    this.divRemTo(a, r, null);
    return r;
  };
  // BigInteger.prototype.remainder = bnRemainder;
  // (public) this % a
  BigInteger.prototype.remainder = function (a) {
    var r = nbi();
    this.divRemTo(a, null, r);
    return r;
  };
  // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  // (public) [this/a,this%a]
  BigInteger.prototype.divideAndRemainder = function (a) {
    var q = nbi();
    var r = nbi();
    this.divRemTo(a, q, r);
    return [q, r];
  };
  // BigInteger.prototype.modPow = bnModPow;
  // (public) this^e % m (HAC 14.85)
  BigInteger.prototype.modPow = function (e, m) {
    var i = e.bitLength();
    var k;
    var r = nbv(1);
    var z;
    if (i <= 0) {
      return r;
    }
    else if (i < 18) {
      k = 1;
    }
    else if (i < 48) {
      k = 3;
    }
    else if (i < 144) {
      k = 4;
    }
    else if (i < 768) {
      k = 5;
    }
    else {
      k = 6;
    }
    if (i < 8) {
      z = new Classic(m);
    }
    else if (m.isEven()) {
      z = new Barrett(m);
    }
    else {
      z = new Montgomery(m);
    }
    // precomputation
    var g = [];
    var n = 3;
    var k1 = k - 1;
    var km = (1 << k) - 1;
    g[1] = z.convert(this);
    if (k > 1) {
      var g2 = nbi();
      z.sqrTo(g[1], g2);
      while (n <= km) {
        g[n] = nbi();
        z.mulTo(g2, g[n - 2], g[n]);
        n += 2;
      }
    }
    var j = e.t - 1;
    var w;
    var is1 = true;
    var r2 = nbi();
    var t;
    i = nbits(e[j]) - 1;
    while (j >= 0) {
      if (i >= k1) {
        w = (e[j] >> (i - k1)) & km;
      }
      else {
        w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
        if (j > 0) {
          w |= e[j - 1] >> (this.DB + i - k1);
        }
      }
      n = k;
      while ((w & 1) == 0) {
        w >>= 1;
        --n;
      }
      if ((i -= n) < 0) {
        i += this.DB;
        --j;
      }
      if (is1) { // ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      }
      else {
        while (n > 1) {
          z.sqrTo(r, r2);
          z.sqrTo(r2, r);
          n -= 2;
        }
        if (n > 0) {
          z.sqrTo(r, r2);
        }
        else {
          t = r;
          r = r2;
          r2 = t;
        }
        z.mulTo(r2, g[w], r);
      }
      while (j >= 0 && (e[j] & (1 << i)) == 0) {
        z.sqrTo(r, r2);
        t = r;
        r = r2;
        r2 = t;
        if (--i < 0) {
          i = this.DB - 1;
          --j;
        }
      }
    }
    return z.revert(r);
  };
  // BigInteger.prototype.modInverse = bnModInverse;
  // (public) 1/this % m (HAC 14.61)
  BigInteger.prototype.modInverse = function (m) {
    var ac = m.isEven();
    if ((this.isEven() && ac) || m.signum() == 0) {
      return BigInteger.ZERO;
    }
    var u = m.clone();
    var v = this.clone();
    var a = nbv(1);
    var b = nbv(0);
    var c = nbv(0);
    var d = nbv(1);
    while (u.signum() != 0) {
      while (u.isEven()) {
        u.rShiftTo(1, u);
        if (ac) {
          if (!a.isEven() || !b.isEven()) {
            a.addTo(this, a);
            b.subTo(m, b);
          }
          a.rShiftTo(1, a);
        }
        else if (!b.isEven()) {
          b.subTo(m, b);
        }
        b.rShiftTo(1, b);
      }
      while (v.isEven()) {
        v.rShiftTo(1, v);
        if (ac) {
          if (!c.isEven() || !d.isEven()) {
            c.addTo(this, c);
            d.subTo(m, d);
          }
          c.rShiftTo(1, c);
        }
        else if (!d.isEven()) {
          d.subTo(m, d);
        }
        d.rShiftTo(1, d);
      }
      if (u.compareTo(v) >= 0) {
        u.subTo(v, u);
        if (ac) {
          a.subTo(c, a);
        }
        b.subTo(d, b);
      }
      else {
        v.subTo(u, v);
        if (ac) {
          c.subTo(a, c);
        }
        d.subTo(b, d);
      }
    }
    if (v.compareTo(BigInteger.ONE) != 0) {
      return BigInteger.ZERO;
    }
    if (d.compareTo(m) >= 0) {
      return d.subtract(m);
    }
    if (d.signum() < 0) {
      d.addTo(m, d);
    }
    else {
      return d;
    }
    if (d.signum() < 0) {
      return d.add(m);
    }
    else {
      return d;
    }
  };
  // BigInteger.prototype.pow = bnPow;
  // (public) this^e
  BigInteger.prototype.pow = function (e) {
    return this.exp(e, new NullExp());
  };
  // BigInteger.prototype.gcd = bnGCD;
  // (public) gcd(this,a) (HAC 14.54)
  BigInteger.prototype.gcd = function (a) {
    var x = (this.s < 0) ? this.negate() : this.clone();
    var y = (a.s < 0) ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit();
    var g = y.getLowestSetBit();
    if (g < 0) {
      return x;
    }
    if (i < g) {
      g = i;
    }
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    while (x.signum() > 0) {
      if ((i = x.getLowestSetBit()) > 0) {
        x.rShiftTo(i, x);
      }
      if ((i = y.getLowestSetBit()) > 0) {
        y.rShiftTo(i, y);
      }
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      }
      else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
    }
    if (g > 0) {
      y.lShiftTo(g, y);
    }
    return y;
  };
  // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  // (public) test primality with certainty >= 1-.5^t
  BigInteger.prototype.isProbablePrime = function (t) {
    var i;
    var x = this.abs();
    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
      for (i = 0; i < lowprimes.length; ++i) {
        if (x[0] == lowprimes[i]) {
          return true;
        }
      }
      return false;
    }
    if (x.isEven()) {
      return false;
    }
    i = 1;
    while (i < lowprimes.length) {
      var m = lowprimes[i];
      var j = i + 1;
      while (j < lowprimes.length && m < lplim) {
        m *= lowprimes[j++];
      }
      m = x.modInt(m);
      while (i < j) {
        if (m % lowprimes[i++] == 0) {
          return false;
        }
      }
    }
    return x.millerRabin(t);
  };
  //#endregion PUBLIC
  //#region PROTECTED
  // BigInteger.prototype.copyTo = bnpCopyTo;
  // (protected) copy this to r
  BigInteger.prototype.copyTo = function (r) {
    for (var i = this.t - 1; i >= 0; --i) {
      r[i] = this[i];
    }
    r.t = this.t;
    r.s = this.s;
  };
  // BigInteger.prototype.fromInt = bnpFromInt;
  // (protected) set from integer value x, -DV <= x < DV
  BigInteger.prototype.fromInt = function (x) {
    this.t = 1;
    this.s = (x < 0) ? -1 : 0;
    if (x > 0) {
      this[0] = x;
    }
    else if (x < -1) {
      this[0] = x + this.DV;
    }
    else {
      this.t = 0;
    }
  };
  // BigInteger.prototype.fromString = bnpFromString;
  // (protected) set from string and radix
  BigInteger.prototype.fromString = function (s, b) {
    var k;
    if (b == 16) {
      k = 4;
    }
    else if (b == 8) {
      k = 3;
    }
    else if (b == 256) {
      k = 8;
      /* byte array */
    }
    else if (b == 2) {
      k = 1;
    }
    else if (b == 32) {
      k = 5;
    }
    else if (b == 4) {
      k = 2;
    }
    else {
      this.fromRadix(s, b);
      return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length;
    var mi = false;
    var sh = 0;
    while (--i >= 0) {
      var x = (k == 8) ? (+s[i]) & 0xff : intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-") {
          mi = true;
        }
        continue;
      }
      mi = false;
      if (sh == 0) {
        this[this.t++] = x;
      }
      else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
        this[this.t++] = (x >> (this.DB - sh));
      }
      else {
        this[this.t - 1] |= x << sh;
      }
      sh += k;
      if (sh >= this.DB) {
        sh -= this.DB;
      }
    }
    if (k == 8 && ((+s[0]) & 0x80) != 0) {
      this.s = -1;
      if (sh > 0) {
        this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
      }
    }
    this.clamp();
    if (mi) {
      BigInteger.ZERO.subTo(this, this);
    }
  };
  // BigInteger.prototype.clamp = bnpClamp;
  // (protected) clamp off excess high words
  BigInteger.prototype.clamp = function () {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) {
      --this.t;
    }
  };
  // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  // (protected) r = this << n*DB
  BigInteger.prototype.dlShiftTo = function (n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + n] = this[i];
    }
    for (i = n - 1; i >= 0; --i) {
      r[i] = 0;
    }
    r.t = this.t + n;
    r.s = this.s;
  };
  // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  // (protected) r = this >> n*DB
  BigInteger.prototype.drShiftTo = function (n, r) {
    for (var i = n; i < this.t; ++i) {
      r[i - n] = this[i];
    }
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  };
  // BigInteger.prototype.lShiftTo = bnpLShiftTo;
  // (protected) r = this << n
  BigInteger.prototype.lShiftTo = function (n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB);
    var c = (this.s << bs) & this.DM;
    for (var i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = (this[i] >> cbs) | c;
      c = (this[i] & bm) << bs;
    }
    for (var i = ds - 1; i >= 0; --i) {
      r[i] = 0;
    }
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  };
  // BigInteger.prototype.rShiftTo = bnpRShiftTo;
  // (protected) r = this >> n
  BigInteger.prototype.rShiftTo = function (n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
      r.t = 0;
      return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) {
      r[this.t - ds - 1] |= (this.s & bm) << cbs;
    }
    r.t = this.t - ds;
    r.clamp();
  };
  // BigInteger.prototype.subTo = bnpSubTo;
  // (protected) r = this - a
  BigInteger.prototype.subTo = function (a, r) {
    var i = 0;
    var c = 0;
    var m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while (i < a.t) {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c < -1) {
      r[i++] = this.DV + c;
    }
    else if (c > 0) {
      r[i++] = c;
    }
    r.t = i;
    r.clamp();
  };
  // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyTo = function (a, r) {
    var x = this.abs();
    var y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = 0; i < y.t; ++i) {
      r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    }
    r.s = 0;
    r.clamp();
    if (this.s != a.s) {
      BigInteger.ZERO.subTo(r, r);
    }
  };
  // BigInteger.prototype.squareTo = bnpSquareTo;
  // (protected) r = this^2, r != this (HAC 14.16)
  BigInteger.prototype.squareTo = function (r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) {
      r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    }
    r.s = 0;
    r.clamp();
  };
  // BigInteger.prototype.divRemTo = bnpDivRemTo;
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  BigInteger.prototype.divRemTo = function (m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) {
      return;
    }
    var pt = this.abs();
    if (pt.t < pm.t) {
      if (q != null) {
        q.fromInt(0);
      }
      if (r != null) {
        this.copyTo(r);
      }
      return;
    }
    if (r == null) {
      r = nbi();
    }
    var y = nbi();
    var ts = this.s;
    var ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
    if (nsh > 0) {
      pm.lShiftTo(nsh, y);
      pt.lShiftTo(nsh, r);
    }
    else {
      pm.copyTo(y);
      pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) {
      return;
    }
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt;
    var d2 = (1 << this.F1) / yt;
    var e = 1 << this.F2;
    var i = r.t;
    var j = i - ys;
    var t = (q == null) ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y); // "negative" y so we can replace sub with am later
    while (y.t < ys) {
      y[y.t++] = 0;
    }
    while (--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) {
          r.subTo(t, r);
        }
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q);
      if (ts != ms) {
        BigInteger.ZERO.subTo(q, q);
      }
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) {
      r.rShiftTo(nsh, r);
    } // Denormalize remainder
    if (ts < 0) {
      BigInteger.ZERO.subTo(r, r);
    }
  };
  // BigInteger.prototype.invDigit = bnpInvDigit;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  BigInteger.prototype.invDigit = function () {
    if (this.t < 1) {
      return 0;
    }
    var x = this[0];
    if ((x & 1) == 0) {
      return 0;
    }
    var y = x & 3; // y == 1/x mod 2^2
    y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
    y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y > 0) ? this.DV - y : -y;
  };
  // BigInteger.prototype.isEven = bnpIsEven;
  // (protected) true iff this is even
  BigInteger.prototype.isEven = function () {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
  };
  // BigInteger.prototype.exp = bnpExp;
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  BigInteger.prototype.exp = function (e, z) {
    if (e > 0xffffffff || e < 1) {
      return BigInteger.ONE;
    }
    var r = nbi();
    var r2 = nbi();
    var g = z.convert(this);
    var i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
      z.sqrTo(r, r2);
      if ((e & (1 << i)) > 0) {
        z.mulTo(r2, g, r);
      }
      else {
        var t = r;
        r = r2;
        r2 = t;
      }
    }
    return z.revert(r);
  };
  // BigInteger.prototype.chunkSize = bnpChunkSize;
  // (protected) return x s.t. r^x < DV
  BigInteger.prototype.chunkSize = function (r) {
    return Math.floor(Math.LN2 * this.DB / Math.log(r));
  };
  // BigInteger.prototype.toRadix = bnpToRadix;
  // (protected) convert to radix string
  BigInteger.prototype.toRadix = function (b) {
    if (b == null) {
      b = 10;
    }
    if (this.signum() == 0 || b < 2 || b > 36) {
      return "0";
    }
    var cs = this.chunkSize(b);
    var a = Math.pow(b, cs);
    var d = nbv(a);
    var y = nbi();
    var z = nbi();
    var r = "";
    this.divRemTo(d, y, z);
    while (y.signum() > 0) {
      r = (a + z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d, y, z);
    }
    return z.intValue().toString(b) + r;
  };
  // BigInteger.prototype.fromRadix = bnpFromRadix;
  // (protected) convert from radix string
  BigInteger.prototype.fromRadix = function (s, b) {
    this.fromInt(0);
    if (b == null) {
      b = 10;
    }
    var cs = this.chunkSize(b);
    var d = Math.pow(b, cs);
    var mi = false;
    var j = 0;
    var w = 0;
    for (var i = 0; i < s.length; ++i) {
      var x = intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-" && this.signum() == 0) {
          mi = true;
        }
        continue;
      }
      w = b * w + x;
      if (++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w, 0);
        j = 0;
        w = 0;
      }
    }
    if (j > 0) {
      this.dMultiply(Math.pow(b, j));
      this.dAddOffset(w, 0);
    }
    if (mi) {
      BigInteger.ZERO.subTo(this, this);
    }
  };
  // BigInteger.prototype.fromNumber = bnpFromNumber;
  // (protected) alternate constructor
  BigInteger.prototype.fromNumber = function (a, b, c) {
    if ("number" == typeof b) {
      // new BigInteger(int,int,RNG)
      if (a < 2) {
        this.fromInt(1);
      }
      else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          // force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
        }
        if (this.isEven()) {
          this.dAddOffset(1, 0);
        } // force odd
        while (!this.isProbablePrime(b)) {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) {
            this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      }
    }
    else {
      // new BigInteger(int,RNG)
      var x = [];
      var t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) {
        x[0] &= ((1 << t) - 1);
      }
      else {
        x[0] = 0;
      }
      this.fromString(x, 256);
    }
  };
  // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  // (protected) r = this op a (bitwise)
  BigInteger.prototype.bitwiseTo = function (a, op, r) {
    var i;
    var f;
    var m = Math.min(a.t, this.t);
    for (i = 0; i < m; ++i) {
      r[i] = op(this[i], a[i]);
    }
    if (a.t < this.t) {
      f = a.s & this.DM;
      for (i = m; i < this.t; ++i) {
        r[i] = op(this[i], f);
      }
      r.t = this.t;
    }
    else {
      f = this.s & this.DM;
      for (i = m; i < a.t; ++i) {
        r[i] = op(f, a[i]);
      }
      r.t = a.t;
    }
    r.s = op(this.s, a.s);
    r.clamp();
  };
  // BigInteger.prototype.changeBit = bnpChangeBit;
  // (protected) this op (1<<n)
  BigInteger.prototype.changeBit = function (n, op) {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r, op, r);
    return r;
  };
  // BigInteger.prototype.addTo = bnpAddTo;
  // (protected) r = this + a
  BigInteger.prototype.addTo = function (a, r) {
    var i = 0;
    var c = 0;
    var m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] + a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c += a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while (i < a.t) {
        c += a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c < 0) ? -1 : 0;
    if (c > 0) {
      r[i++] = c;
    }
    else if (c < -1) {
      r[i++] = this.DV + c;
    }
    r.t = i;
    r.clamp();
  };
  // BigInteger.prototype.dMultiply = bnpDMultiply;
  // (protected) this *= n, this >= 0, 1 < n < DV
  BigInteger.prototype.dMultiply = function (n) {
    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
  };
  // BigInteger.prototype.dAddOffset = bnpDAddOffset;
  // (protected) this += n << w words, this >= 0
  BigInteger.prototype.dAddOffset = function (n, w) {
    if (n == 0) {
      return;
    }
    while (this.t <= w) {
      this[this.t++] = 0;
    }
    this[w] += n;
    while (this[w] >= this.DV) {
      this[w] -= this.DV;
      if (++w >= this.t) {
        this[this.t++] = 0;
      }
      ++this[w];
    }
  };
  // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  // (protected) r = lower n words of "this * a", a.t <= n
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
    var i = Math.min(this.t + a.t, n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while (i > 0) {
      r[--i] = 0;
    }
    for (var j = r.t - this.t; i < j; ++i) {
      r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
    }
    for (var j = Math.min(a.t, n); i < j; ++i) {
      this.am(0, a[i], r, i, 0, n - i);
    }
    r.clamp();
  };
  // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  // (protected) r = "this * a" without lower n words, n > 0
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
    --n;
    var i = r.t = this.t + a.t - n;
    r.s = 0; // assumes a,this >= 0
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
      r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
    }
    r.clamp();
    r.drShiftTo(1, r);
  };
  // BigInteger.prototype.modInt = bnpModInt;
  // (protected) this % n, n < 2^26
  BigInteger.prototype.modInt = function (n) {
    if (n <= 0) {
      return 0;
    }
    var d = this.DV % n;
    var r = (this.s < 0) ? n - 1 : 0;
    if (this.t > 0) {
      if (d == 0) {
        r = this[0] % n;
      }
      else {
        for (var i = this.t - 1; i >= 0; --i) {
          r = (d * r + this[i]) % n;
        }
      }
    }
    return r;
  };
  // BigInteger.prototype.millerRabin = bnpMillerRabin;
  // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  BigInteger.prototype.millerRabin = function (t) {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) {
      return false;
    }
    var r = n1.shiftRight(k);
    t = (t + 1) >> 1;
    if (t > lowprimes.length) {
      t = lowprimes.length;
    }
    var a = nbi();
    for (var i = 0; i < t; ++i) {
      // Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigInteger.ONE) == 0) {
            return false;
          }
        }
        if (y.compareTo(n1) != 0) {
          return false;
        }
      }
    }
    return true;
  };
  // BigInteger.prototype.square = bnSquare;
  // (public) this^2
  BigInteger.prototype.square = function () {
    var r = nbi();
    this.squareTo(r);
    return r;
  };
  //#region ASYNC
  // Public API method
  BigInteger.prototype.gcda = function (a, callback) {
    var x = (this.s < 0) ? this.negate() : this.clone();
    var y = (a.s < 0) ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit();
    var g = y.getLowestSetBit();
    if (g < 0) {
      callback(x);
      return;
    }
    if (i < g) {
      g = i;
    }
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
    var gcda1 = function () {
      if ((i = x.getLowestSetBit()) > 0) {
        x.rShiftTo(i, x);
      }
      if ((i = y.getLowestSetBit()) > 0) {
        y.rShiftTo(i, y);
      }
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      }
      else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
      if (!(x.signum() > 0)) {
        if (g > 0) {
          y.lShiftTo(g, y);
        }
        setTimeout(function () { callback(y); }, 0); // escape
      }
      else {
        setTimeout(gcda1, 0);
      }
    };
    setTimeout(gcda1, 10);
  };
  // (protected) alternate constructor
  BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
    if ("number" == typeof b) {
      if (a < 2) {
        this.fromInt(1);
      }
      else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
        }
        if (this.isEven()) {
          this.dAddOffset(1, 0);
        }
        var bnp_1 = this;
        var bnpfn1_1 = function () {
          bnp_1.dAddOffset(2, 0);
          if (bnp_1.bitLength() > a) {
            bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
          }
          if (bnp_1.isProbablePrime(b)) {
            setTimeout(function () { callback(); }, 0); // escape
          }
          else {
            setTimeout(bnpfn1_1, 0);
          }
        };
        setTimeout(bnpfn1_1, 0);
      }
    }
    else {
      var x = [];
      var t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) {
        x[0] &= ((1 << t) - 1);
      }
      else {
        x[0] = 0;
      }
      this.fromString(x, 256);
    }
  };
  return BigInteger;
}());


//#endregion
//#endregion REDUCERS
// return new, unset BigInteger
function nbi() { return new BigInteger(null); }
function parseBigInt(str, r) {
  return new BigInteger(str, r);
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}


// "empty" RSA key constructor
var RSAKey = /** @class */ (function () {
  function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }
  //#region PROTECTED
  // protected
  // RSAKey.prototype.doPublic = RSADoPublic;
  // Perform raw public operation on "x": return x^e (mod n)
  RSAKey.prototype.doPublic = function (x) {
    return x.modPowInt(this.e, this.n);
  };
  // RSAKey.prototype.doPrivate = RSADoPrivate;
  // Perform raw private operation on "x": return x^d (mod n)
  RSAKey.prototype.doPrivate = function (x) {
    if (this.p == null || this.q == null) {
      return x.modPow(this.d, this.n);
    }
    // TODO: re-calculate any missing CRT params
    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);
    while (xp.compareTo(xq) < 0) {
      xp = xp.add(this.p);
    }
    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
  };
  //#endregion PROTECTED
  //#region PUBLIC
  // RSAKey.prototype.setPublic = RSASetPublic;
  // Set the public key fields N and e from hex strings
  RSAKey.prototype.setPublic = function (N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N, 16);
      this.e = parseInt(E, 16);
    }
    else {
      console.error("Invalid RSA public key");
    }
  };
  // RSAKey.prototype.encrypt = RSAEncrypt;
  // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
  RSAKey.prototype.encrypt = function (text) {
    var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
    if (m == null) {
      return null;
    }
    var c = this.doPublic(m);
    if (c == null) {
      return null;
    }
    var h = c.toString(16);
    if ((h.length & 1) == 0) {
      return h;
    }
    else {
      return "0" + h;
    }
  };
  // RSAKey.prototype.setPrivate = RSASetPrivate;
  // Set the private key fields N, e, and d from hex strings
  RSAKey.prototype.setPrivate = function (N, E, D) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N, 16);
      this.e = parseInt(E, 16);
      this.d = parseBigInt(D, 16);
    }
    else {
      console.error("Invalid RSA private key");
    }
  };
  // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
  // Set the private key fields N, e, d and CRT params from hex strings
  RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N, 16);
      this.e = parseInt(E, 16);
      this.d = parseBigInt(D, 16);
      this.p = parseBigInt(P, 16);
      this.q = parseBigInt(Q, 16);
      this.dmp1 = parseBigInt(DP, 16);
      this.dmq1 = parseBigInt(DQ, 16);
      this.coeff = parseBigInt(C, 16);
    }
    else {
      console.error("Invalid RSA private key");
    }
  };
  // RSAKey.prototype.generate = RSAGenerate;
  // Generate a new random private key B bits long, using public expt E
  RSAKey.prototype.generate = function (B, E) {
    var rng = new SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new BigInteger(E, 16);
    for (;;) {
      for (;;) {
        this.p = new BigInteger(B - qs, 1, rng);
        if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
          break;
        }
      }
      for (;;) {
        this.q = new BigInteger(qs, 1, rng);
        if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
          break;
        }
      }
      if (this.p.compareTo(this.q) <= 0) {
        var t = this.p;
        this.p = this.q;
        this.q = t;
      }
      var p1 = this.p.subtract(BigInteger.ONE);
      var q1 = this.q.subtract(BigInteger.ONE);
      var phi = p1.multiply(q1);
      if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
        this.n = this.p.multiply(this.q);
        this.d = ee.modInverse(phi);
        this.dmp1 = this.d.mod(p1);
        this.dmq1 = this.d.mod(q1);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  };
  // RSAKey.prototype.decrypt = RSADecrypt;
  // Return the PKCS#1 RSA decryption of "ctext".
  // "ctext" is an even-length hex string and the output is a plain string.
  RSAKey.prototype.decrypt = function (ctext) {
    var c = parseBigInt(ctext, 16);
    var m = this.doPrivate(c);
    if (m == null) {
      return null;
    }
    return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3);
  };
  // Generate a new random private key B bits long, using public expt E
  RSAKey.prototype.generateAsync = function (B, E, callback) {
    var rng = new SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new BigInteger(E, 16);
    var rsa = this;
    // These functions have non-descript names because they were originally for(;;) loops.
    // I don't know about cryptography to give them better names than loop1-4.
    var loop1 = function () {
      var loop4 = function () {
        if (rsa.p.compareTo(rsa.q) <= 0) {
          var t = rsa.p;
          rsa.p = rsa.q;
          rsa.q = t;
        }
        var p1 = rsa.p.subtract(BigInteger.ONE);
        var q1 = rsa.q.subtract(BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
          rsa.n = rsa.p.multiply(rsa.q);
          rsa.d = ee.modInverse(phi);
          rsa.dmp1 = rsa.d.mod(p1);
          rsa.dmq1 = rsa.d.mod(q1);
          rsa.coeff = rsa.q.modInverse(rsa.p);
          setTimeout(function () { callback(); }, 0); // escape
        }
        else {
          setTimeout(loop1, 0);
        }
      };
      var loop3 = function () {
        rsa.q = nbi();
        rsa.q.fromNumberAsync(qs, 1, rng, function () {
          rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
            if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
              setTimeout(loop4, 0);
            }
            else {
              setTimeout(loop3, 0);
            }
          });
        });
      };
      var loop2 = function () {
        rsa.p = nbi();
        rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
          rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
            if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
              setTimeout(loop3, 0);
            }
            else {
              setTimeout(loop2, 0);
            }
          });
        });
      };
      setTimeout(loop2, 0);
    };
    setTimeout(loop1, 0);
  };
  RSAKey.prototype.sign = function (text, digestMethod, digestName) {
    var header = getDigestHeader(digestName);
    var digest = header + digestMethod(text).toString();
    var m = pkcs1pad1(digest, this.n.bitLength() / 4);
    if (m == null) {
      return null;
    }
    var c = this.doPrivate(m);
    if (c == null) {
      return null;
    }
    var h = c.toString(16);
    if ((h.length & 1) == 0) {
      return h;
    }
    else {
      return "0" + h;
    }
  };
  RSAKey.prototype.verify = function (text, signature, digestMethod) {
    var c = parseBigInt(signature, 16);
    var m = this.doPublic(c);
    if (m == null) {
      return null;
    }
    var unpadded = m.toString(16).replace(/^1f+00/, "");
    var digest = removeDigestHeader(unpadded);
    return digest == digestMethod(text).toString();
  };
  return RSAKey;
}());

/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
var JSEncrypt = /** @class */ (function () {
  function JSEncrypt(options) {
    options = options || {};
    this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
    this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
    this.log = options.log || false;
    // The private and public key.
    this.key = null;
  }
  /**
   * Method to set the rsa key parameter (one method is enough to set both the public
   * and the private key, since the private key contains the public key paramenters)
   * Log a warning if logs are enabled
   * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
   * @public
   */
  JSEncrypt.prototype.setKey = function (key) {
    if (this.log && this.key) {
      console.warn("A key was already set, overriding existing.");
    }
    this.key = new JSEncryptRSAKey(key);
  };
  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPrivateKey = function (privkey) {
    // Create the key.
    this.setKey(privkey);
  };
  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPublicKey = function (pubkey) {
    // Sets the public key.
    this.setKey(pubkey);
  };
  /**
   * Proxy method for RSAKey object's decrypt, decrypt the string using the private
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} str base64 encoded crypted string to decrypt
   * @return {string} the decrypted string
   * @public
   */
  JSEncrypt.prototype.decrypt = function (str) {
    // Return the decrypted string.
    try {
      return this.getKey().decrypt(b64tohex(str));
    }
    catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's encrypt, encrypt the string using the public
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} str the string to encrypt
   * @return {string} the encrypted string encoded in base64
   * @public
   */
  JSEncrypt.prototype.encrypt = function (str) {
    // Return the encrypted string.
    try {
      return hex2b64(this.getKey().encrypt(str));
    }
    catch (ex) {
      console.log(ex)
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's sign.
   * @param {string} str the string to sign
   * @param {function} digestMethod hash method
   * @param {string} digestName the name of the hash algorithm
   * @return {string} the signature encoded in base64
   * @public
   */
  JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
    // return the RSA signature of 'str' in 'hex' format.
    try {
      return hex2b64(this.getKey().sign(str, digestMethod, digestName));
    }
    catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's verify.
   * @param {string} str the string to verify
   * @param {string} signature the signature encoded in base64 to compare the string to
   * @param {function} digestMethod hash method
   * @return {boolean} whether the data and signature match
   * @public
   */
  JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
    // Return the decrypted 'digest' of the signature.
    try {
      return this.getKey().verify(str, b64tohex(signature), digestMethod);
    }
    catch (ex) {
      return false;
    }
  };
  /**
   * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
   * will be created and returned
   * @param {callback} [cb] the callback to be called if we want the key to be generated
   * in an async fashion
   * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
   * @public
   */
  JSEncrypt.prototype.getKey = function (cb) {
    // Only create new if it does not exist.
    if (!this.key) {
      // Get a new private key.
      this.key = new JSEncryptRSAKey();
      if (cb && {}.toString.call(cb) === "[object Function]") {
        this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
        return;
      }
      // Generate the key.
      this.key.generate(this.default_key_size, this.default_public_exponent);
    }
    return this.key;
  };
  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateKey();
  };
  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateBaseKeyB64();
  };
  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicKey();
  };
  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicBaseKeyB64();
  };
  JSEncrypt.version = "3.0.0-rc.1";
  return JSEncrypt;
}());



/**
 * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
 * This object is just a decorator for parsing the key parameter
 * @param {string|Object} key - The key in string format, or an object containing
 * the parameters needed to build a RSAKey object.
 * @constructor
 */
var JSEncryptRSAKey = /** @class */ (function (_super) {
  __extends(JSEncryptRSAKey, _super);
  function JSEncryptRSAKey(key) {
    var _this = _super.call(this) || this;
    // Call the super constructor.
    //  RSAKey.call(this);
    // If a key key was provided.
    if (key) {
      // If this is a string...
      if (typeof key === "string") {
        _this.parseKey(key);
      }
      else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) ||
        JSEncryptRSAKey.hasPublicKeyProperty(key)) {
        // Set the values for the key.
        _this.parsePropertiesFrom(key);
      }
    }
    return _this;
  }
  /**
   * Method to parse a pem encoded string containing both a public or private key.
   * The method will translate the pem encoded string in a der encoded string and
   * will parse private key and public key parameters. This method accepts public key
   * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
   *
   * @todo Check how many rsa formats use the same format of pkcs #1.
   *
   * The format is defined as:
   * PublicKeyInfo ::= SEQUENCE {
     *   algorithm       AlgorithmIdentifier,
     *   PublicKey       BIT STRING
     * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
     * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER   -- e
     * }
   * it's possible to examine the structure of the keys obtained from openssl using
   * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
   * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
   * @private
   */
  JSEncryptRSAKey.prototype.parseKey = function (pem) {
    try {
      var modulus = 0;
      var public_exponent = 0;
      var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
      var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
      var asn1 = ASN1.decode(der);
      // Fixes a bug with OpenSSL 1.0+ private keys
      if (asn1.sub.length === 3) {
        asn1 = asn1.sub[2].sub[0];
      }
      if (asn1.sub.length === 9) {
        // Parse the private key.
        modulus = asn1.sub[1].getHexStringValue(); // bigint
        this.n = parseBigInt(modulus, 16);
        public_exponent = asn1.sub[2].getHexStringValue(); // int
        this.e = parseInt(public_exponent, 16);
        var private_exponent = asn1.sub[3].getHexStringValue(); // bigint
        this.d = parseBigInt(private_exponent, 16);
        var prime1 = asn1.sub[4].getHexStringValue(); // bigint
        this.p = parseBigInt(prime1, 16);
        var prime2 = asn1.sub[5].getHexStringValue(); // bigint
        this.q = parseBigInt(prime2, 16);
        var exponent1 = asn1.sub[6].getHexStringValue(); // bigint
        this.dmp1 = parseBigInt(exponent1, 16);
        var exponent2 = asn1.sub[7].getHexStringValue(); // bigint
        this.dmq1 = parseBigInt(exponent2, 16);
        var coefficient = asn1.sub[8].getHexStringValue(); // bigint
        this.coeff = parseBigInt(coefficient, 16);
      }
      else if (asn1.sub.length === 2) {
        // Parse the public key.
        var bit_string = asn1.sub[1];
        var sequence = bit_string.sub[0];
        modulus = sequence.sub[0].getHexStringValue();
        this.n = parseBigInt(modulus, 16);
        public_exponent = sequence.sub[1].getHexStringValue();
        this.e = parseInt(public_exponent, 16);
      }
      else {
        return false;
      }
      return true;
    }
    catch (ex) {
      return false;
    }
  };
  /**
   * Translate rsa parameters in a hex encoded string representing the rsa key.
   *
   * The translation follow the ASN.1 notation :
   * RSAPrivateKey ::= SEQUENCE {
     *   version           Version,
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER,  -- e
     *   privateExponent   INTEGER,  -- d
     *   prime1            INTEGER,  -- p
     *   prime2            INTEGER,  -- q
     *   exponent1         INTEGER,  -- d mod (p1)
     *   exponent2         INTEGER,  -- d mod (q-1)
     *   coefficient       INTEGER,  -- (inverse of q) mod p
     * }
   * @returns {string}  DER Encoded String representing the rsa private key
   * @private
   */
  JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
    var options = {
      array: [
        new KJUR.asn1.DERInteger({ int: 0 }),
        new KJUR.asn1.DERInteger({ bigint: this.n }),
        new KJUR.asn1.DERInteger({ int: this.e }),
        new KJUR.asn1.DERInteger({ bigint: this.d }),
        new KJUR.asn1.DERInteger({ bigint: this.p }),
        new KJUR.asn1.DERInteger({ bigint: this.q }),
        new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
        new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
        new KJUR.asn1.DERInteger({ bigint: this.coeff })
      ]
    };
    var seq = new KJUR.asn1.DERSequence(options);
    return seq.getEncodedHex();
  };
  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
    return hex2b64(this.getPrivateBaseKey());
  };
  /**
   * Translate rsa parameters in a hex encoded string representing the rsa public key.
   * The representation follow the ASN.1 notation :
   * PublicKeyInfo ::= SEQUENCE {
     *   algorithm       AlgorithmIdentifier,
     *   PublicKey       BIT STRING
     * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
     * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER   -- e
     * }
   * @returns {string} DER Encoded String representing the rsa public key
   * @private
   */
  JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
    var first_sequence = new KJUR.asn1.DERSequence({
      array: [
        new KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
        new KJUR.asn1.DERNull()
      ]
    });
    var second_sequence = new KJUR.asn1.DERSequence({
      array: [
        new KJUR.asn1.DERInteger({ bigint: this.n }),
        new KJUR.asn1.DERInteger({ int: this.e })
      ]
    });
    var bit_string = new KJUR.asn1.DERBitString({
      hex: "00" + second_sequence.getEncodedHex()
    });
    var seq = new KJUR.asn1.DERSequence({
      array: [
        first_sequence,
        bit_string
      ]
    });
    return seq.getEncodedHex();
  };
  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
    return hex2b64(this.getPublicBaseKey());
  };
  /**
   * wrap the string in block of width chars. The default value for rsa keys is 64
   * characters.
   * @param {string} str the pem encoded string without header and footer
   * @param {Number} [width=64] - the length the string has to be wrapped at
   * @returns {string}
   * @private
   */
  JSEncryptRSAKey.wordwrap = function (str, width) {
    width = width || 64;
    if (!str) {
      return str;
    }
    var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
    return str.match(RegExp(regex, "g")).join("\n");
  };
  /**
   * Retrieve the pem encoded private key
   * @returns {string} the pem encoded private key with header/footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPrivateKey = function () {
    var key = "-----BEGIN RSA PRIVATE KEY-----\n";
    key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
    key += "-----END RSA PRIVATE KEY-----";
    return key;
  };
  /**
   * Retrieve the pem encoded public key
   * @returns {string} the pem encoded public key with header/footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPublicKey = function () {
    var key = "-----BEGIN PUBLIC KEY-----\n";
    key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
    key += "-----END PUBLIC KEY-----";
    return key;
  };
  /**
   * Check if the object contains the necessary parameters to populate the rsa modulus
   * and public exponent parameters.
   * @param {Object} [obj={}] - An object that may contain the two public key
   * parameters
   * @returns {boolean} true if the object contains both the modulus and the public exponent
   * properties (n and e)
   * @todo check for types of n and e. N should be a parseable bigInt object, E should
   * be a parseable integer number
   * @private
   */
  JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
    obj = obj || {};
    return (obj.hasOwnProperty("n") &&
      obj.hasOwnProperty("e"));
  };
  /**
   * Check if the object contains ALL the parameters of an RSA key.
   * @param {Object} [obj={}] - An object that may contain nine rsa key
   * parameters
   * @returns {boolean} true if the object contains all the parameters needed
   * @todo check for types of the parameters all the parameters but the public exponent
   * should be parseable bigint objects, the public exponent should be a parseable integer number
   * @private
   */
  JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
    obj = obj || {};
    return (obj.hasOwnProperty("n") &&
      obj.hasOwnProperty("e") &&
      obj.hasOwnProperty("d") &&
      obj.hasOwnProperty("p") &&
      obj.hasOwnProperty("q") &&
      obj.hasOwnProperty("dmp1") &&
      obj.hasOwnProperty("dmq1") &&
      obj.hasOwnProperty("coeff"));
  };
  /**
   * Parse the properties of obj in the current rsa object. Obj should AT LEAST
   * include the modulus and public exponent (n, e) parameters.
   * @param {Object} obj - the object containing rsa parameters
   * @private
   */
  JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
    this.n = obj.n;
    this.e = obj.e;
    if (obj.hasOwnProperty("d")) {
      this.d = obj.d;
      this.p = obj.p;
      this.q = obj.q;
      this.dmp1 = obj.dmp1;
      this.dmq1 = obj.dmq1;
      this.coeff = obj.coeff;
    }
  };
  return JSEncryptRSAKey;
}(RSAKey));

export {JSEncrypt}

export default {
  JSEncrypt,
}
