function randomizeLevels(rom) {
    var normalBytes = [0x00, 0x01, 0x03, 0x04, 0x06, 0x0A, 0x0B, 0x0C,
    0x0E, 0x15, 0x16, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F];
    var normalOffsets = [0x3C218, 0x3C23B, 0x3C239, 0x3C23C, 0x3C240,
    0x3C268, 0x3C269, 0x3C26A, 0x3C25E, 0x3C24B, 0x3C24C, 0x3C21C,
    0x3C27E, 0x3C290, 0x3C25C, 0x3C23E, 0x3C282, 0x3C292];
    var secretBytes = [0x02, 0x07, 0x08, 0x0F, 0x11, 0x12, 0x14];
    var secretOffsets = [0x3C23A, 0x3C241, 0x3C242, 0x3C260, 0x3C21D,
    0x3C254, 0x3C24A];
    //level offset and zone clear byte
    var bossSetOne = [[0x3C238, 0x05], [0x3C243, 0x09], [0x3C24D, 0x0E],
    [0x3C255, 0x11], [0x3C261, 0x17], [0x3C26B, 0x1D]];
    //level byte and zone clear offset
    var bossSetTwo = [[0x05, 0x304F6], [0x09, 0x304FA], [0x17, 0x30508],
    [0x13, 0x30504], [0x10, 0x30501], [0x0D, 0x304FE]];
    shuffle(normalBytes);
    //prevents 0x1A as Mushroom House
    while (normalBytes[0] == 0x1A) {
        shuffle(normalBytes);
    }
    for (var i = 0; i < normalOffsets.length; i++) {
        rom[normalOffsets[i]] = normalBytes[i];
    }
    shuffle(secretBytes);
    for (var i = 0; i < secretOffsets.length; i++) {
        rom[secretOffsets[i]] = secretBytes[i];
    }
    shuffle(bossSetTwo);
    for (var i = 0; i < bossSetOne.length; i++) {
        rom[bossSetOne[i][0]] = bossSetTwo[i][0];
        rom[bossSetTwo[i][1]] = bossSetOne[i][1];
    }
}

function swapExits(rom) {
    var exitOffsets = [[0x2A385, 0x29947], [0x4C8EB, 0x4CA7F], [0x4DA53,
    0x4D27B], [0x54ACE, 0x5475A], [0x49215, 0x4949E], [0x49F61, 0x499A7],
    [0x51D99, 0x51D29]];
    for (var i = 0; i < exitOffsets.length; i++) {
        if (prng.nextBool()) {
            var a = rom[exitOffsets[i][0]];
            rom[exitOffsets[i][0]] = rom[exitOffsets[i][1]];
            rom[exitOffsets[i][1]] = a;
        }
    }
}
