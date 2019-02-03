function randomizeGravity(rom) {
    const v = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    for (let i = 0x1F91 + v; i <= 0x1FB0 + v; i++) {
        switch (rom[i]) {
            case 0x00:
                //no changing levels 07 and 15
                if (i != 0x1F98 + v && i != 0x1FA6 + v) {
                    if (rng.nextFloat() < 0.05) rom[i] = 0x01;
                //no moon for level 08
                } else if (rng.nextFloat() < 0.1 && i != 0x1F99 + v) rom[i] = 0x08;
                break;
            case 0x01:
                if (rng.nextFloat() < 0.1) rom[i] = 0x00;
                else if (rng.nextFloat() < 0.3) rom[i] = 0x08;
                break;
            case 0x08:
                if (rng.nextFloat() < 0.3) rom[i] = 0x00;
                else if (rng.nextFloat() < 0.05) rom[i] = 0x01;
                break;
            default: break;
        }
    }
}

//0x33000-0x3301F | jump table | Mario=$00, Luigi=$04
//0x33020-0x3303F | move table | Ice=$00, Luigi=$03, Mario=$04, Rock=$07

function luigiPhysics(rom) {
    const jumpTable = rom[0x148] == 0x05 ? 0x93D00 : 0x33000;
    const moveTable = rom[0x148] == 0x05 ? 0x93D20 : 0x33020;
    if (doRandomLuigi) {
        for (let i = 0; i < 0x20; i++) {
            if (rng.nextFloat() < 0.15) { rom[jumpTable + i] = 0x04; rom[moveTable + i] = 0x03; }
        }
        //mario only for DX
        if (rom[0x148] == 0x05) for (let i = 0; i < 0x20; i++) {
            if (rom[jumpTable + i] == 0xFF && rng.nextFloat() < 0.15) { rom[jumpTable + i] = 0x00; rom[moveTable + i] = 0x04; }
        }
    } else if (doAllLuigi) { //&&rom[0x148] != 0x05
        for (let i = 0; i < 0x20; i++) { rom[jumpTable + i] = 0x04; rom[moveTable + i] = 0x03; }
    }
}

function randomIcePhysics(rom) {
    const moveTable = rom[0x148] == 0x05 ? 0x93D20 : 0x33020;
    for (let i = 0; i < 0x20; i++) {
        if (rng.nextFloat() < 0.1) rom[moveTable + i] = 0x00;
    }
}

function randomizeScrolling(rom) {
    const v = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    let levels = [0x1F71, 0x1F72, 0x1F73, 0x1F74, 0x1F76, 0x1F79, 0x1F7A, 0x1F7B, 0x1F7C, 0x1F7D, 0x1F7E, 0x1F7F, 0x1F81, 0x1F82, 0x1F83, 0x1F84, 0x1F85, 0x1F88, 0x1F8A, 0x1F8F, 0x1F90];
    //if level 12 has moon, remove from scrolling
    if (rom[0x1FA3 + v] == 0x08) levels.splice(levels.indexOf(0x1F83), 1);
    levels.forEach(level => {
        let offset = level + v;
        if (rom[offset] == 0x00 && rng.nextFloat() < 0.08) rom[offset] = 0x01;
        else if (rom[offset] == 0x01 && rng.nextFloat() < 0.25) rom[offset] = 0x00;
    });
    //if level 12 is scrolling, swap midway bell for money bag
    if (rom[0x1F83 + v] = 0x01) { let bag = sprite.insert(0xE7A6, 0xE7A7, 0x1F); sprite.copy(bag, rom, 0xE7A6); }
}

function fastScrolling(rom) {
    const v = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    let fast = [0x00, 0x05, 0x09, 0x0B, 0x0C, 0x0D, 0x10, 0x11, 0x13, 0x17, 0x19, 0x1F];
    let speedTable = rom[0x148] == 0x05 ? 0x93D40 : 0x33040;
    //if level 11 has moon, remove from fast
    if (rom[0x1FA2 + v] == 0x08) fast.splice(fast.indexOf(0x11), 1);
    //if level 0C is the first level, remove from fast
    if (rom[0x3C218] == 0x0C) fast.splice(fast.indexOf(0x0C), 1);
    fast.forEach(level => {
        if (doRandomFast && rom[0x1F71 + v + level] == 0x01 && rng.nextFloat() < 0.4) rom[speedTable + level] = 0x02;
        else if (doAllFast && rom[0x1F71 + v + level] == 0x01) rom[speedTable + level] = 0x02;
    });
}