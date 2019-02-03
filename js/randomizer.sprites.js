function randomizeEnemies(rom) {
    const mostLevels = [
        {//lv00
            "enemies": [0x01, 0x08, 0x09, 0x3A], "start": 0xE077, "end": 0xE0BC},
        {//lv17
            "enemies": [0x01, 0x08, 0x09, 0x3A], "start": 0xE955, "end": 0xE99D},
        {//lv19
            "enemies": [0x08, 0x09, 0x3A], "start": 0xEA2F, "end": 0xEA7D},
        {//lv1B
            "enemies": [0x08, 0x09, 0x3A], "start": 0xEAA3, "end": 0xEACD},
        {//lv01
            "enemies": [0x1F, 0x20, 0x21, 0x22], "start": 0xE0BD, "end": 0xE123},
        {//lv02
            "enemies": [0x44, 0x58], "start": 0xE124, "end": 0xE181},
        {//lv03
            "enemies": [0x35, 0x3E, 0x40, 0x41, 0x42], "start": 0xE182, "end": 0xE1EE},
        {//lv04
            "enemies": [0x33, 0x34, 0x5D], "start": 0xE1EF, "end": 0xE249},
        {//lv05
            "enemies": [0x08, 0x39, 0x3A], "start": 0xE24A, "end": 0xE2A1},
        {//lv07
            "enemies": [0x4D, 0x54, 0x55, 0x56, 0x5E, 0x5F], "start": 0xE30C, "end": 0xE384},
        {//lv08
            "enemies": [0x4D, 0x57], "start": 0xE385, "end": 0xE3D3},
        {//lv0A
            "enemies": [0x01, 0x40, 0x4B], "start": 0xE432, "end": 0xE49B},
        {//lv0B
            "enemies": [0x08, 0x09, 0x3A, 0x44, 0x4D], "start": 0xE49C, "end": 0xE4F9},
        {//lv0E
            "enemies": [0x05, 0x06, 0x07, 0x08, 0x09, 0x0B, 0x3A, 0x3D], "start": 0xE5C2, "end": 0xE62B},
        {//lv11
            "enemies": [0x05, 0x39, 0x57, 0x5B], "start": 0xE706, "end": 0xE77B},
        {//lv13
            "enemies": [0x5C, 0x5E, 0x5F], "start": 0xE7C8, "end": 0xE822},
        {//lv14
            "enemies": [0x22, 0x23, 0x25, 0x27], "start": 0xE823, "end": 0xE88F},
        {//lv15
            "enemies": [0x07, 0x33, 0x34, 0x3D, 0x5D], "start": 0xE890, "end": 0xE8F6},
        {//lv16
            "enemies": [0x01, 0x08, 0x09, 0x34, 0x3A, 0x55], "start": 0xE8F7, "end": 0xE954},
        {//lv18a
            "enemies": [0x68, 0x69], "start": 0xE99E, "end": 0xEA2E},
        {//lv18b
            "enemies": [0x6E, 0x6F], "start": 0xE99E, "end": 0xEA2E},
        {//lv1F
            "enemies": [0x01, 0x09], "start": 0xEB55, "end": 0xEBB5}
    ];
    mostLevels.forEach(function(level) {
        sprite.randomize(rom, level.enemies, level.start, level.end);
    });

    //special cases
    for (let i = 0xE2A2; i < 0xE30B; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x4E:
                const lv06a = [0x4D, 0x4E, 0x51, 0x53];
                let a = sprite.insert(rom[i], rom[i + 1], lv06a[rng.nextInt(lv06a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4F:
                const lv06b = [0x4D, 0x4F, 0x51, 0x53];
                let b = sprite.insert(rom[i], rom[i + 1], lv06b[rng.nextInt(lv06b.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x4D: case 0x51: case 0x53:
                const lv06c = [0x4D, 0x51, 0x53];
                let c = sprite.insert(rom[i], rom[i + 1], lv06c[rng.nextInt(lv06c.length)]);
                sprite.copy(c, rom, i);
                break;
            default: break;
        }
    }
    for (let i = 0xE3D4; i < 0xE431; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x4F:
                const lv09a = [0x4D, 0x4F, 0x53, 0x5A, 0x5C];
                let a = sprite.insert(rom[i], rom[i + 1], lv09a[rng.nextInt(lv09a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4D: case 0x53: case 0x5A: case 0x5C:
                const lv09b = [0x4D, 0x53, 0x5A, 0x5C];
                let b = sprite.insert(rom[i], rom[i + 1], lv09b[rng.nextInt(lv09b.length)]);
                sprite.copy(b, rom, i);
                break;
            default: break;
        }
    }
    for (let i = 0xE4FA; i < 0xE560; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x49:
                const lv0Ca = [0x01, 0x47, 0x48, 0x49, 0x53];
                let a = sprite.insert(rom[i], rom[i + 1], lv0Ca[rng.nextInt(lv0Ca.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x01: case 0x47: case 0x48:
                const lv0Cb = [0x01, 0x47, 0x48, 0x53];
                let b = sprite.insert(rom[i], rom[i + 1], lv0Cb[rng.nextInt(lv0Cb.length)]);
                sprite.copy(b, rom, i);
                break;
            default: break;
        }
    }
    for (let i = 0xE561; i < 0xE5C1; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x43:
                const lv0Da = [0x09, 0x43, 0x4D, 0x53];
                let a = sprite.insert(rom[i], rom[i + 1], lv0Da[rng.nextInt(lv0Da.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x4C:
                const lv0Db = [0x09, 0x4C, 0x4D, 0x53];
                let b = sprite.insert(rom[i], rom[i + 1], lv0Db[rng.nextInt(lv0Db.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x09: case 0x4D:
                const lv0Dc = [0x09, 0x4D, 0x53];
                let c = sprite.insert(rom[i], rom[i + 1], lv0Dc[rng.nextInt(lv0Dc.length)]);
                sprite.copy(c, rom, i);
                break;
            default: break;
        }
    }
    for (let i = 0xE62C; i < 0xE6BF; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x01:
                const lv0Fa = [0x01, 0x06, 0x53, 0x55, 0x56];
                let a = sprite.insert(rom[i], rom[i + 1], lv0Fa[rng.nextInt(lv0Fa.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x21:
                const lv0Fb = [0x06, 0x21, 0x53, 0x55, 0x56];
                let b = sprite.insert(rom[i], rom[i + 1], lv0Fb[rng.nextInt(lv0Fb.length)]);
                sprite.copy(b, rom, i);
                break;
            case 0x06: case 0x55: case 0x56:
                const lv0Fc = [0x06, 0x53, 0x55, 0x56];
                let c = sprite.insert(rom[i], rom[i + 1], lv0Fc[rng.nextInt(lv0Fc.length)]);
                sprite.copy(c, rom, i);
                break;
            default: break;
        }
    }
    for (let i = 0xE6C0; i < 0xE705; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x21:
                const lv10a = [0x01, 0x08, 0x20, 0x21, 0x3A, 0x55];
                let a = sprite.insert(rom[i], rom[i + 1], lv10a[rng.nextInt(lv10a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x01: case 0x08: case 0x20: case 0x3A: case 0x55:
                const lv10b = [0x01, 0x08, 0x20, 0x3A, 0x55];
                let b = sprite.insert(rom[i], rom[i + 1], lv10b[rng.nextInt(lv10b.length)]);
                sprite.copy(b, rom, i);
                break;
            default: break;
        }
    }
    for (let i = 0xE77C; i < 0xE7C7; i += 3) {
        switch (sprite.extract(rom[i], rom[i + 1])) {
            case 0x4D:
                const lv12a = [0x4D, 0x58];
                let a = sprite.insert(rom[i], rom[i + 1], lv12a[rng.nextInt(lv12a.length)]);
                sprite.copy(a, rom, i);
                break;
            case 0x58: case 0x5A:
                const lv12b = [0x4D, 0x58, 0x5A];
                let b = sprite.insert(rom[i], rom[i + 1], lv12b[rng.nextInt(lv12b.length)]);
                sprite.copy(b, rom, i);
                break;
            default: break;
        }
    }
    
    //"thwomps" in wario's castle
    const karamenbo = [0xE9D6, 0xE9D9, 0xE9DF, 0xE9E2, 0xE9E5];
    karamenbo.forEach(enemy => rom[enemy] = rng.nextFloat < 0.1 ? 0x35 : 0x34);
    
    //piranha plants in multiple levels
    for (let i = 0xE077; i < 0xEBB5; i += 3) {
        //skipping levels 07, 09, and 16
        if (i < 0xE30C || i > 0xE384 && i < 0xE3D4 || i > 0xE431 && i < 0xE8F7 || i > 0xE954) {
            let plants = [0x0C, 0x0D];
            let s = sprite.extract(rom[i], rom[i + 1]);
            if (rom[i] == 0xFF) i -= 2;
            else if (plants.indexOf(s) > -1) {
                let n = sprite.insert(rom[i], rom[i + 1], plants[rng.nextInt(plants.length)]);
                sprite.copy(n, rom, i);
            }
        }
    }
}

function randomizePowerups(rom) {
    let free = [0x0F, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F];
    let block = [0x11, 0x12, 0x13, 0x14, 0x15, 0x19];
    let castle = [0x1B, 0x1C, 0x1D, 0x1F];
    //allow heart in Wario Fight if DX unless ohko
    if (rom[0x148] == 0x05 && !doOHKO) {
        castle.push(0x0F);
    }
    for (let i = 0xE077; i < 0xEBB5; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        //remove hearts and stars from ohko
        let freeSet = doOHKO ? [0x1B, 0x1C, 0x1D, 0x1F] : free;
        if (rom[i] == 0xFF) i -= 2;
        else if (free.indexOf(s) > -1) {
            //1F is an enemy in level 01
            if (i >= 0xE0BD && i < 0xE123) {
                if (s != 0x1F) {
                    let n = sprite.insert(rom[i], rom[i + 1], freeSet[rng.nextInt(freeSet.length - 1)]);
                    sprite.copy(n, rom, i);
                }
            //only include 1F if it is the original
            } else if (s == 0x1F) {
                let n = sprite.insert(rom[i], rom[i + 1], freeSet[rng.nextInt(freeSet.length)]);
                sprite.copy(n, rom, i);
            } else {
                let n = sprite.insert(rom[i], rom[i + 1], freeSet[rng.nextInt(freeSet.length - 1)]);
                sprite.copy(n, rom, i);
            }
        } else if (block.indexOf(s) > -1) {
            //remove hearts and stars from ohko
            let blockSet = doOHKO ? [0x11, 0x12, 0x13, 0x19] : block;
            let n = sprite.insert(rom[i], rom[i + 1], blockSet[rng.nextInt(blockSet.length)]);
            sprite.copy(n, rom, i);
        }
    }
    rom[0xA9A9] = castle[rng.nextInt(castle.length)];
    rom[0xACA7] = castle[rng.nextInt(castle.length)];
}

function ohkoPowerups(rom) { //replaces hearts and stars with money bags if not randomized
    let free = [0x0F, 0x1E];
    let block = [0x14, 0x15];
    for (let i = 0xE077; i < 0xEBB5; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        if (rom[i] == 0xFF) i -=2;
        else if (free.indexOf(s) > -1) {
            let m;
            if (i >= 0xE0BD && i < 0xE123) m = 0x1B; //mushroom in level 01
            else m = 0x1F;
            let n = sprite.insert(rom[i], rom[i + 1], m);
            sprite.copy(n, rom, i);
        } else if (block.indexOf(s) > -1) {
            let n = sprite.insert(rom[i], rom[i + 1], 0x19);
            sprite.copy(n, rom, i);
        }
    }
}

function randomizePlatforms(rom) {
    sprite.randomize(rom, [0x28, 0x29, 0x2A, 0x2B, 0x2D, 0x2E], 0xE1EF, 0xE249); //lv04
    sprite.randomize(rom, [0x38, 0x3D], 0xE24A, 0xE2A1); //lv05
    sprite.randomize(rom, [0x60, 0x61, 0x67], 0xE99E, 0xEA2E); //lv18
    //platform height in lv18
    for (let i = 0xE9A3; i < 0xE9CE; i +=3) rom[i] = rom[i] == 0x5E ? rng.nextInt(0x8) + 0x57 : rng.nextInt(0x8) + 0x38;
}

function randomizeBonusGames(rom) {
    const conveyorPowerups = doOHKO ? [0x00, 0x01, 0x02] : [0x00, 0x01, 0x02, 0x03, 0x04];
    for (let i = 0x60A58; i <= 0x60A7F; i++) rom[i] = conveyorPowerups[rng.nextInt(conveyorPowerups.length)];
    for (let i = 0x60A2F; i <= 0x60A56; i++) rom[i] = conveyorPowerups[rng.nextInt(conveyorPowerups.length)];
    for (let i = 0x60A1A; i <= 0x60A2D; i++) rom[i] = conveyorPowerups[rng.nextInt(conveyorPowerups.length)];
    
    const wirePowerups = doOHKO ? [0x2D, 0x2E, 0x2F] : [0x2D, 0x2E, 0x2F, 0x30];
    for (let i = 0x3E766; i <= 0x3E76F; i += 0x3) rom[i] = wirePowerups[rng.nextInt(wirePowerups.length)];
}