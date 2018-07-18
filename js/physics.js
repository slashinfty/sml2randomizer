function randomizeGravity(rom) {
    var version = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    for (var i = (0x1F91 + version); i <= (0x1FB0 + version); i++) {
        switch (rom[i]) {
            case 0x00:
                if (beastMode) {
                    //no changing gravity for levels 07 and 15
                    if (i != (0x1F98 + version) && i != (0x1FA6 + version)) {
                        if (prng.nextFloat() < 0.05) {
                            rom[i] = 0x01;
                        //.12 and no moon gravity for level 08
                    } else if (prng.nextFloat() < 0.126 && i != (0x1F99 + version)) {
                            rom[i] = 0x08;
                        }
                    }
                } else if (i != (0x1F98 + version) && i != (0x1FA6 + version)) {
                    if (prng.nextFloat() < 0.05) {
                        rom[i] = 0x01;
                        //.07
                    } else if (prng.nextFloat() < 0.074 && i != (0x1F99 + version)) {
                        rom[i] = 0x08;
                    }
                }
                break;
            case 0x01:
                if (beastMode) {
                    if (prng.nextFloat() < 0.15) {
                        rom[i] = 0x00;
                    //.45
                    } else if (prng.nextFloat() < 0.529) {
                        rom[i] = 0x08;
                    }
                } else if (prng.nextFloat() < 0.05) {
                    rom[i] = 0x00;
                //.15
                } else if (prng.nextFloat() < 0.158) {
                    rom[i] = 0x08;
                }
                break;
            case 0x08:
                if (beastMode) {
                    if (prng.nextFloat() < 0.45) {
                        rom[i] = 0x00;
                    //.05
                    } else if (prng.nextFloat() < 0.091) {
                        rom[i] = 0x01;
                    }
                } else if (prng.nextFloat() < 0.09) {
                    rom[i] = 0x00;
                //.03
                } else if (prng.nextFloat() < 0.033) {
                    rom[i] = 0x01;
                }
                break;
             default:
                break;
        }
    }
}

function randomizePhysics(rom) {
    if (rom[0x148] != 0x05) {
        patch(patchPhysicsScrolling, rom);
    }
    //0x33000-0x3301F | Mario=$00, Luigi=$04
    //0x33020-0x3303F | Ice=$00, Luigi=$03, Mario=$04, Rock=$07
    var jumpTable = rom[0x148] == 0x05 ? 0x93D00 : 0x33000;
    var moveTable = rom[0x148] == 0x05 ? 0x93D20 : 0x33020;
    if (doBothPhysics) {
        for (var i = 0; i < 0x20; i++) {
            if (prng.nextFloat() < 0.15) {
                rom[jumpTable + i] = 0x04;
                rom[moveTable + i] = 0x03;
            }
        }
        //mario only for DX
        if (rom[0x148] == 0x05) {
            for (var i = 0; i < 0x20; i++) {
                if(rom[jumpTable + i] == 0xFF && prng.nextFloat() < 0.15) {
                    rom[jumpTable + i] = 0x00;
                    rom[moveTable + i] = 0x04;
                }
            }
        }
    } else if (doLuigiPhysics && rom[0x148] != 0x05) {
        for (var i = 0; i < 0x20; i++) {
            rom[jumpTable + i] = 0x04;
            rom[moveTable + i] = 0x03;
        }
    }
    if (doIcePhysics) {
        for (var i = 0; i < 0x20; i++) {
            if (prng.nextFloat() < 0.1) {
                rom[moveTable + i] = 0x00;
            }
        }
    }
}
