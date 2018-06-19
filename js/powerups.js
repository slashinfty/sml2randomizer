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
