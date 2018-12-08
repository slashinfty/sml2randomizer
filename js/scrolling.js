function randomizeScrolling(rom) {
    const version = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    var levels = [0x1F71, 0x1F72, 0x1F73, 0x1F74, 0x1F76, 0x1F79, 0x1F7A,
    0x1F7B, 0x1F7C, 0x1F7D, 0x1F7E, 0x1F7F, 0x1F81, 0x1F82, 0x1F83, 0x1F84,
    0x1F85, 0x1F88, 0x1F8A, 0x1F8F, 0x1F90];
    const fastLevels = [0x00, 0x05, 0x09, 0x0B, 0x0C, 0x0D, 0x10, 0x11, 0x13,
    0x17, 0x19, 0x1F];
    if (beastMode && !doBothPhysics && !doLuigiPhysics && !doIcePhysics) {
        if (rom[0x148] != 0x05) {
			if (rom[0x14C] == 0x00) {
				patch(patchPhysicsScrolling_v1_0, rom);
			} else {
				patch(patchPhysicsScrolling_v1_2, rom);
			}
			patch(patchPhysicsScrolling, rom);
		}
    }
    //if level 12 has moon physics, remove from scrolling possibilities
    if (rom[0x1FA3 + version] == 0x08) {
        levels.splice(levels.indexOf(0x1F83), 1);
    }
	levels.forEach(level => {
        let a = level + version;
        if (beastMode) {
            if (rom[a] == 0x00 && prng.nextFloat() < 0.1) {
                rom[a] = 0x01;
            } else if (rom[a] == 0x01 && prng.nextFloat() < 0.6) {
                rom[a] = 0x00;
            }
            //speed up autoscroller
            let currLevel = a - (0x1F71 + version);
            //if level 11 has moon physics, remove from fast scrolling
            if (rom[0x1FA2 + version] == 0x08) {
                fastLevels.splice(fastLevels.indexOf(0x11), 1);
            }
            //if level 0C is first level, remove from fast scrolling
            if (rom[0x3C218] == 0x0C) {
                fastLevels.splice(fastLevels.indexOf(0x0C), 1);
            }
            if (rom[a] == 0x01 && fastLevels.indexOf(currLevel) > -1 && prng.nextFloat() < 0.4) {
                var speedTable = rom[0x148] == 0x05 ? 0x93D40 : 0x33040;
                rom[speedTable + currLevel] = 0x02;
            }
        } else {
            if (rom[a] == 0x00 && prng.nextFloat() < 0.07) {
                rom[a] = 0x01;
            } else if (rom[a] == 0x01 && prng.nextFloat() < 0.15) {
                rom[a] = 0x00;
            }
        }
    });
    //if level 12 is scrolling, swap midway bell for money bag
    if (rom[0x1F83 + version] == 0x01) {
        let bag = sprite.insert(0xE7A6, 0xE7A7, 0x1F);
        sprite.copy(bag, rom, 0xE7A6);
    }
}
