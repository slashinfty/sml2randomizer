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
