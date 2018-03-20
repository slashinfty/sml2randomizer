const asciiCredits = {
    "alphaNum": [
        {char: " ", byte: 0x20},
        {char: "0", byte: 0x30},
        {char: "1", byte: 0x31},
        {char: "2", byte: 0x32},
        {char: "3", byte: 0x33},
        {char: "4", byte: 0x34},
        {char: "5", byte: 0x35},
        {char: "6", byte: 0x36},
        {char: "7", byte: 0x37},
        {char: "8", byte: 0x38},
        {char: "9", byte: 0x39},
        {char: "A", byte: 0x41},
        {char: "B", byte: 0x42},
        {char: "C", byte: 0x43},
        {char: "D", byte: 0x44},
        {char: "E", byte: 0x45},
        {char: "F", byte: 0x46},
        {char: "G", byte: 0x47},
        {char: "H", byte: 0x48},
        {char: "I", byte: 0x49},
        {char: "J", byte: 0x4A},
        {char: "K", byte: 0x4B},
        {char: "L", byte: 0x4C},
        {char: "M", byte: 0x4D},
        {char: "N", byte: 0x4E},
        {char: "O", byte: 0x4F},
        {char: "P", byte: 0x50},
        {char: "Q", byte: 0x51},
        {char: "R", byte: 0x52},
        {char: "S", byte: 0x53},
        {char: "T", byte: 0x54},
        {char: "U", byte: 0x55},
        {char: "V", byte: 0x56},
        {char: "W", byte: 0x57},
        {char: "X", byte: 0x58},
        {char: "Y", byte: 0x59},
        {char: "Z", byte: 0x5A}
    ]
};

const asciiFileSelect = {
    "hex": [
        {char: " ", byte: 0xFF},
        {char: "0", byte: 0xD9},
        {char: "1", byte: 0xDA},
        {char: "2", byte: 0xDB},
        {char: "3", byte: 0xDC},
        {char: "4", byte: 0xDD},
        {char: "5", byte: 0xDE},
        {char: "6", byte: 0xDF},
        {char: "7", byte: 0xE0},
        {char: "8", byte: 0xE1},
        {char: "9", byte: 0xE2},
        {char: "A", byte: 0x30},
        {char: "B", byte: 0x31},
        {char: "C", byte: 0x32},
        {char: "D", byte: 0x33},
        {char: "E", byte: 0x34},
        {char: "F", byte: 0x35}
    ]
}

function fileSelectScreen(rom) {
    var alphaOnFileSelectScreen = [0x3E, 0x07, 0xCD, 0x0C, 0x2B, 0x01,
        0x00, 0x06, 0x21, 0x00, 0x5E, 0x11, 0x00, 0x92, 0xCD, 0x36, 0x03,
        0x01, 0x80, 0x03, 0x26, 0x6A, 0x11, 0x80, 0x8E, 0xCD, 0x36, 0x03,
        0x3E, 0x06, 0xCD, 0x0C, 0x2B, 0x06, 0x08, 0x21, 0x00, 0x40, 0x16,
        0x80, 0xCD, 0x36, 0x03, 0x3E, 0x1B, 0xCD, 0x0C, 0x2B, 0x26, 0x70,
        0x06, 0x03, 0xCD, 0x36, 0x03, 0x3E, 0x1A, 0xCD, 0x0C, 0x2B, 0x06,
        0x02, 0x21, 0x66, 0x47, 0x16, 0x93, 0xCD, 0x36, 0x03, 0x3E, 0x0C,
        0xEA, 0x00, 0x21, 0x01, 0x80, 0x03, 0x21, 0xCA, 0x6A, 0x16, 0x8B,
        0xCD, 0x36, 0x03, 0xC9];
    var seed = prng.printSeed;
    var flags = document.getElementById("flags").value;
    var writeToScreen = seed + " " + flags;
    for (var i = 0; i < alphaOnFileSelectScreen.length; i++) {
        rom[0x2B8B + i] = alphaOnFileSelectScreen[i];
    }
    //give numbers the same background as letters
    for (var i = 0; i < 161; i++) {
        rom[0x32D5A + i] = rom[0x68656 + i];
    }
    for (var i = 0; i < writeToScreen.length; i++) {
        const a2h = asciiFileSelect.hex.find(letter => letter.char === writeToScreen.charAt(i));
        rom[0x30A98 + i] = a2h.byte;
    }
}
