function randomizePlatforms(rom) {
    const lv04 = [0x28, 0x29, 0x2A, 0x2B, 0x2D, 0x2E];
    const lv05 = [0x38, 0x3D];
    const lv18 = [0x60, 0x61, 0x67];
    sprite.randomize(rom, lv04, 0xE1EF, 0xE249);
    sprite.randomize(rom, lv05, 0xE24A, 0xE2A1);
    sprite.randomize(rom, lv18, 0xE99E, 0xEA2E);
    if (beastMode) {
        for (let i = 0xE9A3; i < 0xE9CE; i += 3) { //randomizing height of platforms in Castle
            rom[i] = rom[i] == 0x5E ? prng.nextInt(0x8) + 0x57 : prng.nextInt(0x8) + 0x38;
        }
    }
}
