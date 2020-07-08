var save1_0patch = 'patches/savestates_v10.ips';
var save1_2patch = 'patches/savestates_v12.ips';
var prac1_0patch = 'patches/practice_v10.ips';
var prac1_2patch = 'patches/practice_v12.ips';

$('#practiceRom').click(function() {
    let file = document.getElementById('romUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = () => practiceGenerator(reader.result);
    reader.readAsArrayBuffer(file);
});

async function practiceGenerator(romBuffer) {
    let rom = new Uint8Array(romBuffer);
    let savePatch = rom[0x14C] == 0x00 ? save1_0patch : save1_2patch;
    let pracPatch = rom[0x14C] == 0x00 ? prac1_0patch : prac1_2patch;
    let saveIPS = await fetch(savePatch);
    let saveBuffer = await saveIPS.arrayBuffer();
    romBuffer = patchRom(romBuffer, saveBuffer);
    let pracIPS = await fetch(pracPatch);
    let pracBuffer = await pracIPS.arrayBuffer();
    romBuffer = patchRom(romBuffer, pracBuffer);
    rom = new Uint8Array(romBuffer);
    checksum(rom);
    let fileName = 'sml2-practice.gb';
    saveAs(new Blob([romBuffer], {type: "octet/stream"}), fileName);
}
