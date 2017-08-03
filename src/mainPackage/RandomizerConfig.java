/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mainPackage;

import java.util.Random;

/**
 *
 * @author Matt
 */
public class RandomizerConfig {
    
    public final boolean levelsSetting;
    public final boolean exitsSetting;
    public final boolean enemiesSetting;
    public final boolean powerUpsSetting;
    public final boolean platformsSetting;
    public final boolean extraSetting;
    public final boolean hardModeSetting;
    public final long randomSeed;
    
    public RandomizerConfig(boolean levelCheck, boolean exitCheck, boolean enemyCheck, boolean powerUpCheck, boolean platformCheck, boolean extraCheck, boolean hardModeCheck) {
       randomSeed = createSeed(levelCheck, exitCheck, enemyCheck, powerUpCheck, platformCheck, extraCheck, hardModeCheck);
       levelsSetting = levelCheck;
       exitsSetting = exitCheck;
       enemiesSetting = enemyCheck;
       powerUpsSetting = powerUpCheck;
       platformsSetting = platformCheck;
       extraSetting = extraCheck;
       hardModeSetting = hardModeCheck;
    }
    
    public RandomizerConfig(long userSeed) {
        randomSeed = userSeed;
        extraSetting = (userSeed & 0x1000000) != 0;
        platformsSetting = (userSeed & 0x2000000) != 0;
        powerUpsSetting = (userSeed & 0x4000000) != 0;
        enemiesSetting = (userSeed & 0x8000000) != 0;
        exitsSetting = (userSeed & 0x10000000) != 0;
        levelsSetting = (userSeed & 0x20000000) != 0;
        hardModeSetting = (userSeed & 0x40000000) != 0;
    }
    
    private static long createSeed(boolean levels, boolean exits, boolean enemies, boolean powerUps, boolean platforms, boolean extra, boolean hardMode) {
        Random seedGen = new Random();
        long newSeed = seedGen.nextLong();
        newSeed &= 0xFFFFFF;
        if ( extra ) {
            newSeed |= 0x1000000;
        }
        if ( platforms ) {
            newSeed |= 0x2000000;
        }
        if ( powerUps ) {
            newSeed |= 0x4000000;
        }
        if ( enemies ) {
            newSeed |= 0x8000000;
        }
        if ( exits ) {
            newSeed |= 0x10000000;
        }
        if ( levels ) {
            newSeed |= 0x20000000;
        }
        if ( hardMode ) {
            newSeed |= 0x40000000;
        }
        return newSeed;
    }
}
