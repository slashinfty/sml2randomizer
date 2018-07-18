function randomizeBosses(rom) {
    //boss offset and gfx byte
    var bossSetOne = [[0x8E03, 0x84], [0x8E08, 0x8C], [0x8E0D, 0xAC],
    [0x8E12, 0x9C], [0x8E17, 0x94], [0x8E1C, 0xA4]];
    //boss byte (level) and gfx offset
    var bossSetTwo = [[0x05, 0x1413B], [0x09, 0x1413D], [0x0D, 0x14145],
    [0x10, 0x14141], [0x13, 0x1413F], [0x17, 0x14143]];
    var version = rom[0x14C] == 0x02 ? 0x7 : 0x0;
    shuffle(bossSetTwo);
    for (var i = 0; i < bossSetOne.length; i++) {
        rom[bossSetOne[i][0]] = bossSetTwo[i][0];
        rom[bossSetTwo[i][1] - version] = (bossSetOne[i][1] - version);
    }
}

function randomizeBossHealth(rom) {
    var healthSetOne = [0x8FBB, 0x8FA9, 0x8E58]; //pigs
    var healthSetTwo = [0x8E52, 0x8E5B, 0x8E61]; //bird, octopus, rat
    var healthSetThree = [0x8E5E, 0x8E55, 0x8E64, 0x8E67, 0x8E6A]; //tatanga, witch, wario
    for (var i = 0; i < healthSetOne.length; i++) {
        rom[healthSetOne[i]] = (0x02 * (prng.nextInt(2) + 2));
    }
    for (var i = 0; i < healthSetTwo.length; i++) {
        rom[healthSetTwo[i]] = (0x02 * (prng.nextInt(4) + 3));
    }
    for (var i = 0; i < healthSetThree.length; i++) {
        rom[healthSetThree[i]] = (0x02 * (prng.nextInt(3) + 3));
    }
}
