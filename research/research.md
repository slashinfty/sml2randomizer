The following is all of the information I collected in the process of creating of the randomizer. I have preserved as much as possible so others may use it to further hack Super Mario Land 2.

**This is currently incomplete since the v2.0 release. It is a work in progress.**

## Randomizing Levels

Looking at Raccoon Sam's [overworld data](http://raccoonsam.byethost8.com/Overworld.txt), dotsarecool pointed out that level bytes listed there were likely pointers for the overworld, and swapping them may be enough. This turned out to be correct.

| Level Name            | Level Byte  | Level Pointer Offset	|
| :---       	        	| :---:  	    | :---:			            |
| Mushroom House       	| 00	       	| 0x3C218		            |
| Tree Zone 1	        	| 01	      	| 0x3C23B		            |
| Tree Zone 2	        	| 02	      	| 0x3C23A		            |
| Tree Zone 3	  	      | 03	      	| 0x3C239		            |
| Tree Zone 4	  	      | 04	      	| 0x3C23C		            |
| Tree Zone 5 		      | 05	       	| 0x3C238		            |
| Pumpkin Zone 1	      | 06	      	| 0x3C240		            |
| Pumpkin Zone 2	      | 07	      	| 0x3C241		            |
| Pumpkin Zone 3	      | 08       		| 0x3C242		            |
| Pumpkin Zone 4	      | 09	      	| 0x3C243		            |
| Mario Zone 1		      | 0A	       	| 0x3C268		            |
| Mario Zone 2	       	| 0B	       	| 0x3C269		            |
| Mario Zone 3	       	| 0C	      	| 0x3C26A		            |
| Mario Zone 4      		| 0D	       	| 0x3C26B		            |
| Turtle Zone 1     		| 0E	       	| 0x3C25E		            |
| Turtle Zone 2	      	| 0F	       	| 0x3C260		            |
| Turtle Zone 3	      	| 10	      	| 0x3C261		            |
| Hippo		             	| 11	      	| 0x3C21D		            |
| Space Zone 1		      | 12	       	| 0x3C254		            |
| Space Zone 2		      | 13	       	| 0x3C255		            |
| Macro Zone 1		      | 14	       	| 0x3C24A		            |
| Macro Zone 2		      | 15	       	| 0x3C24B		            |
| Macro Zone 3       		| 16	      	| 0x3C24C		            |
| Macro Zone 4	      	| 17	       	| 0x3C24D		            |
| Wario's Castle      	| 18	      	| None			            |
| Miscellaneous (Scroll)| 19		      | 0x3C21C		            |
| Turtle Zone Special	  | 1A		      | 0x3C27E		            |
| Pumpkin Zone Special 1| 1B		      | 0x3C290		            |
| Space Zone Special  	| 1C		      | 0x3C25C		            |
| Tree Zone Special	    | 1D		      | 0x3C23E		            |
| Macro Zone Special  	| 1E		      | 0x3C282		            |
| Pumpkin Zone Special 2| 1F		      | 0x3C292		            |

Changing the levels with bosses, with no other changes, will end up yielding two Golden Coins (one for the level beaten, and one for the zone beaten). Toruzz was able to locate the offsets for which zone gets cleared, and we determined it should be based on the level, and not the boss (important because we randomized bosses).

| Level Name     | Level Offset  |
| :---           | :---:         |
| Tree Zone 5    | 0x304F6       |
| Pumpkin Zone 4 | 0x304FA       |
| Mario Zone 4   | 0x304FE       |
| Turtle Zone 3  | 0x30501       |
| Space Zone 2   | 0x30504       |
| Macro Zone 4   | 0x30508       |

| Zone Name     | Zone Clear Byte |
| :---          | :---:           |
| Tree Zone     | 0x05            |
| Pumpkin Zone  | 0x09            |
| Mario Zone    | 0x1D            |
| Turtle Zone   | 0x17            |
| Space Zone    | 0x11            |
| Macro Zone    | 0x0E            |

## Swapping Level Exits

In [MarCas](http://www.romhacking.net/utilities/518/), I noticed the normal exit tile was 4A and the secret exit tile was 4B. I attempted to swap them in MarCas then compare the hex values, and noticed only two offsets were different (and exactly those bytes were swapped). Testing the ROM yielding the desired result.

| Level Name 		  | Normal Exit (4A) Offset	| Secret Exit (4B) Offset	|
| :---       		  | :---:  			            | :---:				            |
| Tree Zone 2		  | 0x2A385			            | 0x29947			            |
| Hippo			      | 0x4C8EB			            | 0x4CA7F			            |
| Space Zone 1		| 0x4DA53			            | 0x4D27B			            |
| Macro Zone 1		| 0x54ACE			            | 0x5475A			            |
| Pumpkin Zone 2	| 0x49215			            | 0x4949E			            |
| Pumpkin Zone 3	| 0x49F61			            | 0x499A7			            |
| Turtle Zone 2		| 0x51D99			            | 0x51D29			            |

## Randomizing Sprites

Raccoon Sam saved a forum post from 2005 that described how sprites worked, and dotsarecool was able to break it down even more so for me. Essentially, each sprite is composed of three consecutive bytes, and, if converted to binary, you end up with a 24-bit number, call it `ABCDEFGH IJKLMNOP QRSTUVWX`. This can be deconstructed into separate parts to describe the sprite.

* Extracting `EFGH` and converting it to hex will yield the horizontal screen number the sprite is on.
* Extracting `LMNOP` and converting it to hex will yield the x-position of the sprite on the screen, in 8-pixel increments.
* Extracting `TUVWX` and converting it to hex will yield the y-position of the sprite on the screen, in 8-pixel increments.
* Extracting both `ABCD` and `IJK`, concatenating and rearranging them into `DABCIJK` then converting it to hex will yield the sprite ID number.
* The purpose and meaning of `QRS` is ~~left as an exercise for the reader~~ to signify if the sprite appears in Easy Mode or not.

I broke the sprites into four categories: enemies, obstacles, platforms, and power-ups. For names, I got as many as I could from the [Mario Wiki](http://www.mariowiki.com/Category:Super_Mario_Land_2:_6_Golden_Coins_Enemies).

| Enemy 		                | Sample Byte	| Binary Conversion		     | DABCIJK Extraction	| Sprite Number	|
| :---                      | :---:  	    | :---:				             | :---:			        | :---:		      |
| Ant                       | 70 BC 32    | 011100001011110000110010 | 1011101            | 5D            |
| Aqua Kuribo               | 81 01 BA    | 100000010000000110111010 | 0100000            | 20            |
| Battle Beetle             | C1 6A 58    | 110000010110101001011000 | 0110011            | 33            |
| Be                        | C1 9E 3A    | 110000011001111000111010 | 0110100            | 34            |
| Bear                      | 17 86 3C    | 000101111000011000111100 | 1000100            | 44            |
| Bibi                      | C1 B4 18    | 110000011011010000011000 | 0110101            | 35            |
| Blurp (Horizontal)        | 05 A6 AA    | 000001011010011010101010 | 0000101            | 05            |
| Blurp (Horizontal)        | 73 CD DC    | 011100111100110111011100 | 1011110            | 5E            |
| Blurp (Vertical)          | 76 F5 DE    | 011101101111010111011110 | 1011111            | 5F            |
| Bomubomu                  | 31 A9 3C    | 001100011010100100111100 | 1001101            | 4D            |
| Boo                       | 36 A1 1C    | 001101101010000100011100 | 1001101            | 4D            |
| Bopping Toady             | 63 E1 BE    | 011000111110000110111110 | 0011111            | 1F            |
| Buichi                    | 13 12 12    | 000100110001001000010010 | 1000000            | 40            |
| Bullet Bill               | 52 64 BA    | 010100100110010010111010 | 1010011            | 53            |
| Cheep Cheep (Horizontal)  | E1 A2 D0    | 111000011010001011010000 | 0111101            | 3D            |
| Cheep Cheep (Vertical)    | 02 FA DC    | 000000101111101011011100 | 0000111            | 07            |
| Chikunto                  | 83 E1 50    | 100000111110000101010000 | 0100111            | 27            |
| Dokanto                   | 86 B9 5C    | 100001101011100101011100 | 0100101            | 25            |
| Dondon                    | E6 3E 4E    | 111001100011111001001110 | 0111001            | 39            |
| F Boy                     | 53 A4 AB    | 010100111010010010101011 | 1010101            | 55            |
| Fire Pakkun Zo (Large)    | BC 0F 5A    | 101111000000111101011010 | 1101000            | 68            |
| Fire Pakkun Zo (Left)     | BB 28 DC    | 101110110010100011011100 | 1101001            | 69            |
| Fire Pakkun Zo (Right)    | BF 44 50    | 101111110100010001010000 | 1101010            | 6A            |
| Fire Piranha Plant        | 28 A6 BE    | 001010001010011010111110 | 0001101            | 0D            |
| Floating Face             | 97 93 3A    | 100101111001001100111010 | 1100100            | 64            |
| Genkottsu (1.5 Tiles)     | 94 76 5F    | 100101000111011001011111 | 1100011            | 63            |
| Genkottsu (2 Tiles)       | 95 46 5F    | 100101010100011001011111 | 1100010            | 62            |
| Goomba                    | 21 3B 3E    | 001000010011101100111110 | 0001001            | 09            |
| Goronto                   | 81 77 9A    | 100000010111011110011010 | 0100011            | 23            |
| Grubby                    | 16 4D AC    | 000101100100110110101100 | 1000010            | 42            |
| Honebon                   | 51 AD CC    | 010100011010110111001100 | 1010101            | 55            |
| Jack-in-the-Box           | 51 2F B7    | 010100010010111110110111 | 1010001            | 51            |
| Karakara                  | 51 C7 BE    | 010100011100011110111110 | 1010110            | 56            |
| Karamenbo                 | 95 CE 34    | 100101011100111000110100 | 1100110            | 66            |
| Kiddokatto                | 31 15 3E    | 001100010001010100111110 | 1001000            | 48            |
| Koopa Troopa              | 02 29 38    | 000000100010100100111000 | 0000001            | 01            |
| Kurokyura                 | 5B 2B 1E    | 010110110010101100011110 | 1010001            | 51            |
| Kyororo                   | 54 9D BE    | 010101001001110110111110 | 1010100            | 54            |
| Kyotonbo                  | 85 55 B6    | 100001010101010110110110 | 0100010            | 22            |
| Masked Ghoul              | 51 73 1E    | 010100010111001100011110 | 1010011            | 53            |
| Mogyo                     | 72 09 1E    | 011100100000100100011110 | 1011000            | 58            |
| Neiji                     | 19 03 60    | 000110010000001101100000 | 1000000            | 40            |
| No 48                     | 75 01 35    | 011101010000000100110101 | 1011000            | 58            |
| Noko Bombette             | 15 81 9E    | 000101011000000110011110 | 1000100            | 44            |
| Paragoomba (Diagonal)     | 26 13 B6    | 001001100001001110110110 | 0001000            | 08            |
| Paragoomba (Vertical)     | E2 42 DA    | 111000100100001011011010 | 0111010            | 3A            |
| Pikku                     | 71 93 BE    | 011100011001001110111110 | 1011100            | 5C            |
| Piranha Plant             | 28 86 BE    | 001010001000011010111110 | 0001100            | 0C            |
| Piranha Plant (Downward)  | 01 F2 15    | 000000011111001000010101 | 0000111            | 07            |
| Piranha Plant (Downward)  | 14 44 B9    | 000101000100010010111001 | 1000010            | 42            |
| Poro                      | 73 59 A5    | 011100110101100110100101 | 1011010            | 5A            |
| Ragumo                    | 82 05 3E    | 100000100000010100111110 | 0100000            | 20            |
| Rerere                    | 78 4A BE    | 011110000100101010111110 | 1011010            | 5A            |
| Shark                     | 03 DB DA    | 000000111101101111011010 | 0000110            | 06            |
| Skeleton Bee              | E2 D0 98    | 111000101101000010011000 | 0111110            | 3E            |
| Spikey                    | 85 23 B8    | 100001010010001110111000 | 0100001            | 21            |
| Spiny Cheep Cheep         | 22 6B 5A    | 001000100110101101011010 | 0001011            | 0B            |
| Tamara                    | 19 77 1B    | 000110010111011100011011 | 1000011            | 43            |
| Star (Horizontal)         | 72 FB 9E    | 011100101111101110011110 | 1011111            | 5F            |
| Star (Vertical)           | 72 C5 96    | 011100101100010110010110 | 1011110            | 5E            |
| Tatenoko                  | 34 7A CF    | 001101000111101011001111 | 1001011            | 4B            |
| Terekuribo                | 51 F5 BA    | 010100011111010110111010 | 1010111            | 57            |
| Toriuo                    | 72 6B A8    | 011100100110101110101000 | 1011011            | 5B            |
| Tosenbo                   | 77 9B 98    | 011101111001101110011000 | 1011100            | 5C            |
| Unera                     | 11 2B BA    | 000100010010101110111010 | 1000001            | 41            |
| Unibo                     | 51 DC 5B    | 010100011101110001011011 | 1010110            | 56            |
| Unibo                     | 52 F9 9A    | 010100101111100110011010 | 1010111            | 57            |

| Obstacle	                  | Sample Byte	| Binary Conversion		     | DABCIJK Extraction	| Sprite Number	|
| :---                        | :---:  	    | :---:				             | :---:			        | :---:		      |
| Pencil                      | 84 27 DA    | 100001000010011111011010 | 0100001            | 21            |
| Claw Grabber                | 39 37 3C    | 001110010011011100111100 | 1001001            | 49            |
| Diagonal Ball on Chain      | 12 E9 3E    | 000100101110100100111110 | 1000111            | 47            |
| Falling Spike               | 35 DB 34    | 001101011101101100110100 | 1001110            | 4E            |
| Falling Spike on Chain      | 31 E9 AE    | 001100011110100110101110 | 1001111            | 4F            |
| Spinning Spike              | 11 69 B9    | 000100010110100110111001 | 1000011            | 43            |
| Spinning Spike (Horizontal) | 18 2C 5E    | 000110000010110001011110 | 1000001            | 41            |
| Spinning Spike (Vertical)   | 51 13 16    | 010100010001001100010110 | 1010000            | 50            |
| Spike Ball (Large)          | BA CB 5C    | 101110101100101101011100 | 1101110            | 6E            |
| Spike Ball (Small)          | BA FD 5E    | 101110101111110101011110 | 1101111            | 6F            |
| Moving Saw (Ceiling)        | 3A 51 1A    | 001110100101000100011010 | 1001010            | 4A            |
| Moving Saw (Floor)          | 3A 93 96    | 001110101001001110010110 | 1001100            | 4C            |

| Platform 	                          | Sample Byte	| Binary Conversion		     | DABCIJK Extraction	| Sprite Number	|
| :---                                | :---:  	    | :---:				             | :---:			        | :---:		      |
| Moving Platform (Small, Vertical)   | A4 0E 42    | 101001000000111001000010 | 0101000            | 28            |
| Moving Platform (Large, Vertical)   | A0 33 2A    | 101000000011001100101010 | 0101001            | 29            |
| Moving Platform (Small, Horizontal) | A4 48 13    | 101001000100100000010011 | 0101010            | 2A            |
| Moving Platform (Large, Horizontal) | A2 74 5F    | 101000100111010001011111 | 0101011            | 2B            |
| Moving Platform (Large, Diagonal)   | A5 8C 57    | 101001011000110001010111 | 0101100            | 2C            |
| Moving Platform (Large, Diagonal)   | A1 AB 36    | 101000011010101100110110 | 0101101            | 2D            |
| Falling Platform                    | A6 D6 16    | 101001101101011000010110 | 0101110            | 2E            |
| Rising Platform                     | AA E4 56    | 101010101110010001010110 | 0101111            | 2F            |
| Rotating Platform (Small)           | C1 0F 53    | 110000010000111101010011 | 0110000            | 30            |
| Owl Platform (Horizontal)           | E4 AB 53    | 111001001010101101010011 | 0111101            | 3D            |
| Owl Platform (Vertical)             | C3 F7 5C    | 110000111111011101011100 | 0110111            | 37            |
| Cloud Platform (Horizontal)         | E5 12 54    | 111001010001001001010100 | 0111000            | 38            |
| Spinning Platform (Horizontal)      | E1 C7 49    | 111000011100011101001001 | 0111110            | 3E            |
| Spinning Platform (Vertical)        | E3 E1 52    | 111000111110000101010010 | 0111111            | 3F            |
| Falling Bone Platform               | 91 0E 3B    | 100100010000111000111011 | 1100000            | 60            |
| Rising Bone Platform                | 91 3E 3C    | 100100010011111000111100 | 1100001            | 61            |
| Skull Platform                      | 91 F9 5E    | 100100011111100101011110 | 1100111            | 67            |
| Propeller Platform                  | B7 64 5E    | 101101110110010001011110 | 1101011            | 6B            |

| Power-Up	            | Sample Byte	| Binary Conversion		     | DABCIJK Extraction	| Sprite Number	|
| :---                  | :---:  	    | :---:				             | :---:			        | :---:		      |
| Heart                 | 2C EF 3E    | 001011001110111100111110 | 0001111            | 0F            |
| Mushroom              | 67 63 3E    | 011001110110001100111110 | 0011011            | 1B            |
| Flower                | 68 8D 2E    | 011010001000110100101110 | 0011100            | 1C            |
| Carrot                | 68 A7 36    | 011010001010011100110110 | 0011101            | 1D            |
| Star                  | 68 D9 38    | 011010001101100100111000 | 0011110            | 1E            |
| Money Bag             | 6B FD 1E    | 011010111111110100011110 | 0011111            | 1F            |
| Mushroom Block        | 42 35 37    | 010000100011010100110111 | 0010001            | 11            |
| Flower Block          | 4B 59 37    | 010010110101100100110111 | 0010010            | 12            |
| Carrot Block          | 48 71 55    | 010010000111000101010101 | 0010011            | 13            |
| Star Block            | 49 91 37    | 010010011001000100110111 | 0010100            | 14            |
| Heart Block           | 49 AF 37    | 010010011010111100110111 | 0010101            | 15            |
| Money Bag Block       | 67 33 33    | 011001110011001100110011 | 0011001            | 19            |
| Runaway Heart Block   | C2 A5 37    | 110000101010010100110111 | 0110101            | 35            |
| Bubble                | 61 06 18    | 011000010000011000011000 | 0011000            | 18            |

Notice that some sprite numbers are repeated, sometimes across tables (such as an enemy and a power-up having the same sprite number). Additionally, some sprites have more than one sprite number.

Each level has a sprite table containing all the sprites. Sprite tables end when the first byte is 0xFF, which allowed me to identify the beginning and end of sprite tables for each level.

| Level Name            | Sprite Table Starting Offset	| Sprite Table Ending Offset	|
| :---			            | :---:				                  | :---:				                |
| Mushroom House	      | 0xE077			                  | 0xE0BC			                |
| Tree Zone 1		        | 0xE0BD			                  | 0xE123			                |
| Tree Zone 2           | 0xE124                        | 0xE181                      |
| Tree Zone 3           | 0xE182                        | 0xE1EE                      |
| Tree Zone 4           | 0xE1EF                        | 0xE249                      |
| Tree Zone 5           | 0xE24A                        | 0xE2A1                      |
| Pumpkin Zone 1        | 0xE2A2                        | 0xE30B                      |
| Pumpkin Zone 2        | 0xE30C                        | 0xE384                      |
| Pumpkin Zone 3        | 0xE385                        | 0xE3D3                      |
| Pumpkin Zone 4        | 0xE3D4                        | 0xE431                      |
| Mario Zone 1          | 0xE432                        | 0xE49B                      |
| Mario Zone 2          | 0xE49C                        | 0xE4F9                      |
| Mario Zone 3          | 0xE4FA                        | 0xE560                      |
| Mario Zone 4          | 0xE561                        | 0xE5C1                      |
| Turtle Zone 1     		| 0xE5C2               	       	| 0xE62B               	      |
| Turtle Zone 2	      	| 0xE62C               	       	| 0xE6BF              	      |
| Turtle Zone 3	      	| 0xE6C0               	       	| 0xE705               	      |
| Hippo		             	| 0xE706               	       	| 0xE77B               	      |
| Space Zone 1		      | 0xE77C               	       	| 0xE7C7               	      |
| Space Zone 2		      | 0xE7C8               	       	| 0xE822               	      |
| Macro Zone 1		      | 0xE823               	       	| 0xE88F               	      |
| Macro Zone 2		      | 0xE890               	       	| 0xE8F6               	      |
| Macro Zone 3       		| 0xE8F7               	       	| 0xE954               	      |
| Macro Zone 4	      	| 0xE955               	       	| 0xE99D               	      |
| Wario's Castle      	| 0xE99E               	       	| 0xEA2E               	      |
| Miscellaneous (Scroll)| 0xEA2F               	       	| 0xEA7D               	      |
| Turtle Zone Special	  | 0xEA7E               	       	| 0xEAA2               	      |
| Pumpkin Zone Special 1| 0xEAA3               	       	| 0xEACD               	      |
| Space Zone Special  	| 0xEACE               	       	| 0xEAE0               	      |
| Tree Zone Special	    | 0xEAE1               	       	| 0xEB3E               	      |
| Macro Zone Special  	| 0xEB3F               	       	| 0xEB54               	      |
| Pumpkin Zone Special 2| 0xEB55               	       	| 0xEBB5               	      |

A complete list of all sprites is available as a [.csv](https://github.com/slashinfty/sml2randomizer/blob/master/research/SML2%20Sprite%20Data.csv).

Toruzz was able to find that power-ups in the Wario fight are located at 0xA9A9 and 0xACA7 for the first and second phase, respectively. The bytes for the power-ups are as follows:

| Power-up    | Byte  |
| :---        | :---: |
| Heart       | 0x0F  |
| Mushroom    | 0x1B  |
| Flower      | 0x1C  |
| Carrot      | 0x1D  |
| Money Bag   | 0x1F  |

## Randomizing bosses



## Miscellaneous Randomization

Level header information was found originally in moojelly's [research](https://github.com/smellymoo/moojelly/blob/master/research/research.md) documentation, which included which byte corresponded to music. The offset for level music is:

> 0x5619 + Level Byte * 14

where the level byte can be found in the table for randomizing levels.

Offsets for the parts of the overworld, the menu, and other events are in the following table:

| Location          | Offset  |
| :---              | :---:   |
| File Select       | 0x3004F |
| Overworld         | 0x3EA9B |
| Tree Zone         | 0x3D186 |
| Space Zone        | 0x3D52B |
| Macro Zone        | 0x3D401 |
| Pumpkin Zone      | 0x3D297 |
| Mario Zone        | 0x3D840 |
| Turtle Zone       | 0x3D694 |
| Front of Castle   | 0x3D758 |
| Game Over         | 0x286B  |

Different bytes for music are listed in the following table, and the names are gathered from [this website](http://downloads.khinsider.com/game-soundtracks/album/super-mario-land-2-six-golden-coins).

| Music 		        | Byte	|
| :---       		    | :---: |
| Choose Your Pipe	| 0D	  |
| Overworld Map		  | 06	  |
| Tree Zone		      | 10	  |
| Turtle Zone		    | 12	  |
| Mario Zone		    | 1B	  |
| Macro Zone		    | 05	  |
| Pumpkin Zone		  | 1E	  |
| Space Zone		    | 1C	  |
| Athletic		      | 01	  |
| Treetop		        | 14	  |
| Seashore		      | 17	  |
| Machine		        | 28	  |
| Graveyard		      | 11	  |
| Haunted House		  | 1F	  |
| The Moon		      | 13	  |
| Star Maze		      | 1D	  |
| Front of Castle	  | 0E	  |
| Wario's Castle	  | 0B	  |
| Battle with Wario	| 21	  |
| Game Over		      | 07	  |
| Boss Music		    | 20	  |

Included in the header is how much time a level starts with. The offset for the timer is:

> 0x561E + Level Byte * 14

and the amount of time in a level is determined by the following equation:

> Time = Byte * 64 (in hex)

Raccoon Sam shared with me two tables that were each 32 bytes longs. The first, starting at 0x1F71, dictated whether or not a level would be auto-scrolling or not. The second, starting at 0x1F91, dictated the physics of the level (normal, moon, or space).

Offsets and bytes for scrolling:

> 0x1F71 + Level Byte; 00 = No Scroll; 01 = Auto-Scroll

Offsets and bytes for physics:

> 0x1F91 + Level Byte; 00 = Normal Physics; 01 = Space Physics; 08 = Moon Physics
