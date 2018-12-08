function randomizeEnemies(rom) {
    const piranha = [0x0C, 0x0D];
    const lv00_17 = [0x01, 0x08, 0x09, 0x3A];
    const lv19_1B = [0x08, 0x09, 0x3A];
    const lv01 = [0x1F, 0x20, 0x21, 0x22];
    const lv02 = [0x44, 0x58];
    const lv03 = [0x35, 0x3E, 0x40, 0x41, 0x42];
    const lv04 = [0x33, 0x34, 0x5D];
    const lv05 = [0x08, 0x39, 0x3A];
    const lv07 = [0x4D, 0x54, 0x55, 0x56, 0x5E, 0x5F];
    const lv08 = [0x4D, 0x57];
    const lv0A = [0x01, 0x40, 0x4B];
    const lv0B = [0x08, 0x09, 0x3A, 0x44, 0x4D];
    const lv0E = [0x05, 0x06, 0x07, 0x08, 0x09, 0x0B, 0x3A, 0x3D];
    const lv11 = [0x05, 0x39, 0x57, 0x5B];
    const lv13 = [0x5C, 0x5E, 0x5F];
    const lv14 = [0x22, 0x23, 0x25, 0x27];
    const lv15 = [0x07, 0x33, 0x34, 0x3D, 0x5D];
    const lv16 = [0x01, 0x08, 0x09, 0x34, 0x3A, 0x55];
    const lv18a = [0x68, 0x69];
    const lv18b = [0x6E, 0x6F];
    const lv1F = [0x01, 0x09];
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
        const lv01p = [0.3, 0.15, 0.2, 0.35];
        const lv03p = [0.15, 0.25, 0.25, 0.1, 0.25];
        const lv07p = [0.25, 0.1, 0.25, 0.1, 0.15, 0.15];
        const lv0Ap = [0.2, 0.35, 0.45];
        const lv0Bp = [0.3, 0.05, 0.3, 0.1, 0.25];
        const lv13p = [0.02, 0.49, 0.49];
        const lv14p = [0.1, 0.35, 0.2, 0.35];
        const lv18p = [0.8, 0.2];
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
    for (let i = 0xE2A2; i < 0xE30B; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x4E:
                const lv06a = [0x4D, 0x4E, 0x51, 0x53];
                let a = sprite.insert(rom[i], rom[i + 1], lv06a[prng.nextInt(lv06a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4F:
                const lv06b = [0x4D, 0x4F, 0x51, 0x53];
                let b = sprite.insert(rom[i], rom[i + 1], lv06b[prng.nextInt(lv06b.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x4D:
            case 0x51:
            case 0x53:
                const lv06c = [0x4D, 0x51, 0x53];
                let c = sprite.insert(rom[i], rom[i + 1], lv06c[prng.nextInt(lv06c.length)]);
                sprite.copy(c, rom, i);
                break;
            default:
                break;
        }
    }
    for (let i = 0xE3D4; i < 0xE431; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x4F:
                const lv09a = [0x4D, 0x4F, 0x53, 0x5A, 0x5C];
                let a = sprite.insert(rom[i], rom[i + 1], lv09a[prng.nextInt(lv09a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4D:
            case 0x53:
            case 0x5A:
            case 0x5C:
                const lv09b = [0x4D, 0x53, 0x5A, 0x5C];
                let b = sprite.insert(rom[i], rom[i + 1], lv09b[prng.nextInt(lv09b.length)]);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    for (let i = 0xE4FA; i < 0xE560; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x49:
                const lv0Ca = [0x01, 0x47, 0x48, 0x49, 0x53];
                const probsa = [0.25, 0.1, 0.25, 0.1, 0.3];
                let pa = beastMode ? sprite.bias(lv0Ca, probsa) : lv0Ca[prng.nextInt(lv0Ca.length)];
                let a = sprite.insert(rom[i], rom[i + 1], pa);
                sprite.copy(a, rom, i);
                break;
            case 0x01:
            case 0x47:
            case 0x48:
                const lv0Cb = [0x01, 0x47, 0x48, 0x53];
                const probsb = [0.25, 0.1, 0.3, 0.35];
                let pb = beastMode ? sprite.bias(lv0Cb, probsb) : lv0Cb[prng.nextInt(lv0Cb.length)];
                let b = sprite.insert(rom[i], rom[i + 1], pb);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    for (let i = 0xE561; i < 0xE5C1; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x43:
                const lv0Da = [0x09, 0x43, 0x4D, 0x53];
                const probsa = [0.2, 0.25, 0.2, 0.35];
                let pa = beastMode ? sprite.bias(lv0Da, probsa) : lv0Da[prng.nextInt(lv0Da.length)];
                let a = sprite.insert(rom[i], rom[i + 1], pa);
                sprite.copy(a, rom, i);
                break;
            case 0x4C:
                const lv0Db = [0x09, 0x4C, 0x4D, 0x53];
                const probsb = [0.1, 0.25, 0.3, 0.35];
                let pb = beastMode ? sprite.bias(lv0Db, probsb) : lv0Db[prng.nextInt(lv0Db.length)];
                let b = sprite.insert(rom[i], rom[i + 1], pb);
                sprite.copy(b, rom, i);
                break;
            case 0x09:
            case 0x4D:
                const lv0Dc = [0x09, 0x4D, 0x53];
                const probsc = [0.15, 0.4, 0.45];
                let pc = beastMode ? sprite.bias(lv0Dc, probsc) : lv0Dc[prng.nextInt(lv0Dc.length)];
                let c = sprite.insert(rom[i], rom[i + 1], pc);
                sprite.copy(c, rom, i);
                break;
            default:
                break;
        }
    }
    var lv0Fend = beastMode ? 0xE6A1 : 0xE6BF;
    for (let i = 0xE62C; i < lv0Fend; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x01:
                const lv0Fa = [0x01, 0x06, 0x53, 0x55, 0x56];
                let a = sprite.insert(rom[i], rom[i + 1], lv0Fa[prng.nextInt(lv0Fa.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x21:
                const lv0Fb = [0x06, 0x21, 0x53, 0x55, 0x56];
                let b = sprite.insert(rom[i], rom[i + 1], lv0Fb[prng.nextInt(lv0Fb.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x06:
            case 0x55:
            case 0x56:
                const lv0Fc = [0x06, 0x53, 0x55, 0x56];
                let c = sprite.insert(rom[i], rom[i + 1], lv0Fc[prng.nextInt(lv0Fc.length)]);
                sprite.copy(c, rom, i);
                break;
            default:
                break;
        }
    }
    if (beastMode) {
        const lv0Fg = [0x06, 0x53, 0x55, 0x56];
        const probs = [0.35, 0.35, 0.15, 0.15];
        for (let i = 0xE6A4; i < 0xE6BF; i += 3) {
            let a = sprite.insert(rom[i], rom[i + 1], sprite.bias(lv0Fg, probs));
            sprite.copy(a, rom, i);
        }
    }
    for (let i = 0xE6C0; i < 0xE705; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x21:
                const lv10a = [0x01, 0x08, 0x20, 0x21, 0x3A, 0x55];
                let a = sprite.insert(rom[i], rom[i + 1], lv10a[prng.nextInt(lv10a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x01:
            case 0x08:
            case 0x20:
            case 0x3A:
            case 0x55:
                const lv10b = [0x01, 0x08, 0x20, 0x3A, 0x55];
                let b = sprite.insert(rom[i], rom[i + 1], lv10b[prng.nextInt(lv10b.length)]);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    for (let i = 0xE77C; i < 0xE7C7; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        switch (s) {
            case 0x4D:
                const lv12a = [0x4D, 0x58];
                let a = sprite.insert(rom[i], rom[i + 1], lv12a[prng.nextInt(lv12a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x58:
            case 0x5A:
                const lv12b = [0x4D, 0x58, 0x5A];
                let b = sprite.insert(rom[i], rom[i + 1], lv12b[prng.nextInt(lv12b.length)]);
                sprite.copy(b, rom, i);
                break;
            default:
                break;
        }
    }
    const lv18karamenbo = [0xE9D6, 0xE9D9, 0xE9DF, 0xE9E2, 0xE9E5];
    for (let i = 0; i < lv18karamenbo.length; i++) {
        let prob = beastMode ? 0.13 : 0.07;
        rom[lv18karamenbo[i]] = prng.nextFloat() < prob ? 0x35 : 0x34;
    }
    for (let i = 0xE077; i < 0xEBB5; i += 3) {
        //skipping levels 07, 09, and 16
        if ((i < 0xE30C) || ((i > 0xE384) && (i < 0xE3D4)) || ((i > 0xE431) && (i < 0xE8F7)) || (i > 0xE954)) {
            let s = sprite.extract(rom[i], rom[i + 1]);
            if (rom[i] == 0xFF) {
                i -= 2;
            } else if (piranha.indexOf(s) > -1) {
                const prob = [0.15, 0.85];
                let p = beastMode ? sprite.bias(piranha, prob) : piranha[prng.nextInt(piranha.length)];
                let n = sprite.insert(rom[i], rom[i + 1], p);
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
        const midway = [0x17];
        for (x in midwayEnemies) {
            for (let i = midwayEnemies[x].start; i < midwayEnemies[x].stop; i += 3) {
                let s = sprite.extract(rom[i], rom[i + 1]);
                if (midway.indexOf(s) > -1) {
                    let n = sprite.insert(rom[i], rom[i + 1], midwayEnemies[x].enemies[prng.nextInt(midwayEnemies[x].enemies.length)]);
                    sprite.copy(n, rom, i);
                }
            }
        }
		/*work in progress
		const floatingFaces = [0xE9EC, 0xE9F2, 0xE9F5, 0xE9FB, 0xE9FE];
		floatingFaces.forEach((offset, index) => {
			let xPos = index == 0 ? prng.nextInt(0x04) + 0x10 : prng.nextInt(0x07) + 0x0B;
			rom[offset + 1] = sprite.xPosition(xPos, rom[offset + 1]);
			rom[offset + 2] = prng.nextInt(0x0E) + 0x31;
		});
        */
    }
}
