//list of settings
var doPatchDX, doLevels, doBosses, doAllDuals, doRandomDuals, doGambling, doEnemies, doPowerups, doPlatforms, doBonus, doGravity, doIce, doRandomLuigi, doAllLuigi, doScrolling, doRandomFast, doAllFast, doMusic, doFastMusic, doBossHP, doOHKO;

//list of patches
var base1_0patch = 'patches/basepatch_v10.ips';
var base1_2patch = 'patches/basepatch_v12.ips';
var base1_0DXpatch = 'patches/basepatchDX_v10.ips';
var base1_2DXpatch = 'patches/basepatchDX_v12.ips';
var slot999patch = 'patches/slotmachines_999.ips';
var slot999DXpatch = 'patches/slotmachines_999DX.ips';
var slotQuestionPatch = 'patches/slotmachines_questionmarks.ips';
var slotQuestionDXpatch = 'patches/slotmachines_questionmarksDX.ips';

//random number generator
//Adapted from https://github.com/bit101/lcg
var rng = {
    a: 1664525,
    c: 1013904223,
    m: Math.pow(2, 32),
    printSeed: "",
    seed: 0,
    setSeed: function(seed) {
        this.printSeed = seed;
        this.seed = parseInt(this.printSeed, 16);
    },
    nextPrng: function() {
        this.seed = (this.seed * this.a +this.c) % this.m;
        return this.seed;
    },
    nextFloat: function() {
        //range [0, 1)
        return this.nextPrng() / this.m;
    },
    nextInt: function(lim) {
        //range [0, lim)
        return Math.floor(this.nextFloat() * lim);
    },
    nextBool: function() {
        //0.5 probability of true
        return this.nextFloat() < 0.5;
    }
};

//sprite manipulation functions
var sprite = {
    extract: (a, b) => {
        let first = ((0b00010000 & a) << 2);
        let second = ((0b11100000 & a) >>> 2);
        let third = ((0b11100000 & b) >>> 5);
        return (first | second | third);
    },
    insert: (a, b, s) => {
        let first = ((s & 0b01000000) >>> 2);
        let second = ((s & 0b00111000) << 2);
        let third = ((s & 0b00000111) << 5);
        return [((a & 0b00001111) | first | second), ((b & 0b00011111) | third)];
    },
    copy: (src, dest, pos) => {
        for (let i = 0; i < 2; i++) {
            dest[pos + i] = src[0 + i];
        }
    },
    randomize: function(rom, poss, start, end) {
        for (let i = start; i < end; i += 3) {
            let s = this.extract(rom[i], rom[i + 1]);
            if (rom[i] == 0xFF) i -= 2;
            else if (poss.indexOf(s) > -1) {
                let n = this.insert(rom[i], rom[i + 1], poss[rng.nextInt(poss.length)]);
                this.copy(n, rom, i);
            }
        }
    }
}

//Adapted from https://github.com/vhelin/wla-dx/blob/master/wlalink/compute.c
function checksum(rom) {
    let csum = 0;
    let comp = 0;
    for (let i = 0x00; i < 0x14E; i++) {
        csum += rom[i];
    }
    for (let j = 0x150, e = rom[0x148] == 0x05 ? 0xFFFFF : 0x7FFFF; j <= e; j++) {
        csum += rom[j];
    }
    rom[0x14E] = (csum >> 8) & 0xFF;
    rom[0x14F] = csum & 0xFF;
    for (let k = 0x134; k <= 0x14C; k++) {
        comp += rom[k];
    }
    comp += 25;
    rom[0x14D] = 0 - (comp & 0xFF);
}

//Fisher-Yates shuffle algorithm
function shuffle(b) {
    for (let i = b.length - 1; i > 0; i--) {
        let r = rng.nextInt(i + 1);
        let a = b[r];
        b[r] = b[i];
        b[i] = a;
    }
}

//verifying ROM
function verification(buffer) {
    let rom = new Uint8Array(buffer);
    let print = "Not a valid MARIOLAND2 ROM";
    let nameInRom = [0x4D, 0x41, 0x52, 0x49, 0x4F, 0x4C, 0x41, 0x4E, 0x44, 0x32, 0x00];
    let countdown = 11;
    nameInRom.forEach((element, index) => {
        if (rom[0x134 + index] == element) {
            countdown--;
        }
    });
    if (countdown == 0) {
        if (rom[0x148] == 0x05) {
            print = "Use the Apply DX option with an original SML2 ROM";
            toggleButton('#randomizeROM', true);
        } else {
            const version = rom[0x14C] == 0x00 ? 'v1.0' : 'v1.2';
            print = "ROM: MARIOLAND2 - " + version;
            toggleButton('#randomizeROM', false);
        }
    } else {
        toggleButton('#randomizeROM', true);
    }
    $('#romUploadLabel').text(print);
}

//go through randomize functions
async function doRandomize(romBuffer) {
    let rom = new Uint8Array(romBuffer);
    if (doPatchDX) {
        let dxPatch = rom[0x14C] == 0x00 ? base1_0DXpatch : base1_2DXpatch;
        let dxIPS = await fetch(dxPatch);
        let dxBuffer = await dxIPS.arrayBuffer();
        romBuffer = patchRom(romBuffer, dxBuffer);
        rom = new Uint8Array(romBuffer);
    } else {
        let basePatch = rom[0x14C] == 0x00 ? base1_0patch : base1_2patch;
        let baseIPS = await fetch(basePatch);
        let baseBuffer = await baseIPS.arrayBuffer();
        romBuffer = patchRom(romBuffer, baseBuffer);
        rom = new Uint8Array(romBuffer);
    }
    if (doGambling || doOHKO) {
        if (doOHKO) {
            let ninesPatch = rom[0x148] == 0x05 ? slot999DXpatch : slot999patch;
            let ninesIPS = await fetch(ninesPatch);
            let ninesBuffer = await ninesIPS.arrayBuffer();
            romBuffer = patchRom(romBuffer, ninesBuffer);
            rom = new Uint8Array(romBuffer);
        } else {
            let questionPatch = rom[0x148] == 0x05 ? slotQuestionDXpatch : slotQuestionPatch;
            let questionIPS = await fetch(questionPatch);
            let questionBuffer = await questionIPS.arrayBuffer();
            romBuffer = patchRom(romBuffer, questionBuffer);
            rom = new Uint8Array(romBuffer);
        }
        randomizeGambling(rom);
    }
    if (doBonus) randomizeBonusGames(rom);
    if (doLevels) randomizeLevels(rom);
    if (doAllDuals || doRandomDuals) swapExits(rom);
    if (doBosses) randomizeBosses(rom);
    if (doEnemies) randomizeEnemies(rom);
    if (doPowerups) randomizePowerups(rom);
    if (doPlatforms) randomizePlatforms(rom);
    if (doGravity) randomizeGravity(rom);
    if (doRandomLuigi || doAllLuigi) luigiPhysics(rom);
    if (doIce) randomIcePhysics(rom);
    if (doScrolling) randomizeScrolling(rom);
    if (doAllFast || doRandomFast) fastScrolling(rom);
    if (doMusic) randomizeMusic(rom);
    if (doFastMusic) randomFastMusic(rom);
    if (doBossHP) randomizeBossHealth(rom);
    if (doOHKO) oneHitKnockOut(rom);  
    let seed = document.getElementById('seedNumber').value;
    let flags = document.getElementById('flagSet').value === '' ? 'vanilla' : document.getElementById('flagSet').value;
    fileSelectScreen(rom, seed, flags);
    credits(rom);
    checksum(rom);
    let link = 'http://sml2r.download/?s=' + seed + '&f=' + flags;
    showLink(link);
    let fileName = 'sml2r-' + seed + '-' + flags;
    let ext = rom[0x148] == 0x05 ? ".gbc" : ".gb";
    saveAs(new Blob([romBuffer], {type: "octet/stream"}), fileName + ext);
}