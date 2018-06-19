var beastMode;
var doLevels;
var doBosses;
var doExits;
var doMusic;
var doScrolling;
var doGravity;
var doPowerups;
var doPlatforms;
var doEnemies;

//adapted from https://github.com/bit101/lcg
var prng = {
    a: 1664525,
    c: 1013904223,
    m: Math.pow(2, 32),
    printSeed: "",
    seed: 0,
    setSeed: function(seed) {
        this.printSeed = seed;
        this.seed = parseInt(this.printSeed, 16);
    },
    nextPrng: function() {
        this.seed = (this.seed * this.a +this.c) % this.m;
        return this.seed;
    },
    nextFloat: function() {
        //range [0, 1)
        return this.nextPrng() / this.m;
    },
    nextInt: function(lim) {
        //range [0, lim)
        return Math.floor(this.nextFloat() * lim);
    },
    nextBool: function() {
        //0.5 probability of true
        return this.nextFloat() < 0.5;
    }
};

var sprite = {
    extract: function(a, b) {
        var first = ((0b00010000 & a) << 2);
        var second = ((0b11100000 & a) >>> 2);
        var third = ((0b11100000 & b) >>> 5);
        return (first | second | third);
    },
    insert: function(a, b, s) {
        var n = [];
        var first = ((s & 0b01000000) >>> 2);
        var second = ((s & 0b00111000) << 2);
        var third = ((s & 0b00000111) << 5);
        n.push(((a & 0b00001111) | first | second), ((b & 0b00011111) | third));
        return n;
    },
    copy: function(src, dest, pos) {
        for (var i = 0; i < 2; i++) {
             dest[pos + i] = src[0 + i];
        }
    },
    bias: function(s, p) {
        var r = prng.nextFloat();
        var x = 0;
        var i = -1;
        do {
            i++
            x += p[i];
        } while (x < r);
        return s[i];
    },
    randomize: function(rom, poss, start, end, prob = null) {
        for (var i = start; i < end; i += 3) {
            var s = this.extract(rom[i], rom[i + 1]);
            if (rom[i] == 0xFF) {
                i -= 2;
            } else if (poss.indexOf(s) > -1) {
                var p = prob == null ? poss[prng.nextInt(poss.length)] : this.bias(poss, prob);
                var n = this.insert(rom[i], rom[i + 1], p);
                this.copy(n, rom, i);
            }
        }
    }
};

//adapted from https://github.com/vhelin/wla-dx/blob/master/wlalink/compute.c
function checksum(rom) {
    var csum = 0;
    var comp = 0;
    for (var i = 0x00; i < 0x14E; i++) {
        csum += rom[i];
    }
    var e = rom[0x148] == 0x05 ? 0xFFFFF : 0x7FFFF;
    for (var i = 0x150; i <= e; i++) {
        csum += rom[i];
    }
    rom[0x14E] = (csum >> 8) & 0xFF;
    rom[0x14F] = csum & 0xFF;
    for (var i = 0x134; i <= 0x14C; i++) {
        comp += rom[i];
    }
    comp += 25;
    rom[0x14D] = 0 - (comp & 0xFF);
}

//Fisher-Yates shuffle algorithm
function shuffle(b) {
    for (var i = b.length - 1; i > 0; i--) {
        var r = prng.nextInt(i + 1);
        var a = b[r];
        b[r] = b[i];
        b[i] = a;
    }
}

function patch(obj, rom) {
    for (o in obj) {
        for (var i = 0; i < obj[o].array.length; i++) {
            rom[obj[o].dest + i] = obj[o].array[i];
        }
    }
}
