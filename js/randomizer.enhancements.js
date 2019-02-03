function randomizeMusic(rom) {
    const levelMusic = [0x01, 0x0B, 0x11, 0x13, 0x14, 0x17, 0x1D, 0x1F, 0x28];
    const overworldMusic = [0x05, 0x06, 0x0E, 0x10, 0x12, 0x1B, 0x1C, 0x1E];
    const overworldOffsets = [0x3004F, 0x3EA9B, 0x3D186, 0x3D52B, 0x3D401, 0x3D297, 0x3D840, 0x3D694, 0x3D758];
    overworldOffsets.forEach(offset => rom[offset] = overworldMusic[rng.nextInt(overworldMusic.length)]);
    if (rng.nextFloat() < 0.01) {
        rom[0x3004F] = 0x1D;
        for (let i = 0x5619; i <= 0x5885; i += 0x14) rom[i] = 0x1D;
    } else for (let i = 0x5619; i <= 0x5885; i += 0x14) rom[i] = levelMusic[rng.nextInt(levelMusic.length)];
}

function randomFastMusic(rom) {
    const fastOffsets = [0x1205C, 0x1251F, 0x12B45, 0x12CF2, 0x12E9B, 0x131A6, 0x13879, 0x13A38, 0x13EC6];
    if (rng.nextFloat() < 0.05) {
        fastOffsets.forEach(offset => { rom[offset] += 0x04; rom[offset + 0x01] = rom[offset + 0x03]; });
    } else {
        fastOffsets.forEach(offset => {
            if (rng.nextFloat() < 0.3) { rom[offset] += 0x04; rom[offset + 0x01] = rom[offset + 0x03]; }
        });
    }
}

function randomizeBossHealth(rom) {
    let healthSetOne = [0x8FBB, 0x8FA9, 0x8E58]; //pigs
    let healthSetTwo = [0x8E52, 0x8E5B, 0x8E61]; //bird, octopus, rat
    let healthSetThree = [0x8E5E, 0x8E55, 0x8E64, 0x8E67, 0x8E6A]; //tatanga, witch, wario
    healthSetOne.forEach(offset => rom[offset] = 0x02 * (rng.nextInt(3) + 2));
    healthSetTwo.forEach(offset => rom[offset] = 0x02 * (rng.nextInt(4) + 3));
    healthSetThree.forEach(offset => rom[offset] = 0x02 * (rng.nextInt(3) + 3));
}

function oneHitKnockOut(rom) {
    if (!doPowerups) ohkoPowerups(rom);
    //set lives to 0
    let livesOffsets = rom[0x14C] == 0x00 ? [0x2920, 0x30241, 0x27F2] : [0x2923, 0x30241, 0x27F5];
    livesOffsets.forEach(offset => rom[offset] = 0x00);
    //disable soft reset
    for (let i = 0; i < 3; i++) rom[0x296 + i] = 0x00;
    //disable start+select to exit levels
    let exitOffset = rom[0x14C] == 0x02 ? 0x276E : 0x276B;
    rom[exitOffset] = 0x18;
}