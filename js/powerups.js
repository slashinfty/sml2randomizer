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
    
    patch(patchBonusGame, rom);
    rom[0x606AF] = 0x28;
    rom[0x60925] = 0xCA;
    var conveyorPowerups = [0x00, 0x01, 0x02, 0x03, 0x04];
    var conveyorProbs = [0.25, 0.15, 0.15, 0.4, 0.05];
    for (var i = 0x60A58; i <= 0x60A7F; i++) {
        rom[i] = beastMode ? sprite.bias(conveyorPowerups, conveyorProbs) : conveyorPowerups[prng.nextInt(conveyorPowerups.length)];
    }
    for (var i = 0x60A2F; i <= 0x60A56; i++) {
        rom[i] = beastMode ? sprite.bias(conveyorPowerups, conveyorProbs) : conveyorPowerups[prng.nextInt(conveyorPowerups.length)];
    
    }
    const wireGame = {
       "lookup": [
            {byte: 0x01, graphics: 0x2D},
            {byte: 0x02, graphics: 0x2F},
            {byte: 0x03, graphics: 0x2E},
            {byte: 0x04, graphics: 0x30}
        ]
    }
    var wirePowerups = [0x01, 0x02, 0x03, 0x04];
    var oneUpPosition = [0x60924, 0x60942, 0x606AE, 0x60717];
    for (var i = 0x00; i < 0x04; i++) {
        var currentWirePowerup = wirePowerups[prng.nextInt(wirePowerups.length)];
        rom[0x60C51 + i] = currentWirePowerup;
        const wireObj = wireGame.lookup.find(powerup => powerup.byte == currentWirePowerup);
        rom[0x3E766 + (3 * i)] = wireObj.graphics;
        if (currentWirePowerup == 0x04) {
            for (var j = 0; j < oneUpPosition.length; j++) {
                rom[oneUpPosition[j]] = i;
            }
            wirePowerups.splice(wirePowerups.indexOf(0x04), 1);
        }
    }
}
