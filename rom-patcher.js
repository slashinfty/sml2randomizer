//adapted from https://github.com/marcrobledo/RomPatcher.js/
//originally licensed under the MIT license by Marc Robledo
//license available https://github.com/marcrobledo/RomPatcher.js/blob/master/LICENSE
var RECORD_RLE = 0x0000;
var RECORD_SIMPLE = 1;

function patchRom (romBuffer, patchBuffer) {
    let records = [];
    let initialRom = new DataView(romBuffer);
    let patch = new DataView(patchBuffer);
    records = setRecords(patch);
    
    //determine if new buffer needs to be larger
    let newFileSize = initialRom.byteLength;
    records.forEach(record => {
        if (record.type === RECORD_RLE) {
            if (record.offset + record.length > newFileSize) newFileSize = record.offset + record.length;
        } else {
            if (record.offset + record.data.length > newFileSize) newFileSize = record.offset + record.data.length;
        }
    });
    
    //make new buffer and copy old buffer into it
    let newRom = new ArrayBuffer(newFileSize);
    let adjustedRom = new DataView(newRom);
    for (let i = 0; i < initialRom.byteLength; i++) adjustedRom.setUint8(i, initialRom.getUint8(i));
    
    //set info from patch into new buffer
    records.forEach(record => {
        if (record.type === RECORD_RLE) {
            for (let i = 0; i < record.length; i++) adjustedRom.setUint8(record.offset + i, record.byte);
        } else {
            for (let j = 0; j < record.data.length; j++) adjustedRom.setUint8(record.offset + j, record.data[j]);
        }
    });
    
    //return new buffer
    return newRom;
}

//get info from patch
var setRecords = patch => {
    let EoF = false, seek = 5, rec = [];
    
    let addSimpleRecord = (o, d) => ({offset:o, type:RECORD_SIMPLE, data:d});
    let addRLERecord = (o, l, b) => ({offset:o, type:RECORD_RLE, length:l, byte:b});
    let readBytes = (p, a, b) => { let c = new Array(b); for (let d = 0; d < b; d++) c[d] = p.getUint8(a + d); return c; }
    
    while (seek < patch.byteLength) {
        let address = (patch.getUint8(seek + 0) << 16) + (patch.getUint8(seek + 1) << 8) + (patch.getUint8(seek + 2));
        seek += 3;
        
        if (!EoF && address === 0x454F46) EoF = true;
        else {
            let length = patch.getUint16(seek);
            seek += 2;
            
            if (length == RECORD_RLE) {
                rec.push(addRLERecord(address, patch.getUint16(seek), patch.getUint8(seek + 2)));
                seek += 3;
            } else {
                rec.push(addSimpleRecord(address, readBytes(patch, seek, length)));
                seek += length;
            }
        }
    }
    return rec;
}