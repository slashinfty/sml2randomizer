function randomizeMusic(rom) {
    const levelMusic = [0x01, 0x0B, 0x11, 0x13, 0x14, 0x17, 0x1D,
    0x1F, 0x28];
    const overworldMusic = [0x05, 0x06, 0x0E, 0x10, 0x12, 0x1B, 0x1C, 0x1E];
    const overworldOffsets = [0x3004F, 0x3EA9B, 0x3D186, 0x3D52B, 0x3D401,
    0x3D297, 0x3D840, 0x3D694, 0x3D758];
	overworldOffsets.forEach(offset => {
		rom[offset] = overworldMusic[prng.nextInt(overworldMusic.length)];
	});
    if (prng.nextFloat() < 0.01) {
        rom[0x3004F] = 0x1D;
        for (let i = 0x5619; i <= 0x5885; i += 0x14) {
            rom[i] = 0x1D;
        }
    } else {
        for (let i = 0x5619; i <= 0x5885; i += 0x14) {
            rom[i] = levelMusic[prng.nextInt(levelMusic.length)];
        }
    }
    if (beastMode) {
        const fastOffsets = [0x1205C, 0x1251F, 0x12B45, 0x12CF2, 0x12E9B, 0x131A6,
        0x13879, 0x13A38, 0x13EC6];
        if (prng.nextFloat() < 0.05) {
			fastOffsets.forEach(offset => {
				rom[offset] += 0x04;
				rom[offset + 0x01] = rom[offset + 0x03];
			});
        } else {
			fastOffsets.forEach(offset => {
				if (prng.nextFloat() < 0.3) {
					rom[offset] += 0x04;
					rom[offset + 0x01] = rom[offset + 0x03];
				}
			});
        }
    }
}
