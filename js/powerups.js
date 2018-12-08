function randomizePowerups(rom) {
    let free = [0x0F, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F];
    let block = [0x11, 0x12, 0x13, 0x14, 0x15, 0x19];
    let castle = [0x1B, 0x1C, 0x1D, 0x1F];
    //allow heart in Wario Fight if DX unless deer mode
    if (rom[0x148] == 0x05 && !deerMode) {
        castle.push(0x0F);
    }
    for (let i = 0xE077; i < 0xEBB5; i += 3) {
        let s = sprite.extract(rom[i], rom[i + 1]);
        //removes hearts and stars from deer mode
        let freeSet = deerMode ? [0x1B, 0x1C, 0x1D, 0x1F] : free;
        if (rom[i] == 0xFF) {
            i -= 2;
        } else if (free.indexOf(s) > -1) {
            //0x1F is an enemy in level 01
            if ((i >= 0xE0BD) && (i < 0xE123)) {
                if (s != 0x1F) {
                    let n = sprite.insert(rom[i], rom[i + 1], freeSet[prng.nextInt(freeSet.length - 1)]);
                    sprite.copy(n, rom, i);
                }
            //only include 0x1F if it is the original
            } else if (s == 0x1F) {
                let n = sprite.insert(rom[i], rom[i + 1], freeSet[prng.nextInt(freeSet.length)]);
                sprite.copy(n, rom, i);
            } else {
                let n = sprite.insert(rom[i], rom[i + 1], freeSet[prng.nextInt(freeSet.length - 1)]);
                sprite.copy(n, rom, i);
            }
        } else if (block.indexOf(s) > -1) {
            //removes hearts and stars from deer mode
            let blockSet = deerMode ? [0x11, 0x12, 0x13, 0x19] : block;
            const prob = deerMode ? [0.25, 0.05, 0.175, 0.525] : [0.2, 0.05, 0.15, 0.05, 0.05, 0.5];
            let p = beastMode ? sprite.bias(blockSet, prob) : blockSet[prng.nextInt(blockSet.length)];
            let n = sprite.insert(rom[i], rom[i + 1], p);
            sprite.copy(n, rom, i);
        }
    }
    rom[0xA9A9] = castle[prng.nextInt(castle.length)];
    rom[0xACA7] = castle[prng.nextInt(castle.length)];
    
    patch(patchBonusGame, rom);
    rom[0x606AF] = 0x28;
    rom[0x60925] = 0xCA;
    const conveyorPowerups = deerMode ? [0x00, 0x01, 0x02] : [0x00, 0x01, 0x02, 0x03, 0x04];
    const conveyorProbs = deerMode ? [0.6, 0.2, 0.2] : [0.25, 0.15, 0.15, 0.4, 0.05];
    for (let i = 0x60A58; i <= 0x60A7F; i++) {
        rom[i] = beastMode ? sprite.bias(conveyorPowerups, conveyorProbs) : conveyorPowerups[prng.nextInt(conveyorPowerups.length)];
    }
    for (let i = 0x60A2F; i <= 0x60A56; i++) {
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
    let wirePowerups = deerMode ? [0x01, 0x02, 0x03] : [0x01, 0x02, 0x03, 0x04];
    const oneUpPosition = [0x60924, 0x60942, 0x606AE, 0x60717];
    for (let i = 0x00; i < 0x04; i++) {
        let currentWirePowerup = wirePowerups[prng.nextInt(wirePowerups.length)];
        rom[0x60C51 + i] = currentWirePowerup;
        const wireObj = wireGame.lookup.find(powerup => powerup.byte == currentWirePowerup);
        rom[0x3E766 + (3 * i)] = wireObj.graphics;
        if (currentWirePowerup == 0x04) {
			oneUpPosition.forEach(offset => {
				rom[offset] = i;
			});
            wirePowerups.splice(wirePowerups.indexOf(0x04), 1);
        }
    }
}
