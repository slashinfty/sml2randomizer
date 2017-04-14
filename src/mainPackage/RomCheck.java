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
import java.util.Arrays;

/**
 *
 * @author Matt
 */
public class RomCheck {
    
    /**
     * Lazy check for original ROM
     */
    
    public final boolean originalRom;
    
    public RomCheck(String rom) throws IOException {
        originalRom = check(rom);
    }
    
    private boolean check(String inputFilename) throws IOException {
        Path romPath;
        romPath = Paths.get(inputFilename);
        byte[] randomizerROM = Files.readAllBytes(romPath);
        byte[] romCheckBytes = new byte[10];
        byte[] confirmedBytes = {0x4D, 0x41, 0x52, 0x49, 0x4F, 0x4C, 0x41, 0x4E, 0x44, 0x32};
        for ( int i = 0; i < 10; i++ ) {
            romCheckBytes[i] = randomizerROM[0x134 + i];
        }
        return Arrays.equals(confirmedBytes, romCheckBytes);
    } 
    
}
