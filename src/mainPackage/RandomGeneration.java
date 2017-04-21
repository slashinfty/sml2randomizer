/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mainPackage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import static java.util.Arrays.binarySearch;
import java.util.Random;

/**
 *
 * @author Matt
 */
public class RandomGeneration {
    
    private final Random rngNum = new Random();
    private final RandomizerConfig config;
    public final String seedName;
    
    public RandomGeneration(RandomizerConfig config) {
        this.config = config;
        seedName = String.format("%08X", config.randomSeed);
    }
    
    /** 
     * Used only for testing
        public static void main(String[] args) throws IOException {
        RandomizerConfig config = new RandomizerConfig(true, true, true, true, true, true);
        Scanner userInput = new Scanner(System.in);
        System.out.print("File:");
        String romFilename = userInput.nextLine();
        RandomGeneration x = new RandomGeneration(config);
        x.romGenerator(romFilename);
    }
    */
    
    /**
     * Sets seed, accepts ROM, performs randomization, creates new ROM
     */
    public void romGenerator(String inputFilename) throws IOException {
        rngNum.setSeed(config.randomSeed);
        Path romPath;
        romPath = Paths.get(inputFilename);
        byte[] randomizerROM = Files.readAllBytes(romPath);
        if ( config.levelsSetting ) {
            randomizeLevels(randomizerROM);
        }
        if ( config.exitsSetting ) {
            swapExits(randomizerROM);
        }
        if ( config.enemiesSetting ) {
            randomizeEnemies(randomizerROM);
        }
        if ( config.powerUpsSetting ) {
            randomizePowerUps(randomizerROM);
        }
        if ( config.platformsSetting ) {
            randomizePlatforms(randomizerROM);
        }
        if ( config.extraSetting ) {
            randomizeMusic(randomizerROM);
            extraRandomizing(randomizerROM);
        }
        String filename = "sml2r-" + seedName + ".gb";
        Path outputFile = romPath.resolveSibling(filename);
        Files.write(outputFile, randomizerROM);
    }

    /**
     * Randomize levels
     */
    public void randomizeLevels(byte[] rom) {
        byte[] normalLevelBytes = {0x00, 0x01, 0x03, 0x04, 0x06, 0x0A, 0x0B, 0x0C, 0x0E, 0x15, 0x16, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F};
        int[] normalLevelOffsets = {0x3C218, 0x3C23B, 0x3C239, 0x3C23C, 0x3C240, 0x3C268, 0x3C269, 0x3C26A, 0x3C25E, 0x3C24B, 0x3C24C, 0x3C21C, 0x3C27E, 0x3C290, 0x3C25C, 0x3C23E, 0x3C282, 0x3C292};
        shuffleArray(normalLevelBytes);
        while ( normalLevelBytes[0] == 0x1A ) { //avoids level 1A as first level
                shuffleArray(normalLevelBytes);
        }
        for ( int i = 0; i < normalLevelOffsets.length; i++ ) {
            rom[normalLevelOffsets[i]] = normalLevelBytes[i];
        }
        byte[] secretLevelBytes = {0x02, 0x07, 0x08, 0x0F, 0x11, 0x12, 0x14};
        int[] secretLevelOffsets = {0x3C23A, 0x3C241, 0x3C242, 0x3C260, 0x3C21D, 0x3C254, 0x3C24A};
        shuffleArray(secretLevelBytes);
        for ( int i = 0; i < secretLevelOffsets.length; i++ ) {
            rom[secretLevelOffsets[i]] = secretLevelBytes[i];
        }
        /** boss levels currently do not work as intended
         * byte[] bossLevelBytes = {0x05, 0x09, 0x0D, 0x10, 0x13, 0x17};
         * int[] bossLevelOffsets = {0x3C238, 0x3C243, 0x3C26B, 0x3C261, 0x3C255, 0x3C24D};
         * shuffleArray(bossLevelOffsets);
         * for ( int i = 0; i < bossLevelOffsets.length; i++ ) {
         *     rom[bossLevelOffsets[i]] = bossLevelBytes[i];
         * }
         */
    }
    
    /**
     * Swap normal & secret exits
     */
    public void swapExits(byte[] rom) {
        int[][] dualExitLevels = {{0x2A385, 0x29947}, {0x4C8EB, 0x4CA7F}, {0x4DA53, 0x4D27B}, {0x54ACE, 0x5475A}, {0x49215, 0x4949E}, {0x49F61, 0x499A7}, {0x51D99, 0x51D29}};
        for (int[] dualExitLevel : dualExitLevels) {
            if (rngNum.nextBoolean()) {
                byte tempSwap = rom[dualExitLevel[0]];
                rom[dualExitLevel[0]] = rom[dualExitLevel[1]];
                rom[dualExitLevel[1]] = tempSwap;
            }
        }
    }
    
    /**
     * Randomize music 
     */
    public void randomizeMusic(byte[] rom) {
        byte[] inGameMusic = {0x01, 0x0B, 0x0E, 0x11, 0x13, 0x14, 0x17, 0x1D, 0x1F, 0x28};
        byte[] overworldMusic = {0x05, 0x06, 0x10, 0x12, 0x1B, 0x1C, 0x1E};
        int[] overworldOffsets = {0x3004F, 0x3EA9B, 0x3D186, 0x3D52B, 0x3D401, 0x3D297, 0x3D840, 0x3D694, 0x3D758};
        for ( int i = 0x5619; i <= 0x580D; i += 0x14 ) { //in-game offsets loop
            if ( rngNum.nextFloat() < 0.005 ) {
                rom[i] = 0x1D; //all levels have 1D as music .5% of the time
            } else {
                int r = rngNum.nextInt(inGameMusic.length);
                rom[i] = inGameMusic[r];
            }
        }
        for ( int i = 0; i < overworldOffsets.length; i++ ) {
            int r = rngNum.nextInt(overworldMusic.length);
            rom[overworldOffsets[i]] = overworldMusic[r];
        }
    }
    
    /**
     * Randomize scrolling and physics
     */
    public void extraRandomizing(byte[] rom) {
        int[] scrollingLevels = {0x1F71, 0x1F72, 0x1F73, 0x1F74, 0x1F76, 0x1F79, 0x1F7A, 0x1F7B, 0x1F7C, 0x1F7D, 0x1F7E, 0x1F7F, 0x1F81, 0x1F82, 0x1F83, 0x1F84, 0x1F85, 0x1F88, 0x1F90};
        for ( int i = 0; i < scrollingLevels.length; i++ ) {
            if( rom[scrollingLevels[i]] == 0x00 && rngNum.nextFloat() < 0.05) {
                rom[scrollingLevels[i]] = 0x01; //non-scrolling to scrolling
            }
            else if ( rom[scrollingLevels[i]] == 0x01 && rngNum.nextFloat() < 0.15 ) {
                rom[scrollingLevels[i]] = 0x00; //scrolling to non-scrolling
            }
        }
        for ( int i = 0x1F91; i <= 0x1FB0; i++ ) {
            switch ( rom[i] ) {
                case 0x00:
                    if ( i != 0x1F98 && i !=  0x1FA6 ) { //no changing physics for levels 07 and 15
                        if ( rngNum.nextFloat() < 0.03 ) {
                            rom[i] = 0x01; //normal physics to space physics
                        } else if ( rngNum.nextFloat() < 0.052 ) { //.05
                            rom[i] = 0x08; //normal physics to moon physics
                        } 
                    }
                    break;
                case 0x01:
                    if ( rngNum.nextFloat() < 0.03 ) {
                        rom[i] = 0x00; //space physics to normal physics
                    } else if ( rngNum.nextFloat() < 0.031 ) { //.03
                        rom[i] = 0x08; //space physics to moon physics
                    }
                    break;
                case 0x08:
                    if ( rngNum.nextFloat() < 0.05 ) {
                        rom[i] = 0x00; //moon physics to normal physics
                    } else if ( rngNum.nextFloat() < 0.032 ) { //.03
                        rom[i] = 0x01; //moon physics to space physics
                    }
                    break;
                default:
                    break;
            }
        }
    }
    
    /**
     * Randomize power-ups 
     */
    public void randomizePowerUps(byte[] rom) {
        byte[] freePowerUps = {0x0F, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F};
        byte[] blockPowerUps = {0x11, 0x12, 0x13, 0x14, 0x15, 0x19};
        for ( int i = 0xE077; i < 0xEBB5; i += 3) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            if ( rom[i] == (byte) 0xFF ) {
                i -= 2;
            } else if ( binarySearch(freePowerUps, sprite) >= 0 ) {
                if ( ( i >= 0xE0BD ) && ( i < 0xE123 ) ) { //level 01
                    if ( sprite != 0x1F ) { //0x1F is an enemy in level 01, not a power-up
                        byte[] newSprite = insertSprite(rom[i], rom[i+1], rom[i+2], freePowerUps[rngNum.nextInt(freePowerUps.length - 1)]); //takes 0x1F out of possibilities
                        System.arraycopy(newSprite, 0, rom, i, 3);
                    } 
                } else if ( sprite == 0x1F ) {
                    byte[] newSprite = insertSprite(rom[i], rom[i+1], rom[i+2], freePowerUps[rngNum.nextInt(freePowerUps.length)]);
                    System.arraycopy(newSprite, 0, rom, i, 3);
                } else { //excluding 0x1F from possibilities unless 0x1F is the original
                    byte[] newSprite = insertSprite(rom[i], rom[i+1], rom[i+2], freePowerUps[rngNum.nextInt(freePowerUps.length - 1)]);
                    System.arraycopy(newSprite, 0, rom, i, 3);
                }
            } else if ( binarySearch(blockPowerUps, sprite) >= 0 ) {
                byte[] newSprite = insertSprite(rom[i], rom[i+1], rom[i+2], blockPowerUps[rngNum.nextInt(blockPowerUps.length)]);
                System.arraycopy(newSprite, 0, rom, i, 3);
            }
        }
    }
    
    /**
     * Randomize platforms
     */
    public void randomizePlatforms(byte[] rom) {
        byte[] level04Bytes = {0x28, 0x29, 0x2A, 0x2B, 0x2D, 0x2E};
        spriteRandomizing(rom, level04Bytes, 0xE1EF, 0xE249);
        byte[] level05Bytes = {0x38, 0x3D};
        spriteRandomizing(rom, level05Bytes, 0xE24A, 0xE2A1);
        byte[] level18Bytes = {0x60, 0x61, 0x67};
        spriteRandomizing(rom, level18Bytes, 0xE99E, 0xEA2E);
    }
    
    /**
     * Randomize enemies 
     */
    public void randomizeEnemies(byte[] rom) {
        byte[] piranhaPlants = {0x0C, 0x0D};
        for ( int i = 0xE077; i < 0xEBB5; i += 3) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            if ( ( i < 0xE30C) || ( ( i > 0xE384 ) && ( i < 0xE3D4 ) ) || ( ( i > 0xE431) && ( i < 0xE8F7 ) ) || ( i > 0xE954 ) ) { //skipping levels 07, 09, and 16
                if ( rom[i] == (byte) 0xFF ) {
                    i -= 2;
                } else if ( binarySearch(piranhaPlants, sprite) >= 0 ) {
                    byte[] newSprite = insertSprite(rom[i], rom[i+1], rom[i+2], piranhaPlants[rngNum.nextInt(piranhaPlants.length)]);
                    System.arraycopy(newSprite, 0, rom, i, 3);
                }
            }
        }
        byte[] level00_17Bytes = {0x01, 0x08, 0x09, 0x3A};
        spriteRandomizing(rom, level00_17Bytes, 0xE077, 0xE0BC);
        spriteRandomizing(rom, level00_17Bytes, 0xE955, 0xE99D);
        byte[] level19_1BBytes = {0x08, 0x09, 0x3A};
        spriteRandomizing(rom, level19_1BBytes, 0xEA2F, 0xEA7D);
        spriteRandomizing(rom, level19_1BBytes, 0xEAA3, 0xEACD);
        byte[] level01Bytes = {0x1F, 0x20, 0x21, 0x22};
        spriteRandomizing(rom, level01Bytes, 0xE0BD, 0xE123);
        byte[] level02Bytes = {0x44, 0x58};
        spriteRandomizing(rom, level02Bytes, 0xE124, 0xE181);
        byte[] level03Bytes = {0x35, 0x3E, 0x40, 0x41, 0x42};
        spriteRandomizing(rom, level03Bytes, 0xE182, 0xE1EE);
        byte[] level04Bytes = {0x33, 0x34, 0x5D};
        spriteRandomizing(rom, level04Bytes, 0xE1EF, 0xE249);
        byte[] level05Bytes = {0x08, 0x39, 0x3A};
        spriteRandomizing(rom, level05Bytes, 0xE24A, 0xE2A1);
        for ( int i = 0xE2A2; i < 0xE30B; i += 3 ) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            switch ( sprite ) {
                case 0x4E:
                    byte[] level06a = {0x4D, 0x4E, 0x51, 0x53};
                    byte[] sprite06a = insertSprite(rom[i], rom[i+1], rom[i+2], level06a[rngNum.nextInt(level06a.length)]);
                    System.arraycopy(sprite06a, 0, rom, i, 3);
                    break;
                case 0x4F:
                    byte[] level06b = {0x4D, 0x4F, 0x51, 0x53};
                    byte[] sprite06b = insertSprite(rom[i], rom[i+1], rom[i+2], level06b[rngNum.nextInt(level06b.length)]);
                    System.arraycopy(sprite06b, 0, rom, i, 3);
                    break;
                case 0x4D: case 0x51: case 0x53:
                    byte[] level06c = {0x4D, 0x51, 0x53};
                    byte[] sprite06c = insertSprite(rom[i], rom[i+1], rom[i+2], level06c[rngNum.nextInt(level06c.length)]);
                    System.arraycopy(sprite06c, 0, rom, i, 3);
                    break;
                default:
                    break;
            }
        }
        byte[] level07Bytes = {0x4D, 0x54, 0x55, 0x56, 0x5E, 0x5F};
        spriteRandomizing(rom, level07Bytes, 0xE30C, 0xE384);
        byte[] level08Bytes = {0x4D, 0x57};
        spriteRandomizing(rom, level08Bytes, 0xE385, 0xE3D3);
        byte[] level09Bytes = {0x4D, 0x53, 0x5A, 0x5C};
        spriteRandomizing(rom, level09Bytes, 0xE3D4, 0xE431);
        byte[] level0ABytes = {0x01, 0x40, 0x4B};
        spriteRandomizing(rom, level0ABytes, 0xE432, 0xE49B);
        byte[] level0BBytes = {0x08, 0x09, 0x3A, 0x44, 0x4D};
        spriteRandomizing(rom, level0BBytes, 0xE49C, 0xE4F9);
        for ( int i = 0xE4FA; i < 0xE560; i += 3 ) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            switch ( sprite ) {
                case 0x49:
                    byte[] level0Ca = {0x01, 0x47, 0x48, 0x49, 0x53};
                    byte[] sprite0Ca = insertSprite(rom[i], rom[i+1], rom[i+2], level0Ca[rngNum.nextInt(level0Ca.length)]);
                    System.arraycopy(sprite0Ca, 0, rom, i, 3);
                    break;
                case 0x01: case 0x47: case 0x48:
                    byte[] level0Cb = {0x01, 0x47, 0x48, 0x53};
                    byte[] sprite0Cb = insertSprite(rom[i], rom[i+1], rom[i+2], level0Cb[rngNum.nextInt(level0Cb.length)]);
                    System.arraycopy(sprite0Cb, 0, rom, i, 3);
                    break;
                default:
                    break;
            }
        }
        for ( int i = 0xE561; i < 0xE5C1; i += 3 ) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            switch ( sprite ) {
                case 0x43:
                    byte[] level0Da = {0x09, 0x43, 0x4D, 0x53};
                    byte[] sprite0Da = insertSprite(rom[i], rom[i+1], rom[i+2], level0Da[rngNum.nextInt(level0Da.length)]);
                    System.arraycopy(sprite0Da, 0, rom, i, 3);
                    break;
                case 0x4C:
                    byte[] level0Db = {0x09, 0x4C, 0x4D, 0x53};
                    byte[] sprite0Db = insertSprite(rom[i], rom[i+1], rom[i+2], level0Db[rngNum.nextInt(level0Db.length)]);
                    System.arraycopy(sprite0Db, 0, rom, i, 3);
                    break;
                case 0x09: case 0x4D:
                    byte[] level0Dc = {0x09, 0x4D, 0x53};
                    byte[] sprite0Dc = insertSprite(rom[i], rom[i+1], rom[i+2], level0Dc[rngNum.nextInt(level0Dc.length)]);
                    System.arraycopy(sprite0Dc, 0, rom, i, 3);
                    break;
                default:
                    break;
            }
        }
        byte[] level0EBytes = {0x05, 0x06, 0x07, 0x08, 0x09, 0x0B, 0x3A, 0x3D};
        spriteRandomizing(rom, level0EBytes, 0xE5C2, 0xE62B);
        for ( int i = 0xE62C; i < 0xE6BF; i += 3 ) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            switch ( sprite ) {
                case 0x01:
                    byte[] level0Fa = {0x01, 0x06, 0x53, 0x55, 0x56};
                    byte[] sprite0Fa = insertSprite(rom[i], rom[i+1], rom[i+2], level0Fa[rngNum.nextInt(level0Fa.length)]);
                    System.arraycopy(sprite0Fa, 0, rom, i, 3);
                    break;
                case 0x21:
                    byte[] level0Fb = {0x06, 0x21, 0x53, 0x55, 0x56};
                    byte[] sprite0Fb = insertSprite(rom[i], rom[i+1], rom[i+2], level0Fb[rngNum.nextInt(level0Fb.length)]);
                    System.arraycopy(sprite0Fb, 0, rom, i, 3);
                    break;
                case 0x06: case 0x55: case 0x56:
                    byte[] level0Fc = {0x06, 0x53, 0x55, 0x56};
                    byte[] sprite0Fc = insertSprite(rom[i], rom[i+1], rom[i+2], level0Fc[rngNum.nextInt(level0Fc.length)]);
                    System.arraycopy(sprite0Fc, 0, rom, i, 3);
                    break;
                default:
                    break;
            }
        }
        for ( int i = 0xE6C0; i < 0xE705; i += 3 ) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            switch ( sprite ) {
                case 0x21:
                    byte[] level10a = {0x01, 0x08, 0x20, 0x21, 0x3A, 0x55};
                    byte[] sprite10a = insertSprite(rom[i], rom[i+1], rom[i+2], level10a[rngNum.nextInt(level10a.length)]);
                    System.arraycopy(sprite10a, 0, rom, i, 3);
                    break;
                case 0x01: case 0x08: case 0x20: case 0x3A: case 0x55:
                    byte[] level10b = {0x01, 0x08, 0x20, 0x3A, 0x55};
                    byte[] sprite10b = insertSprite(rom[i], rom[i+1], rom[i+2], level10b[rngNum.nextInt(level10b.length)]);
                    System.arraycopy(sprite10b, 0, rom, i, 3);
                    break;
                default:
                    break;
            }
        }
        byte[] level11Bytes = {0x05, 0x39, 0x57, 0x5B};
        spriteRandomizing(rom, level11Bytes, 0xE706, 0xE77B);
        for (int i = 0xE77C; i < 0xE7C7; i += 3 ) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            switch ( sprite ) {
                case 0x4D:
                    byte[] level12a = {0x4D, 0x58};
                    byte[] sprite12a = insertSprite(rom[i], rom[i+1], rom[i+2], level12a[rngNum.nextInt(level12a.length)]);
                    System.arraycopy(sprite12a, 0, rom, i, 3);
                    break;
                case 0x58: case 0x5A:
                    byte[] level12b = {0x4D, 0x58, 0x5A};
                    byte[] sprite12b = insertSprite(rom[i], rom[i+1], rom[i+2], level12b[rngNum.nextInt(level12b.length)]);
                    System.arraycopy(sprite12b, 0, rom, i, 3);
                    break;
                default:
                    break;
            }
        }
        byte[] level13Bytes = {0x5C, 0x5E, 0x5F};
        spriteRandomizing(rom, level13Bytes, 0xE7C8, 0xE822);
        byte[] level14Bytes = {0x22, 0x23, 0x25, 0x27};
        spriteRandomizing(rom, level14Bytes, 0xE823, 0xE88F);
        byte[] level15Bytes = {0x07, 0x33, 0x34, 0x3D, 0x5D};
        spriteRandomizing(rom, level15Bytes, 0xE890, 0xE8F6);
        byte[] level16Bytes = {0x01, 0x08, 0x09, 0x34, 0x3A, 0x55};
        spriteRandomizing(rom, level16Bytes, 0xE8F7, 0xE954);
        byte[] level18BytesA = {0x68, 0x69};
        byte[] level18BytesB = {0x6E, 0x6F};
        spriteRandomizing(rom ,level18BytesA, 0xE99E, 0xEA2E);
        spriteRandomizing(rom ,level18BytesB, 0xE99E, 0xEA2E);
        byte[] level1FBytes = {0x01, 0x09};
        spriteRandomizing(rom, level1FBytes, 0xEB55, 0xEBB5);
    }
    
    /**
     * Fisher-Yates shuffle algorithm
     */
    private void shuffleArray(byte[] array) {
        for ( int i = array.length -1; i > 0; i-- ) {
            int index = rngNum.nextInt(i+1);
            byte a = array[index];
            array[index] = array[i];
            array[i] = a;
        }
    }
    
    /**
     * Extract sprite number  
     */
    private static byte extractSprite(byte a, byte b, byte c) {
        byte firstPart = (byte) ((0b00010000 & a) << 2);
        byte secondPart = (byte) ((0b11100000 & a) >>> 2);
        byte thirdPart = (byte) ((0b11100000 & b) >>> 5);

        return (byte) (firstPart | secondPart | thirdPart);
    }
    
    /**
     * Return new modified sprite
     */
    private static byte[] insertSprite(byte a, byte b, byte c, byte spriteNumber) {
        byte[] returnVal = new byte[3];
        byte firstPart = (byte) ((spriteNumber & 0b01000000) >>> 2);
        byte secondPart = (byte) ((spriteNumber & 0b00111000) << 2);
        byte thirdPart = (byte) ((spriteNumber & 0b00000111) << 5);

        returnVal[0] = (byte) ((a & 0b00001111) | firstPart | secondPart);
        returnVal[1] = (byte) ((b & 0b00011111) | thirdPart);
        returnVal[2] = c;

        return returnVal;
    }
    
    /**
     * Scans offsets for sprites and replaces with a random one
     */
    private void spriteRandomizing(byte[] rom, byte[] possibleBytes, int startOffset, int endOffset) {
        for ( int i = startOffset; i < endOffset; i += 3) {
            byte sprite = extractSprite(rom[i], rom[i+1], rom[i+2]);
            if ( rom[i] == (byte) 0xFF ) {
                i -= 2;
            } else if ( binarySearch(possibleBytes, sprite) >= 0 ) {
                byte[] newSprite = insertSprite(rom[i], rom[i+1], rom[i+2], possibleBytes[rngNum.nextInt(possibleBytes.length)]);
                System.arraycopy(newSprite, 0, rom, i, 3);
            }
        }
    }
}


