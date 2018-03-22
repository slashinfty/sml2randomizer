const ascii = {
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
    var writeToScreen = prng.printSeed + " " + document.getElementById("flags").value;
    for (var i = 0; i < alphaOnFileSelectScreen.length; i++) {
        rom[0x2B8B + i] = alphaOnFileSelectScreen[i];
    }
    //give numbers the same background as letters
    for (var i = 0; i < 161; i++) {
        rom[0x32D5A + i] = rom[0x68656 + i];
    }
    for (var i = 0; i < writeToScreen.length; i++) {
        const a2h = ascii.hex.find(letter => letter.char === writeToScreen.charAt(i));
        rom[0x30A98 + i] = a2h.byte;
    }
}

function credits(rom) {
    function writeSentence(sentence, dest) {
        for (i = 0; i < sentence.length; i++) {
            rom[dest + i] = sentence.charCodeAt(i);
        }
    }
    const randomSentences = {
        "quotes": [
            {line1: "  BUT OUR PRINCESS  ", line2: "IS IN ANOTHER CASTLE"},
            {line1: "   OH DAISY DAISY   ", line2: "  THANK YOU MARIO   "},
            {line1: "  MARIOS ADVENTURE  ", line2: "    IS NOW OVER     "},
            {line1: "   YOU REALLY BEAT  ", line2: " ME THIS TIME MARIO "},
            {line1: "    NEXT TIME TRY   ", line2: "     BEAST MODE     "} //always last one
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
    var sentence01 = "  SML2 RANDO STAFF  ";
    var sentence02 = "      CREATOR       ";
    var sentence03 = "     SLASHINFTY     ";
    var sentence04 = "      ROMHACKER     ";
    var sentence05 = "       TORUZZ       ";
    var sentence06 = "     RACCOON SAM    ";
    var sentence07 = "      SMELLYMOO     ";
    var sentence08 = "     PROGRAMMER     ";
    var sentence09 = "       VEEARR       ";
    var sentence10 = "     DRJOEYHUGS     ";
    var sentence11 = "  TESTING  PLAYERS  ";
    var sentence12 = "      OH DEER       ";
    var sentence13 = "    BEASTFRISIAN    ";
    var sentence14 = "       TYPWO        ";
    var sentence15 = "      RAVETUBA      ";
    var sentence16 = "      WOLFRUNE      ";
    var sentence17 = "   I PLAYED THIS    ";
    var sentence18 = "   GAME AS A KID    ";
    var sentence19 = " THANK YOU EVERYONE ";
    var sentence20 = "WHO MADE THIS HAPPEN";
    var sentence21 = "   MY FRIENDS AND   ";
    var sentence22 = "      MY FAMILY     ";
    var sentence23 = "  SPEEDRUNNERS AND  ";
    var sentence24 = "  RANDO COMMUNITY   ";
    var sentence25 = " NOW FOR SOME FACTS ";
    var sentence26 = "   THATS ALL FOR    ";
    var sentence27 = "  THIS SEEDS FACTS  ";
    var sentence28 = "      TIME FOR      ";
    var sentence29 = "    ICEPLUG SINGS   ";
    var intLim = document.getElementById("beastMode").checked ? (randomSentences.quotes.length - 1) : randomSentences.quotes.length;
    var quoteIndex = prng.nextInt(intLim);
    var quote01 = randomSentences.quotes[quoteIndex].line1;
    var quote02 = randomSentences.quotes[quoteIndex].line2;
    function randomizeFacts() {
        var allFacts = randomSentences.facts.slice(0);
        for (var i = 0; i < 3; i++) {
            var n = prng.nextInt(allFacts.length - i);
            var a = allFacts.splice(n, 1);
            allFacts.push(a[0]);
        }
        return allFacts.slice(-3);
    }
    var randomFacts = randomizeFacts();
    var fact01 = randomFacts[0].line1;
    var fact02 = randomFacts[0].line2;
    var fact03 = randomFacts[0].line3;
    var fact04 = randomFacts[1].line1;
    var fact05 = randomFacts[1].line2;
    var fact06 = randomFacts[1].line3;
    var fact07 = randomFacts[2].line1;
    var fact08 = randomFacts[2].line2;
    var fact09 = randomFacts[2].line3;
    var songIndex = prng.nextInt(randomSentences.songs.length);
    var song01 = randomSentences.songs[songIndex].line1;
    var song02 = randomSentences.songs[songIndex].line2;
    var song03 = randomSentences.songs[songIndex].line3;
    var song04 = randomSentences.songs[songIndex].line4;
    var song05 = randomSentences.songs[songIndex].line5;
    var song06 = randomSentences.songs[songIndex].line6;
    var song07 = randomSentences.songs[songIndex].line7;
    var song08 = randomSentences.songs[songIndex].line8;
    writeSentence(quote01, 0x696CF);
    writeSentence(quote02, 0x696E3);
    writeSentence(sentence01, 0x6974D);
    writeSentence(sentence02, 0x69763);
    writeSentence(sentence03, 0x69778);
    writeSentence(sentence04, 0x6978D);
    writeSentence(sentence05, 0x697A2);
    writeSentence(sentence04, 0x697B7);
    writeSentence(sentence06, 0x697CC);
    writeSentence(sentence04, 0x697E1);
    writeSentence(sentence07, 0x697F6);
    writeSentence(sentence09, 0x69820);
    writeSentence(sentence08, 0x69835);
    writeSentence(sentence10, 0x6984A);
    writeSentence(sentence11, 0x698AF);
    writeSentence(sentence12, 0x698C4);
    writeSentence(sentence13, 0x698D9);
    writeSentence(sentence14, 0x698EE);
    writeSentence(sentence15, 0x69903);
    writeSentence(sentence16, 0x69918);
    writeSentence(sentence17, 0x6997D);
    writeSentence(sentence18, 0x69992);
    writeSentence(sentence19, 0x699F7);
    writeSentence(sentence20, 0x69A0C);
    writeSentence(sentence21, 0x69A21);
    writeSentence(sentence22, 0x69A36);
    writeSentence(sentence23, 0x69A4B);
    writeSentence(sentence24, 0x69A60);
    writeSentence(sentence25, 0x69AC6);
    writeSentence(fact01, 0x69ADC);
    writeSentence(fact02, 0x69AF0);
    writeSentence(fact03, 0x69B04);
    writeSentence(fact04, 0x69B19);
    writeSentence(fact05, 0x69B2D);
    writeSentence(fact06, 0x69B41);
    writeSentence(fact07, 0x69B56);
    writeSentence(fact08, 0x69B6A);
    writeSentence(fact09, 0x69B7E);
    writeSentence(sentence26, 0x69B93);
    writeSentence(sentence27, 0x69BA8);
    writeSentence(sentence28, 0x69C0E);
    writeSentence(sentence29, 0x69C22);
    writeSentence(song01, 0x69C37);
    writeSentence(song02, 0x69C4C);
    writeSentence(song03, 0x69C61);
    writeSentence(song04, 0x69C76);
    writeSentence(song05, 0x69C8B);
    writeSentence(song06, 0x69CA0);
    writeSentence(song07, 0x69CB5);
    writeSentence(song08, 0x69CCA);
}
