const ascii = [
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
    {char: "A", byte: 0x35},
    {char: "B", byte: 0x36},
    {char: "C", byte: 0x37},
    {char: "D", byte: 0x38},
    {char: "E", byte: 0x39},
    {char: "F", byte: 0x3A},
    {char: "G", byte: 0x3B},
    {char: "H", byte: 0x3C},
    {char: "I", byte: 0x3D},
    {char: "J", byte: 0x3E},
    {char: "K", byte: 0x3F},
    {char: "L", byte: 0x40},
    {char: "M", byte: 0x41},
    {char: "N", byte: 0x42},
    {char: "O", byte: 0x43},
    {char: "P", byte: 0x44},
    {char: "Q", byte: 0x45},
    {char: "R", byte: 0x46},
    {char: "S", byte: 0x47},
    {char: "T", byte: 0x48},
    {char: "U", byte: 0x49},
    {char: "V", byte: 0x4A},
    {char: "W", byte: 0x4B},
    {char: "X", byte: 0x4C},
    {char: "Y", byte: 0x4D},
    {char: "Z", byte: 0x4E},
    {char: "a", byte: 0x65},
    {char: "b", byte: 0x66},
    {char: "c", byte: 0x67},
    {char: "d", byte: 0x68},
    {char: "e", byte: 0x69},
    {char: "f", byte: 0x6A},
    {char: "g", byte: 0x6B},
    {char: "h", byte: 0x6C},
    {char: "i", byte: 0x6D},
    {char: "j", byte: 0x6E},
    {char: "k", byte: 0x6F},
    {char: "l", byte: 0x70},
    {char: "m", byte: 0x71},
    {char: "n", byte: 0x72},
    {char: "o", byte: 0x73},
    {char: "p", byte: 0x74},
    {char: "q", byte: 0x75},
    {char: "r", byte: 0x76},
    {char: "s", byte: 0x77},
    {char: "t", byte: 0x78},
    {char: "u", byte: 0x79},
    {char: "v", byte: 0x7A},
    {char: "w", byte: 0x7B},
    {char: "x", byte: 0x7C},
    {char: "y", byte: 0x7D},
    {char: "z", byte: 0x7E}
];

function fileSelectScreen(rom, seed, flags) {
    let writeSeed = seed;
    let flagArray = flags.split('+');
    let writeFlags = flagArray[0].substr(0, 16);
    //disable easy mode
    rom[0x30388] = 0x00;
    let randomizerText = [0x46, 0x35, 0x42, 0x38, 0x43, 0x41, 0x3D, 0x4E, 0x39, 0x46];
    randomizerText.forEach((letter, index) => rom[0x30A99 + index] = letter);
    for (let i = 0; i < writeSeed.length; i++) {
        const a2h = ascii.find(letter => letter.char === writeSeed.charAt(i));
        rom[0x30AD8 + i] = a2h.byte;
    }
    let flagOffset = 0x30AFB;
    if (writeFlags.length > 2) flagOffset = writeFlags.length % 2 === 0 ? 0x30AFB - (writeFlags.length / 2 - 1) : 0x30AFB - Math.floor(writeFlags.length / 2);
    for (let j = 0; j < writeFlags.length; j++) {
        const a2h = ascii.find(letter => letter.char === writeFlags.charAt(j));
        rom[flagOffset + j] = a2h.byte;
    }
}

function credits(rom) {
    function writeSentence(sentence, dest) {
        for (let i = 0; i < sentence.length; i++) rom[dest + i] = sentence.charCodeAt(i);
    }
    const randomSentences = {
        "quotes": [
            {line1: "  BUT OUR PRINCESS  ", line2: "IS IN ANOTHER CASTLE"},
            {line1: "   OH DAISY DAISY   ", line2: "  THANK YOU MARIO   "},
            {line1: "  MARIOS ADVENTURE  ", line2: "    IS NOW OVER     "},
            {line1: "   YOU REALLY BEAT  ", line2: " ME THIS TIME MARIO "}
        ],
        "facts": [
            {line1: "   A SUPERJUMP IS   ", line2: "  HOLDING JUMP FOR  ", line3: "  21 TO 26 FRAMES   "},
            {line1: "   WHEN YOU KILL    ", line2: "  100 ENEMIES YOU   ", line3: "   GET A STARMAN    "},
            {line1: "  WHEN YOU GET HIT  ", line2: " YOU HAVE 126 FRAMES", line3: "  OF INVINCIBILITY  "},
            {line1: "  IT IS FASTER TO   ", line2: "  NOT JUMP AROUND   ", line3: " WITH MOON PHYSICS  "},
            {line1: "     HOLDING UP     ", line2: "   WHILE JUMPING    ", line3: " MAKES YOU GO HIGHER"},
            {line1: "   LET GO OF RUN    ", line2: "    TO DROP OFF     ", line3: "   LEDGES QUICKER   "},
            {line1: " LEAVE WARIO ROOM 1 ", line2: " AT XX0 XX4 OR XX8  ", line3: " TO SPEED UP PHASE 2"},
            {line1: " AFTER HIS PHASE 3  ", line2: " STAND INSIDE WARIO ", line3: " FOR THE SHOE GLITCH"},
            {line1: "    THERE ARE 27    ", line2: "   DISTINCT JUMP    ", line3: "   HEIGHTS IN SML2  "},
            {line1: "  TOTAKAS SONG IS   ", line2: "  HIDDEN SOMEWHERE  ", line3: "  IN MARIO LAND 2   "},
            {line1: "  LOSING ALL YOUR   ", line2: " LIVES MEANS LOSING ", line3: "  ALL GOLDEN COINS  "}
        ],
        "songs": [
            {line1: "   1   2    3   4   ", line2: "    LETS CHA CHA    ",
             line3: "  TAKE UR LEFT FOOT ", line4: "  DIP IT LIKE THIS  ",
             line5: "   PUT YOUR HANDS   ", line6: " RIGHT UP ON UR HIPS",
             line7: "   NOW DO THE DIP   ", line8: "    CHA CHA CHA     "},
            {line1: "      ITS THE       ", line2: "     STAR SONG      ",
             line3: "     THAT FUNKY     ", line4: "     STAR SONG      ",
             line5: "      ITS THE       ", line6: "     STAR SONG      ",
             line7: "     THAT FUNKY     ", line8: "     STAR SONG      "},
            {line1: "  TAKE YOU TO THE   ", line2: "    LAKESIDE INN    ",
             line3: "   PUPPY CHUCKED    ", line4: "    IN THE LAKE     ",
             line5: " THROWING YOUR DOG  ", line6: " RIGHT INTO THE LAKE",
             line7: "   BUT ITS ALRIGHT  ", line8: " HE WILL BE ALRIGHT "},
            {line1: " JUMPING EVERY DAY  ", line2: " JUMPING EVERY DAY  ",
             line3: "   IN THE GARDEN    ", line4: "     AT THE BAY     ",
             line5: "  TAKING YOUR WORD  ", line6: " SO WHAT DO YOU SAY ",
             line7: " JUMPING EVERY DAY  ", line8: " JUMPING EVERY DAY  "},
            {line1: "     A   B   C      ", line2: "   A B C D E F G    ",
             line3: "   H  I  J  K  L    ", line4: "     M  N  O  P     ",
             line5: "     Q   R   S      ", line6: "     T   U   V      ",
             line7: "                    ", line8: "                    "},
            {line1: " I WANT TO THANK YOU", line2: "  ALL FOR WATCHING  ",
             line3: "  HAVE A GOOD DAY   ", line4: "     COME AGAIN     ",
             line5: " THANK YOU SO MUCH  ", line6: " THANK YOU SO MUCH  ",
             line7: " AND UNTIL NEXT TIME", line8: "      GOOD BYE      "}
        ]
    }
    let quoteIndex = rng.nextInt(randomSentences.quotes.length);
	function randomizeFacts() {
        let allFacts = randomSentences.facts.slice(0);
        for (let i = 0; i < 3; i++) {
            let n = rng.nextInt(allFacts.length - i);
            let a = allFacts.splice(n, 1);
            allFacts.push(a[0]);
        }
        return allFacts.slice(-3);
    }
    var randomFacts = randomizeFacts();
    let songIndex = rng.nextInt(randomSentences.songs.length);
    const sentences = {
        "sentence01": {line: "  SML2 RANDO STAFF  ", offsets: [0x6974D]},
        "sentence02": {line: "      CREATOR       ", offsets: [0x69763]},
        "sentence03": {line: "     SLASHINFTY     ", offsets: [0x69778]},
        "sentence04": {line: "      ROMHACKER     ", offsets: [0x6978D, 0x697B7, 0x697E1]},
        "sentence05": {line: "       TORUZZ       ", offsets: [0x697A2]},
        "sentence06": {line: "     RACCOON SAM    ", offsets: [0x697CC]},
        "sentence07": {line: "      SMELLYMOO     ", offsets: [0x697F6]},
        "sentence08": {line: "     PROGRAMMER     ", offsets: [0x69835]},
        "sentence09": {line: "       VEEARR       ", offsets: [0x69820]},
        "sentence10": {line: "     DOCTORHUGS     ", offsets: [0x6984A]},
        "sentence11": {line: "  TESTING  PLAYERS  ", offsets: [0x698AF]},
        "sentence12": {line: "      OH DEER       ", offsets: [0x698C4]},
        "sentence13": {line: "    BEASTFRISIAN    ", offsets: [0x698D9]},
        "sentence14": {line: "       TYPWO        ", offsets: [0x698EE]},
        "sentence15": {line: "      RAVETUBA      ", offsets: [0x69903]},
        "sentence16": {line: "      WOLFRUNE      ", offsets: [0x69918]},
        "sentence17": {line: "   I PLAYED THIS    ", offsets: [0x6997D]},
        "sentence18": {line: "   GAME AS A KID    ", offsets: [0x69992]},
        "sentence19": {line: " THANK YOU EVERYONE ", offsets: [0x699F7]},
        "sentence20": {line: "WHO MADE THIS HAPPEN", offsets: [0x69A0C]},
        "sentence21": {line: "   MY FRIENDS AND   ", offsets: [0x69A21]},
        "sentence22": {line: "      MY FAMILY     ", offsets: [0x69A36]},
        "sentence23": {line: "  SPEEDRUNNERS AND  ", offsets: [0x69A4B]},
        "sentence24": {line: "  RANDO COMMUNITY   ", offsets: [0x69A60]},
        "sentence25": {line: " NOW FOR SOME FACTS ", offsets: [0x69AC6]},
        "sentence26": {line: "   THATS ALL FOR    ", offsets: [0x69B93]},
        "sentence27": {line: "  THIS SEEDS FACTS  ", offsets: [0x69BA8]},
        "sentence28": {line: "      TIME FOR      ", offsets: [0x69C0E]},
        "sentence29": {line: "    ICEPLUG SINGS   ", offsets: [0x69C22]},
        "quote01": {line: randomSentences.quotes[quoteIndex].line1, offsets: [0x696CF]},
        "quote02": {line: randomSentences.quotes[quoteIndex].line2, offsets: [0x696E3]},
        "fact01": {line: randomFacts[0].line1, offsets: [0x69ADC]},
        "fact02": {line: randomFacts[0].line2, offsets: [0x69AF0]},
        "fact03": {line: randomFacts[0].line3, offsets: [0x69B04]},
        "fact04": {line: randomFacts[1].line1, offsets: [0x69B19]},
        "fact05": {line: randomFacts[1].line2, offsets: [0x69B2D]},
        "fact06": {line: randomFacts[1].line3, offsets: [0x69B41]},
        "fact07": {line: randomFacts[2].line1, offsets: [0x69B56]},
        "fact08": {line: randomFacts[2].line2, offsets: [0x69B6A]},
        "fact09": {line: randomFacts[2].line3, offsets: [0x69B7E]},
        "song01": {line: randomSentences.songs[songIndex].line1, offsets: [0x69C37]},
        "song02": {line: randomSentences.songs[songIndex].line2, offsets: [0x69C4C]},
        "song03": {line: randomSentences.songs[songIndex].line3, offsets: [0x69C61]},
        "song04": {line: randomSentences.songs[songIndex].line4, offsets: [0x69C76]},
        "song05": {line: randomSentences.songs[songIndex].line5, offsets: [0x69C8B]},
        "song06": {line: randomSentences.songs[songIndex].line6, offsets: [0x69CA0]},
        "song07": {line: randomSentences.songs[songIndex].line7, offsets: [0x69CB5]},
        "song08": {line: randomSentences.songs[songIndex].line8, offsets: [0x69CCA]}
    }
    for (x in sentences) {
        for (let i = 0; i < sentences[x].offsets.length; i++) writeSentence(sentences[x].line, sentences[x].offsets[i]);
    }
}
