function randomizeLevels(rom) {
    let normalBytes = [0x00, 0x01, 0x03, 0x04, 0x06, 0x0A, 0x0B, 0x0C, 0x0E, 0x15, 0x16, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F];
    let normalOffsets = [0x3C218, 0x3C23B, 0x3C239, 0x3C23C, 0x3C240, 0x3C268, 0x3C269, 0x3C26A, 0x3C25E, 0x3C24B, 0x3C24C, 0x3C21C, 0x3C27E, 0x3C290, 0x3C25C, 0x3C23E, 0x3C282, 0x3C292];
    let secretBytes = [0x02, 0x07, 0x08, 0x0F, 0x11, 0x12, 0x14];
    let secretOffsets = [0x3C23A, 0x3C241, 0x3C242, 0x3C260, 0x3C21D, 0x3C254, 0x3C24A];
    //level offset and zone clear byte
    let bossSetOne = [[0x3C238, 0x05], [0x3C243, 0x09], [0x3C24D, 0x0E], [0x3C255, 0x11], [0x3C261, 0x17], [0x3C26B, 0x1D]];
    //level byte and zone clear offset
    let bossSetTwo = [[0x05, 0x304F6], [0x09, 0x304FA], [0x17, 0x30508], [0x13, 0x30504], [0x10, 0x30501], [0x0D, 0x304FE]];
    shuffle(normalBytes);
    //prevents 0x1A as Mushroom House
    while (normalBytes[0] == 0x1A) { shuffle(normalBytes) }
    normalOffsets.forEach((offset, index) => { rom[offset] = normalBytes[index] });
    shuffle(secretBytes);
    secretOffsets.forEach((offset, index) => { rom[offset] = secretBytes[index] });
    shuffle(bossSetTwo);
    for (let i = 0; i < bossSetOne.length; i++) {
        rom[bossSetOne[i][0]] = bossSetTwo[i][0];
        rom[bossSetTwo[i][1]] = bossSetOne[i][1];
    }
}

function randomizeBosses(rom) {
    //boss offset and gfx byte
    let bossSetOne = [[0x8E03, 0x84], [0x8E08, 0x8C], [0x8E0D, 0xAC], [0x8E12, 0x9C], [0x8E17, 0x94], [0x8E1C, 0xA4]];
    //boss byte (level) and gfx offset
    let bossSetTwo = [[0x05, 0x1413B], [0x09, 0x1413D], [0x0D, 0x14145], [0x10, 0x14141], [0x13, 0x1413F], [0x17, 0x14143]];
    const version = rom[0x14C] == 0x02 ? 0x7 : 0x0;
    shuffle(bossSetTwo);
    for (let i = 0; i < bossSetOne.length; i++) {
        rom[bossSetOne[i][0]] = bossSetTwo[i][0];
        rom[bossSetTwo[i][1] - version] = (bossSetOne[i][1] - version);
    }
}

function swapExits(rom) {
    const dualExits = {
        "tree2": {level: 0x02, offsets: [0x2A385, 0x29947]},
        "hippo": {level: 0x11, offsets: [0x4C8EB, 0x4CA7F]},
        "space1": {level: 0x12, offsets: [0x4DA53, 0x4D27B]},
        "macro1": {level: 0x14, offsets: [0x54ACE, 0x5475A]},
        "pumpkin2": {level: 0x07, offsets: [0x49215, 0x4949E]},
        "pumpkin3": {level: 0x08, offsets: [0x49F61, 0x499A7]},
        "turtle2": {level: 0x0F, offsets: [0x51D99, 0x51D29]}
    }
    let swap = array => {
        let temp = rom[array[0]];
        rom[array[0]] = rom[array[1]];
        rom[array[1]] = temp;
    }
    if (doAllDuals) {
        for (l in dualExits) {
            if (dualExits[l].level != 0x11 && rom[0x3C24A] != dualExits[l].level) swap(dualExits[l].offsets);
            else if (rom[0x3C24A] == 0x11) swap(dualExits[l].offsets);
        }
    } else if (doRandomDuals) {
        for (l in dualExits) {
            if (rng.nextBool()) swap(dualExits[l].offsets);
        }
    }
}

function randomizeGambling(rom) {
    let costOffsets = [0x3F45F, 0x3F428, 0x3F3F1, 0x3F3BA];
    if (doOHKO) costOffsets.forEach(offset => { rom[offset] = 0x99; rom[offset + 1] = 0x09; });
    else {
        let firstCost = rng.nextInt(106) + 20; //20 to 125
        let secondCost = rng.nextInt(251) + 100; //100 to 350
        if (secondCost <= firstCost) {
            secondCost += 75;
        }
        let thirdCost = rng.nextInt(351) + 250; //250 to 600
        if (thirdCost <= secondCost) {
            thirdCost += 125;
        }
        let fourthCost = rng.nextInt(450) + 550; //550 to 999
        if (fourthCost <= thirdCost) {
            fourthCost += 150;
        }
        let costs = [firstCost.toString(), secondCost.toString(), thirdCost.toString(),
                     fourthCost.toString()];
        costOffsets.forEach((offset, index) => {
            rom[offset + 1] = costs[index].length > 2 ? parseInt(costs[index][0], 16) : 0x00;
            rom[offset] = parseInt(costs[index].slice(-2), 16);
        });
    }
}
