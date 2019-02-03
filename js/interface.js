//toggle showing descriptions of checkboxes
//some checkboxes linked to others
$('input:checkbox').change(function() {
    $('#text-' + this.id).toggleClass('hide');
    switch (this.id) {
        case 'D':
            if ($('#d').is(':checked')) $('#text-d').toggleClass('hide');
            $('#d').prop('checked', false);
            break;
        case 'd':
            if ($('#D').is(':checked')) $('#text-D').toggleClass('hide');
            $('#D').prop('checked', false);
            break;
        case 'x':
            if ($('#X').is(':checked')) $('#text-X').toggleClass('hide');
            $('#X').prop('checked', false);
            break;
        case 'X':
            if ($('#x').is(':checked')) $('#text-x').toggleClass('hide');
            $('#x').prop('checked', false);
            break;
        case 'f':
            if ($('#F').is(':checked')) $('#text-F').toggleClass('hide');
            $('#F').prop('checked', false);
            break;
        case 'F':
            if ($('#f').is(':checked')) $('#text-f').toggleClass('hide');
            $('#f').prop('checked', false);
            break;
    }
});

////read seed and flags from the URL in the format /?s=SEED&f=FLAGS
$(document).ready(function() {
    let url = new URL(window.location.href);
    if (url.searchParams.has('s') && url.searchParams.has('f')) {
        let seed = url.searchParams.get('s');
        let getFlags = url.searchParams.get('f');
        if (seed.length === 8 && ("00000000" + parseInt(seed, 16).toString(16).toUpperCase()).substr(-8) === seed) {
            document.getElementById('seedNumber').value = seed;
        }
        let flags = cleanFlags(getFlags.replace(' ', '+'));
        document.getElementById('flagSet').value = flags;
        setFlags(flags);
    }
});

//clear settings button
$('#clearFlags').click(function() {
    $('input:checkbox').each(function() {
        if ($(this).is(':checked')) $('#text-' + this.id).toggleClass('hide');
        this.checked = false;
    });
});

//apply flags button
$('#applyFlags').click(function() {
    let getFlags = $('#flagSet').val();
    let flags = cleanFlags(getFlags);
    $('#flagSet').val(flags);
    setFlags(flags);
});

//reduces flags to minimal length
var cleanFlags = flagSubmit => {
    let flagArray = flagSubmit.split('+');
    let flags = flagArray[0];
    //strip out extraneous characters
    flags = flags.replace(/[^lbDdceupBgixXsfFmMho+]/g, '');
    //strip out duplicate characters
    flags = flags.split('').filter((x, n, s) => s.indexOf(x) == n).join('');
    //disallow and strip out one-of settings
    if (flags.includes('D') && flags.includes('d')) flags = flags.replace(/[dD]/g, '');
    if (flags.includes('x') && flags.includes('X')) flags = flags.replace(/[xX]/g, '');
    if (flags.includes('f') && flags.includes('F')) flags = flags.replace(/[fF]/g, '');
    flags = flagArray.length > 1 ? flags + '+' + flagArray[1] : flags; //expand later
    return flags;
}

//turning on checkboxes based on flags
function setFlags(flags) {
    let flagSet = ['l', 'b', 'D', 'd', 'c', 'e', 'u', 'p', 'B', 'g', 'i', 'x', 'X', 's', 'f', 'F', 'm', 'M', 'h', 'o'], patchSet = ['dx'];
    let flagArray = flags.split('+');
    flagSet.forEach(letter => { 
        if (flagArray[0].includes(letter)) {
            if (!$('#' + letter).is(':checked')) $('#text-' + letter).toggleClass('hide');
            $('#' + letter).prop('checked', true);
        }
    });
    if (flagArray.length > 1) {
        patchSet.forEach(letter => {
            if (flagArray[1].includes(letter)) {
                if (!$('#' + letter).is(':checked')) $('#text-' + letter).toggleClass('hide');
                $('#' + letter).prop('checked', true);
            }
        });
    }
}

//verify ROM on upload
$('#romUpload').change(function() {
    let file = document.getElementById('romUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = () => verification(reader.result);
    reader.readAsArrayBuffer(file);
});

//changes the button appearance based on file upload
var toggleButton = (el, bool) => {
    $(el).prop('disabled', bool);
    if (!bool) {
        $(el).removeClass('btn-outline-light');
        $(el).addClass('btn-light');
    } else {
        $(el).removeClass('btn-light');
        $(el).addClass('btn-outline-light');
    }
}

//shows the footer for sharing the settings link
var showLink = (link) => {
    $('#shareLink').val(link);
    $('#linkFooter').show();
}

//copy to clipboard button
$('#copyLink').click(function() {
    $('#shareLink').select();
    document.execCommand('copy');
});

//creates flags based on checkboxes and determines which settings to make true
var settings = () => {
    let flags = '';
    if ($('#l').is(':checked')) { doLevels = true; flags += 'l'; }
    if ($('#b').is(':checked')) { doBosses = true; flags += 'b'; }
    if ($('#D').is(':checked')) { doAllDuals = true; flags += 'D'; }
    if ($('#d').is(':checked')) { doRandomDuals = true; flags += 'd'; }
    if ($('#c').is(':checked')) { doGambling = true; flags += 'c'; }
    if ($('#e').is(':checked')) { doEnemies = true; flags += 'e'; }
    if ($('#u').is(':checked')) { doPowerups = true; flags += 'u'; }
    if ($('#p').is(':checked')) { doPlatforms = true; flags += 'p'; }
    if ($('#B').is(':checked')) { doBonus = true; flags += 'B'; }
    if ($('#g').is(':checked')) { doGravity = true; flags += 'g'; }
    if ($('#i').is(':checked')) { doIce = true; flags += 'i'; }
    if ($('#x').is(':checked')) { doRandomLuigi = true; flags += 'x'; }
    if ($('#X').is(':checked')) { doAllLuigi = true; flags += 'X'; }
    if ($('#s').is(':checked')) { doScrolling = true; flags += 's'; }
    if ($('#f').is(':checked')) { doRandomFast = true; flags += 'f'; }
    if ($('#F').is(':checked')) { doAllFast = true; flags += 'F'; }
    if ($('#m').is(':checked')) { doMusic = true; flags += 'm'; }
    if ($('#M').is(':checked')) { doFastMusic = true; flags += 'M'; }
    if ($('#h').is(':checked')) { doBossHP = true; flags += 'h'; }
    if ($('#o').is(':checked')) { doOHKO = true; flags += 'o'; }
    if ($('#dx').is(':checked')) { doPatchDX = true; flags += '+dx'; }
    return flags;
}

//create seed numbers
const createSeed = () => {
    let a = (Math.floor(Math.random() * 3839) + 256).toString(16).toUpperCase();
    let b = Date.now().toString(16).toUpperCase().substr(-5,5);
    return a.concat(b);
}

//randomize button
$('#randomizeROM').click(function() {
    let getSeed = document.getElementById('seedNumber').value;
    if (getSeed.length === 8 && ("00000000" + parseInt(getSeed, 16).toString(16).toUpperCase()).substr(-8) === getSeed) rng.setSeed(getSeed);
    else rng.setSeed(createSeed());
    document.getElementById('seedNumber').value = rng.printSeed.toUpperCase();
    document.getElementById('flagSet').value = settings();
    let file = document.getElementById('romUpload').files[0];
    let reader = new FileReader();
    reader.onloadend = () => doRandomize(reader.result);
    reader.readAsArrayBuffer(file);
});