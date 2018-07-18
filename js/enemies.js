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
        var prob = beastMode ? 0.13 : 0.07;
        rom[lv18karamenbo[i]] = prng.nextFloat() < prob ? 0x35 : 0x34;
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
