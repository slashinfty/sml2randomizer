var beastMode;
var doLevels;
var doBosses;
var doExits;
var doMusic;
var doScrolling;
var doPhysics;
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

function randomizeLevels(rom) {
    var normalBytes = [0x00, 0x01, 0x03, 0x04, 0x06, 0x0A, 0x0B, 0x0C,
    0x0E, 0x15, 0x16, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F];
    var normalOffsets = [0x3C218, 0x3C23B, 0x3C239, 0x3C23C, 0x3C240,
    0x3C268, 0x3C269, 0x3C26A, 0x3C25E, 0x3C24B, 0x3C24C, 0x3C21C,
    0x3C27E, 0x3C290, 0x3C25C, 0x3C23E, 0x3C282, 0x3C292];
    var secretBytes = [0x02, 0x07, 0x08, 0x0F, 0x11, 0x12, 0x14];
    var secretOffsets = [0x3C23A, 0x3C241, 0x3C242, 0x3C260, 0x3C21D,
    0x3C254, 0x3C24A];
    //level offset and zone clear byte
    var bossSetOne = [[0x3C238, 0x05], [0x3C243, 0x09], [0x3C24D, 0x0E],
    [0x3C255, 0x11], [0x3C261, 0x17], [0x3C26B, 0x1D]];
    //level byte and zone clear offset
    var bossSetTwo = [[0x05, 0x304F6], [0x09, 0x304FA], [0x17, 0x30508],
    [0x13, 0x30504], [0x10, 0x30501], [0x0D, 0x304FE]];
    shuffle(normalBytes);
    //prevents 0x1A as Mushroom House
    while (normalBytes[0] == 0x1A) {
        shuffle(normalBytes);
    }
    for (var i = 0; i < normalOffsets.length; i++) {
        rom[normalOffsets[i]] = normalBytes[i];
    }
    shuffle(secretBytes);
    for (var i = 0; i < secretOffsets.length; i++) {
        rom[secretOffsets[i]] = secretBytes[i];
    }
    shuffle(bossSetTwo);
    for (var i = 0; i < bossSetOne.length; i++) {
        rom[bossSetOne[i][0]] = bossSetTwo[i][0];
        rom[bossSetTwo[i][1]] = bossSetOne[i][1];
    }
}

function randomizeBosses(rom) {
    //boss offset and gfx byte
    var bossSetOne = [[0x8E03, 0x84], [0x8E08, 0x8C], [0x8E0D, 0xAC],
    [0x8E12, 0x9C], [0x8E17, 0x94], [0x8E1C, 0xA4]];
    //boss byte (level) and gfx offset
    var bossSetTwo = [[0x05, 0x1413B], [0x09, 0x1413D], [0x0D, 0x14145],
    [0x10, 0x14141], [0x13, 0x1413F], [0x17, 0x14143]];
    var version = rom[0x14C] == 0x02 ? 0x7 : 0x0;
    shuffle(bossSetTwo);
    for (var i = 0; i < bossSetOne.length; i++) {
        rom[bossSetOne[i][0]] = bossSetTwo[i][0];
        rom[bossSetTwo[i][1] - version] = (bossSetOne[i][1] - version);
    }
}

function randomizeBossHealth(rom) {
    var healthSetOne = [0x8FBB, 0x8FA9, 0x8E58]; //pigs
    var healthSetTwo = [0x8E52, 0x8E5B, 0x8E61]; //bird, octopus, rat
    var healthSetThree = [0x8E5E, 0x8E55, 0x8E64, 0x8E67, 0x8E6A]; //tatanga, witch, wario
    for (var i = 0; i < healthSetOne.length; i++) {
        rom[healthSetOne[i]] = (0x02 * (prng.nextInt(2) + 2));
    }
    for (var i = 0; i < healthSetTwo.length; i++) {
        rom[healthSetTwo[i]] = (0x02 * (prng.nextInt(3) + 3));
    }
    for (var i = 0; i < healthSetThree.length; i++) {
        rom[healthSetThree[i]] = (0x02 * (prng.nextInt(2) + 3));
    }
}

function swapExits(rom) {
    var exitOffsets = [[0x2A385, 0x29947], [0x4C8EB, 0x4CA7F], [0x4DA53,
    0x4D27B], [0x54ACE, 0x5475A], [0x49215, 0x4949E], [0x49F61, 0x499A7],
    [0x51D99, 0x51D29]];
    for (var i = 0; i < exitOffsets.length; i++) {
        if (prng.nextBool()) {
            var a = rom[exitOffsets[i][0]];
            rom[exitOffsets[i][0]] = rom[exitOffsets[i][1]];
            rom[exitOffsets[i][1]] = a;
        }
    }
}

function randomizeMusic(rom) {
    var levelMusic = [0x01, 0x0B, 0x11, 0x13, 0x14, 0x17, 0x1D,
    0x1F, 0x28];
    var overworldMusic = [0x05, 0x06, 0x0E, 0x10, 0x12, 0x1B, 0x1C, 0x1E];
    var overworldOffsets = [0x3004F, 0x3EA9B, 0x3D186, 0x3D52B, 0x3D401,
    0x3D297, 0x3D840, 0x3D694, 0x3D758];
    for (var i = 0; i < overworldOffsets.length; i++) {
        var r = prng.nextInt(overworldMusic.length);
        rom[overworldOffsets[i]] = overworldMusic[r];
    }
    if (prng.nextFloat() < 0.01) {
        rom[0x3004F] = 0x1D;
        for (var i = 0x5619; i <= 0x5885; i += 0x14) {
            rom[i] = 0x1D;
        }
    } else {
        for (var i = 0x5619; i <= 0x5885; i += 0x14) {
            var r = prng.nextInt(levelMusic.length);
            rom[i] = levelMusic[r];
        }
    }
    if (beastMode) {
        var fastOffsets = [0x1205C, 0x1251F, 0x12B45, 0x12CF2, 0x12E9B, 0x131A6,
        0x13879, 0x13A38, 0x13EC6];
        if (prng.nextFloat() < 0.05) {
            for (var i = 0; i < fastOffsets.length; i++) {
                rom[fastOffsets[i]] += 0x04;
                rom[fastOffsets[i] + 0x01] = rom[fastOffsets[i] + 0x03];
            }
        } else {
            for (var i = 0; i < fastOffsets.length; i++) {
                if (prng.nextFloat() < 0.3) {
                    rom[fastOffsets[i]] += 0x04;
                    rom[fastOffsets[i] + 0x01] = rom[fastOffsets[i] + 0x03];
                }
            }
        }
    }
}

function randomizeScrolling(rom) {
    var version = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    var levels = [0x1F71, 0x1F72, 0x1F73, 0x1F74, 0x1F76, 0x1F79, 0x1F7A,
    0x1F7B, 0x1F7C, 0x1F7D, 0x1F7E, 0x1F7F, 0x1F81, 0x1F82, 0x1F83, 0x1F84,
    0x1F85, 0x1F88, 0x1F8A, 0x1F8F, 0x1F90];
    //if level 12 has moon physics, remove from scrolling possibilities
    if (rom[0x1FA3 + version] == 0x08) {
        levels.splice(levels.indexOf(0x1F83), 1);
    }
    for (var i = 0; i < levels.length; i++) {
        var a = levels[i] + version;
        if (beastMode) {
            if (rom[a] == 0x00 && prng.nextFloat() < 0.07) {
                rom[a] = 0x01;
            } else if (rom[a] == 0x01 && prng.nextFloat() < 0.75) {
                rom[a] = 0x00;
            }
        } else {
            if (rom[a] == 0x00 && prng.nextFloat() < 0.07) {
                rom[a] = 0x01;
            } else if (rom[a] == 0x01 && prng.nextFloat() < 0.15) {
                rom[a] = 0x00;
            }
        }
    }
    //if level 12 is scrolling, swap midway bell for heart
    if (rom[0x1F83 + version] == 0x01) {
        rom[0xE7A6] = 0x27;
    }
}

function randomizePhysics(rom) {
    var version = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    for (var i = (0x1F91 + version); i <= (0x1FB0 + version); i++) {
        switch (rom[i]) {
            case 0x00:
                if (beastMode) {
                    //no changing physics for levels 07 and 15
                    if (i != (0x1F98 + version) && i != (0x1FA6 + version)) {
                        if (prng.nextFloat() < 0.05) {
                            rom[i] = 0x01;
                        //.12 and no moon physics for level 08
                    } else if (prng.nextFloat() < 0.126 && i != (0x1F99 + version)) {
                            rom[i] = 0x08;
                        }
                    }
                } else if (i != (0x1F98 + version) && i != (0x1FA6 + version)) {
                    if (prng.nextFloat() < 0.05) {
                        rom[i] = 0x01;
                        //.07
                    } else if (prng.nextFloat() < 0.074 && i != (0x1F99 + version)) {
                        rom[i] = 0x08;
                    }
                }
                break;
            case 0x01:
                if (beastMode) {
                    if (prng.nextFloat() < 0.15) {
                        rom[i] = 0x00;
                    //.45
                    } else if (prng.nextFloat() < 0.529) {
                        rom[i] = 0x08;
                    }
                } else if (prng.nextFloat() < 0.05) {
                    rom[i] = 0x00;
                //.15
                } else if (prng.nextFloat() < 0.158) {
                    rom[i] = 0x08;
                }
                break;
            case 0x08:
                if (beastMode) {
                    if (prng.nextFloat() < 0.45) {
                        rom[i] = 0x00;
                    //.05
                    } else if (prng.nextFloat() < 0.091) {
                        rom[i] = 0x01;
                    }
                } else if (prng.nextFloat() < 0.09) {
                    rom[i] = 0x00;
                //.03
                } else if (prng.nextFloat() < 0.033) {
                    rom[i] = 0x01;
                }
                break;
             default:
                break;
        }
    }
}

//TODO randomize stars in level 13

function randomizePowerups(rom) {
    var free = [0x0F, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F];
    var block = [0x11, 0x12, 0x13, 0x14, 0x15, 0x19];
    var castle = [0x1B, 0x1C, 0x1D, 0x1F];
    //allow heart in Wario Fight if DX
    if (rom[0x148] == 0x05) {
        castle.push(0x0F);
    }
    for (var i = 0xE077; i < 0xEBB5; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        if (rom[i] == 0xFF) {
            i -= 2;
        } else if (free.indexOf(s) > -1) {
            //0x1F is an enemy in level 01
            if ((i >= 0xE0BD) && (i < 0xE123)) {
                if (s != 0x1F) {
                    var n = sprite.insert(rom[i], rom[i + 1], free[prng.nextInt(free.length - 1)]);
                    sprite.copy(n, rom, i);
                }
            //only include 0x1F if it is the original
            } else if (s == 0x1F) {
                var n = sprite.insert(rom[i], rom[i + 1], free[prng.nextInt(free.length)]);
                sprite.copy(n, rom, i);
            } else {
                var n = sprite.insert(rom[i], rom[i + 1], free[prng.nextInt(free.length - 1)]);
                sprite.copy(n, rom, i);
            }
        } else if (block.indexOf(s) > -1) {
            var prob = [0.2, 0.05, 0.15, 0.05, 0.05, 0.5];
            var p = beastMode ? sprite.bias(block, prob) : block[prng.nextInt(block.length)];
            var n = sprite.insert(rom[i], rom[i + 1], p);
            sprite.copy(n, rom, i);
        }
    }
    rom[0xA9A9] = castle[prng.nextInt(castle.length)];
    rom[0xACA7] = castle[prng.nextInt(castle.length)];
}

//TODO conveyor belts in macro zone
function randomizePlatforms(rom) {
    var lv04 = [0x28, 0x29, 0x2A, 0x2B, 0x2D, 0x2E];
    var lv05 = [0x38, 0x3D];
    var lv18 = [0x60, 0x61, 0x67];
    sprite.randomize(rom, lv04, 0xE1EF, 0xE249);
    sprite.randomize(rom, lv05, 0xE24A, 0xE2A1);
    sprite.randomize(rom, lv18, 0xE99E, 0xEA2E);
    if (beastMode) {
      for (var i = 0xE9A3; i < 0xE9CE; i += 3) { //randomizing height of platforms in Castle
        if (rom[i] == 0x5E) {
          rom[i] = prng.nextInt(0x8) + 0x57;
        } else {
          rom[i] = prng.nextInt(0x8) + 0x38;
        }
      }
    }
}

function randomizeEnemies(rom) {
    var piranha = [0x0C, 0x0D];
    var lv00_17 = [0x01, 0x08, 0x09, 0x3A];
    var lv19_1B = [0x08, 0x09, 0x3A];
    var lv01 = [0x1F, 0x20, 0x21, 0x22];
    var lv02 = [0x44, 0x58];
    var lv03 = [0x35, 0x3E, 0x40, 0x41, 0x42];
    var lv04 = [0x33, 0x34, 0x5D];
    var lv05 = [0x08, 0x39, 0x3A];
    var lv07 = [0x4D, 0x54, 0x55, 0x56, 0x5E, 0x5F];
    var lv08 = [0x4D, 0x57];
    var lv0A = [0x01, 0x40, 0x4B];
    var lv0B = [0x08, 0x09, 0x3A, 0x44, 0x4D];
    var lv0E = [0x05, 0x06, 0x07, 0x08, 0x09, 0x0B, 0x3A, 0x3D];
    var lv11 = [0x05, 0x39, 0x57, 0x5B];
    var lv13 = [0x5C, 0x5E, 0x5F];
    var lv14 = [0x22, 0x23, 0x25, 0x27];
    var lv15 = [0x07, 0x33, 0x34, 0x3D, 0x5D];
    var lv16 = [0x01, 0x08, 0x09, 0x34, 0x3A, 0x55];
    var lv18a = [0x68, 0x69];
    var lv18b = [0x6E, 0x6F];
    var lv1F = [0x01, 0x09];
    sprite.randomize(rom, lv00_17, 0xE077, 0xE0BC);
    sprite.randomize(rom, lv00_17, 0xE955, 0xE99D);
    sprite.randomize(rom, lv19_1B, 0xEA2F, 0xEA7D);
    sprite.randomize(rom, lv19_1B, 0xEAA3, 0xEACD);
    sprite.randomize(rom, lv02, 0xE124, 0xE181);
    sprite.randomize(rom, lv04, 0xE1EF, 0xE249);
    sprite.randomize(rom, lv05, 0xE24A, 0xE2A1);
    sprite.randomize(rom, lv08, 0xE385, 0xE3D3);
    sprite.randomize(rom, lv0E, 0xE5C2, 0xE62B);
    sprite.randomize(rom, lv11, 0xE706, 0xE77B);
    sprite.randomize(rom, lv15, 0xE890, 0xE8F6);
    sprite.randomize(rom, lv16, 0xE8F7, 0xE954);
    sprite.randomize(rom, lv1F, 0xEB55, 0xEBB5);
    if (beastMode) {
        var lv01p = [0.3, 0.15, 0.2, 0.35];
        var lv03p = [0.15, 0.25, 0.25, 0.1, 0.25];
        var lv07p = [0.25, 0.1, 0.25, 0.1, 0.15, 0.15];
        var lv0Ap = [0.2, 0.35, 0.45];
        var lv0Bp = [0.3, 0.05, 0.3, 0.1, 0.25];
        var lv13p = [0.02, 0.49, 0.49];
        var lv14p = [0.1, 0.35, 0.2, 0.35];
        var lv18p = [0.8, 0.2];
        sprite.randomize(rom, lv01, 0xE0BD, 0xE123, lv01p);
        sprite.randomize(rom, lv03, 0xE182, 0xE1EE, lv03p);
        sprite.randomize(rom, lv07, 0xE30C, 0xE384, lv07p);
        sprite.randomize(rom, lv0A, 0xE432, 0xE49B, lv0Ap);
        sprite.randomize(rom, lv0B, 0xE49C, 0xE4F9, lv0Bp);
        sprite.randomize(rom, lv13, 0xE7C8, 0xE822, lv13p);
        sprite.randomize(rom, lv14, 0xE823, 0xE88F, lv14p);
        sprite.randomize(rom, lv18a, 0xE99E, 0xEA2E, lv18p);
        sprite.randomize(rom, lv18b, 0xE99E, 0xEA2E, lv18p);
    } else {
        sprite.randomize(rom, lv01, 0xE0BD, 0xE123);
        sprite.randomize(rom, lv03, 0xE182, 0xE1EE);
        sprite.randomize(rom, lv07, 0xE30C, 0xE384);
        sprite.randomize(rom, lv0A, 0xE432, 0xE49B);
        sprite.randomize(rom, lv0B, 0xE49C, 0xE4F9);
        sprite.randomize(rom, lv13, 0xE7C8, 0xE822);
        sprite.randomize(rom, lv14, 0xE823, 0xE88F);
        sprite.randomize(rom, lv18a, 0xE99E, 0xEA2E);
        sprite.randomize(rom, lv18b, 0xE99E, 0xEA2E);
    }
    for (var i = 0xE2A2; i < 0xE30B; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x4E:
                var lv06a = [0x4D, 0x4E, 0x51, 0x53];
                var a = sprite.insert(rom[i], rom[i + 1], lv06a[prng.nextInt(lv06a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4F:
                var lv06b = [0x4D, 0x4F, 0x51, 0x53];
                var b = sprite.insert(rom[i], rom[i + 1], lv06b[prng.nextInt(lv06b.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x4D:
            case 0x51:
            case 0x53:
                var lv06c = [0x4D, 0x51, 0x53];
                var c = sprite.insert(rom[i], rom[i + 1], lv06c[prng.nextInt(lv06c.length)]);
                sprite.copy(c, rom, i);
                break;
            default:
                break;
        }
    }
    for (var i = 0xE3D4; i < 0xE431; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x4F:
                var lv09a = [0x4D, 0x4F, 0x53, 0x5A, 0x5C];
                var a = sprite.insert(rom[i], rom[i + 1], lv09a[prng.nextInt(lv09a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4D:
            case 0x53:
            case 0x5A:
            case 0x5C:
                var lv09b = [0x4D, 0x53, 0x5A, 0x5C];
                var b = sprite.insert(rom[i], rom[i + 1], lv09b[prng.nextInt(lv09b.length)]);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    for (var i = 0xE4FA; i < 0xE560; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x49:
                var lv0Ca = [0x01, 0x47, 0x48, 0x49, 0x53];
                var probsa = [0.25, 0.1, 0.25, 0.1, 0.3];
                var pa = beastMode ? sprite.bias(lv0Ca, probsa) : lv0Ca[prng.nextInt(lv0Ca.length)];
                var a = sprite.insert(rom[i], rom[i + 1], pa);
                sprite.copy(a, rom, i);
                break;
            case 0x01:
            case 0x47:
            case 0x48:
                var lv0Cb = [0x01, 0x47, 0x48, 0x53];
                var probsb = [0.25, 0.1, 0.3, 0.35];
                var pb = beastMode ? sprite.bias(lv0Cb, probsb) : lv0Cb[prng.nextInt(lv0Cb.length)];
                var b = sprite.insert(rom[i], rom[i + 1], pb);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    for (var i = 0xE561; i < 0xE5C1; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x43:
                var lv0Da = [0x09, 0x43, 0x4D, 0x53];
                var probsa = [0.2, 0.25, 0.2, 0.35];
                var pa = beastMode ? sprite.bias(lv0Da, probsa) : lv0Da[prng.nextInt(lv0Da.length)];
                var a = sprite.insert(rom[i], rom[i + 1], pa);
                sprite.copy(a, rom, i);
                break;
            case 0x4C:
                var lv0Db = [0x09, 0x4C, 0x4D, 0x53];
                var probsb = [0.1, 0.25, 0.3, 0.35];
                var pb = beastMode ? sprite.bias(lv0Db, probsb) : lv0Db[prng.nextInt(lv0Db.length)];
                var b = sprite.insert(rom[i], rom[i + 1], pb);
                sprite.copy(b, rom, i);
                break;
            case 0x09:
            case 0x4D:
                var lv0Dc = [0x09, 0x4D, 0x53];
                var probsc = [0.15, 0.4, 0.45];
                var pc = beastMode ? sprite.bias(lv0Dc, probsc) : lv0Dc[prng.nextInt(lv0Dc.length)];
                var c = sprite.insert(rom[i], rom[i + 1], pc);
                sprite.copy(c, rom, i);
                break;
            default:
                break;
        }
    }
    var lv0Fend = beastMode ? 0xE6A1 : 0xE6BF;
    for (var i = 0xE62C; i < lv0Fend; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x01:
                var lv0Fa = [0x01, 0x06, 0x53, 0x55, 0x56];
                var a = sprite.insert(rom[i], rom[i + 1], lv0Fa[prng.nextInt(lv0Fa.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x21:
                var lv0Fb = [0x06, 0x21, 0x53, 0x55, 0x56];
                var b = sprite.insert(rom[i], rom[i + 1], lv0Fb[prng.nextInt(lv0Fb.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x06:
            case 0x55:
            case 0x56:
                var lv0Fc = [0x06, 0x53, 0x55, 0x56];
                var c = sprite.insert(rom[i], rom[i + 1], lv0Fc[prng.nextInt(lv0Fc.length)]);
                sprite.copy(c, rom, i);
                break;
            default:
                break;
        }
    }
    if (beastMode) {
        var lv0Fg = [0x06, 0x53, 0x55, 0x56];
        var probs = [0.35, 0.35, 0.15, 0.15];
        for (var i = 0xE6A4; i < 0xE6BF; i += 3) {
            var a = sprite.insert(rom[i], rom[i + 1], sprite.bias(lv0Fg, probs));
            sprite.copy(a, rom, i);
        }
    }
    for (var i = 0xE6C0; i < 0xE705; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x21:
                var lv10a = [0x01, 0x08, 0x20, 0x21, 0x3A, 0x55];
                var a = sprite.insert(rom[i], rom[i + 1], lv10a[prng.nextInt(lv10a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x01:
            case 0x08:
            case 0x20:
            case 0x3A:
            case 0x55:
                var lv10b = [0x01, 0x08, 0x20, 0x3A, 0x55];
                var b = sprite.insert(rom[i], rom[i + 1], lv10b[prng.nextInt(lv10b.length)]);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    for (var i = 0xE77C; i < 0xE7C7; i += 3) {
        var s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x4D:
                var lv12a = [0x4D, 0x58];
                var a = sprite.insert(rom[i], rom[i + 1], lv12a[prng.nextInt(lv12a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x58:
            case 0x5A:
                var lv12b = [0x4D, 0x58, 0x5A];
                var b = sprite.insert(rom[i], rom[i + 1], lv12b[prng.nextInt(lv12b.length)]);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    var lv18karamenbo = [0xE9D6, 0xE9D9, 0xE9DF, 0xE9E2, 0xE9E5];
    for (var i = 0; i < lv18karamenbo.length; i++) {
        rom[lv18karamenbo[i]] = prng.nextInt(0xB) + 0x34;
    }
    for (var i = 0xE077; i < 0xEBB5; i += 3) {
        //skipping levels 07, 09, and 16
        if ((i < 0xE30C) || ((i > 0xE384) && (i < 0xE3D4)) || ((i > 0xE431) && (i < 0xE8F7)) || (i > 0xE954)) {
            var s = sprite.extract(rom[i], rom[i + 1]);
            if (rom[i] == 0xFF) {
                i -= 2;
            } else if (piranha.indexOf(s) > -1) {
                var prob = [0.15, 0.85];
                var p = beastMode ? sprite.bias(piranha, prob) : piranha[prng.nextInt(piranha.length)];
                var n = sprite.insert(rom[i], rom[i + 1], p);
                sprite.copy(n, rom, i);
            }
        }
    }
    if (beastMode) {
        const midwayEnemies = {
            "level00": {enemies: [0x01, 0x09], start: 0xE077, stop: 0xE0BC},
            "level01": {enemies: [0x1F, 0x22], start: 0xE0BD, stop: 0xE123},
            "level02": {enemies: [0x44, 0x58], start: 0xE124, stop: 0xE181},
            "level03": {enemies: [0x35, 0x3E, 0x40, 0x41, 0x42], start: 0xE182, stop: 0xE1EE},
            "level05": {enemies: [0x39, 0x3A], start: 0xE24A, stop: 0xE2A1},
            "level06": {enemies: [0x4D, 0x53], start: 0xE2A2, stop: 0xE30B},
            "level07": {enemies: [0x4D, 0x55, 0x5E, 0x5F], start: 0xE30C, stop: 0xE384},
            "level08": {enemies: [0x4D, 0x57], start: 0xE385, stop: 0xE3D3},
            "level09": {enemies: [0x4D, 0x53, 0x5A, 0x5C], start: 0xE3D4, stop: 0xE431},
            "level0A": {enemies: [0x01], start: 0xE432, stop: 0xE49B},
            "level0B": {enemies: [0x09, 0x3A], start: 0xE49C, stop: 0xE4F9},
            "level0C": {enemies: [0x01, 0x48], start: 0xE4FA, stop: 0xE560},
            "level0D": {enemies: [0x09, 0x43, 0x4D], start: 0xE561, stop: 0xE5C1},
            "level0E": {enemies: [0x05, 0x06, 0x07, 0x09, 0x0B, 0x3D], start: 0xE5C2, stop: 0xE62B},
            "level0F": {enemies: [0x01, 0x06, 0x21, 0x55, 0x56], start: 0xE62C, stop: 0xE6BF},
            "level10": {enemies: [0x20, 0x21, 0x3A, 0x55], start: 0xE6C0, stop: 0xE705},
            "level12": {enemies: [0x4D, 0x58, 0x5A], start: 0xE77C, stop: 0xE7C7},
            "level13": {enemies: [0x5E, 0x5F], start: 0xE7C8, stop: 0xE822},
            "level14": {enemies: [0x23], start: 0xE823, stop: 0xE88F},
            "level15": {enemies: [0x07, 0x33, 0x34, 0x3D], start: 0xE890, stop: 0xE8F6},
            "level16": {enemies: [0x01, 0x08, 0x09, 0x34, 0x3A, 0x42, 0x55], start: 0xE8F7, stop: 0xE954},
            "level17": {enemies: [0x01, 0x08, 0x09, 0x42], start: 0xE955, stop: 0xE99D}
        }
        var midway = [0x17];
        for (x in midwayEnemies) {
            for (var i = midwayEnemies[x].start; i < midwayEnemies[x].stop; i += 3) {
                var s = sprite.extract(rom[i], rom[i + 1]);
                if (midway.indexOf(s) > -1) {
                    var n = sprite.insert(rom[i], rom[i + 1], midwayEnemies[x].enemies[prng.nextInt(midwayEnemies[x].enemies.length)]);
                    sprite.copy(n, rom, i);
                }
            }
        }
    }
}
