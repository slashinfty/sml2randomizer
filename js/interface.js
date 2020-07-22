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
        case 'w':
            if (!$('#l').is(':checked')) $('#text-l').toggleClass('hide');
            $('#l').prop('checked', true);
            break;
        case 'l':
            if ($('#w').is(':checked')) $('#text-w').toggleClass('hide');
            $('#w').prop('checked', false);
            break;
        case 'Z':
            if ($('#M').is(':checked')) $('#text-M').toggleClass('hide');
            if ($('#m').is(':checked')) $('#text-m').toggleClass('hide');
            $('#M').prop('checked', false);
            $('#m').prop('checked', false);
            break;
        case 'M': case'm':
            if ($('#Z').is(':checked')) $('#text-Z').toggleClass('hide');
            $('#Z').prop('checked', false);
            break;
    }
});

//read seed and flags from the URL in the format /?s=SEED&f=FLAGS
//check localStorage for previously saved settings
$(document).ready(() => {
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
    let checkStorage = window.localStorage.getItem("settings");
    if (checkStorage != null && checkStorage != undefined && checkStorage != '') $('#loadFooter').show();
});

//load saved settings
$('#loadSavedSettings').click(function() {
    let getFlags = window.localStorage.getItem("settings");
    let flags = cleanFlags(getFlags.replace(' ', '+'));
    document.getElementById('flagSet').value = flags;
    setFlags(flags);
    $('#loadFooter').hide();
});

//clear saved settings
$('#deleteSavedSettings').click(function() {
    window.localStorage.removeItem("settings");
    $('#loadFooter').hide();
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
    $('#flagsFooter').hide();
    let flagArray = flagSubmit.split('+');
    let flags = flagArray[0];
    //strip out extraneous characters
    flags = flags.replace(/[^lwbDdceupBgixXsfFmMho+]/g, '');
    //strip out duplicate characters
    flags = flags.split('').filter((x, n, s) => s.indexOf(x) == n).join('');
    //disallow and strip out one-of settings
    if (flags.includes('w') && !flags.includes('l')) flags = 'l' + flags;
    if (flags.includes('D') && flags.includes('d')) flags = flags.replace(/[dD]/g, '');
    if (flags.includes('x') && flags.includes('X')) flags = flags.replace(/[xX]/g, '');
    if (flags.includes('f') && flags.includes('F')) flags = flags.replace(/[fF]/g, '');
    if (flags.includes('Z') && (flags.includes('M') || flags.includes('m'))) flags = flags.replace(/[ZMm]/g, '');
    flags = flagArray.length > 1 ? flags + '+' + flagArray[1] : flags; //expand later
	if (flags != flagSubmit) $('#flagsFooter').show();
    return flags;
}

//turning on checkboxes based on flags
function setFlags(flags) {
    let flagSet = ['l', 'w', 'b', 'D', 'd', 'c', 'e', 'u', 'p', 'B', 'g', 'i', 'x', 'X', 's', 'f', 'F', 'm', 'M', 'Z', 'z', 'h', 'o'], patchSet = ['dx'];
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
    if ($('#l').is(':checked')) { doLevels = true; flags += 'l'; } else { doLevels = false; }
    if ($('#w').is(':checked')) { doIncludeDuals = true; flags += 'w'; } else { doIncludeDuals = false; }
    if ($('#b').is(':checked')) { doBosses = true; flags += 'b'; } else { doBosses = false; }
    if ($('#D').is(':checked')) { doAllDuals = true; flags += 'D'; } else { doAllDuals = false; }
    if ($('#d').is(':checked')) { doRandomDuals = true; flags += 'd'; } else { doRandomDuals = false; }
    if ($('#c').is(':checked')) { doGambling = true; flags += 'c'; } else { doGambling = false; }
    if ($('#e').is(':checked')) { doEnemies = true; flags += 'e'; } else { doEnemies = false; }
    if ($('#u').is(':checked')) { doPowerups = true; flags += 'u'; } else { doPowerups = false; }
    if ($('#p').is(':checked')) { doPlatforms = true; flags += 'p'; } else { doPlatforms = false; }
    if ($('#B').is(':checked')) { doBonus = true; flags += 'B'; } else { doBonus = false; }
    if ($('#g').is(':checked')) { doGravity = true; flags += 'g'; } else { doGravity = false; }
    if ($('#i').is(':checked')) { doIce = true; flags += 'i'; } else { doIce = false; }
    if ($('#x').is(':checked')) { doRandomLuigi = true; flags += 'x'; } else { doRandomLuigi = false; }
    if ($('#X').is(':checked')) { doAllLuigi = true; flags += 'X'; } else { doAllLuigi = false; }
    if ($('#s').is(':checked')) { doScrolling = true; flags += 's'; } else { doScrolling = false; }
    if ($('#f').is(':checked')) { doRandomFast = true; flags += 'f'; } else { doRandomFast = false; }
    if ($('#F').is(':checked')) { doAllFast = true; flags += 'F'; } else { doAllFast = false; }
    if ($('#m').is(':checked')) { doMusic = true; flags += 'm'; } else { doMusic = false; }
    if ($('#M').is(':checked')) { doFastMusic = true; flags += 'M'; } else { doFastMusic = false; }
    if ($('#Z').is(':checked')) { doDisableMusic = true; flags += 'Z'; } else { doDisableMusic = false; }
    if ($('#z').is(':checked')) { doDisableSoundFX = true; flags += 'z'; } else { doDisableSoundFX = false; }
    if ($('#h').is(':checked')) { doBossHP = true; flags += 'h'; } else { doBossHP = false; }
    if ($('#o').is(':checked')) { doOHKO = true; flags += 'o'; } else { doOHKO = false; }
    if ($('#dx').is(':checked')) { doPatchDX = true; flags += '+dx'; } else { doPatchDX = false; }
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
