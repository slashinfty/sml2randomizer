var doLog;

$("#fileupload").change(function() {
    var file = document.getElementById("fileupload").files[0];
    var reader = new FileReader();
    reader.onloadend = function(e) {
        var arrayBuffer = reader.result;
        romCheck(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);
});

$("#randomizeRom").click(function(){
    if (checkpoint_one()) {
        alert("Luigi Physics does not work with DX ROMs. Select another physics option.");
    } else {
        seedGenerator(document.getElementById("seed").value.toUpperCase());
        flagGenerator();
        var file = document.getElementById("fileupload").files[0];
        var reader = new FileReader();
        reader.onloadend = function(e) {
            doRandomize(reader.result);
        };
        reader.readAsArrayBuffer(file);
    }
});

function romCheck(buffer) {
    var romTest = new Uint8Array(buffer);
    var print = "Not a ROM of MARIOLAND2";
    var origRom = [0x4D, 0x41, 0x52, 0x49, 0x4F, 0x4C, 0x41, 0x4E, 0x44, 0x32];
    var romVerify = 10;
    for (var i = 0; i < origRom.length; i++) {
        if (romTest[0x134 + i] == origRom[i]) {
            romVerify--;
        }
    }
    if (romVerify == 0) {
        if (romTest[0x148] == 0x05 && romTest[0xC2000] < 0x13) {
            print = "DX ROM must be v1.8.1"
            document.getElementById("randomizeRom").disabled = true;
        } else {
            var vOne = romTest[0x14C] == 0x00 ? "v1.0" : "v1.2";
            var dxRom = romTest[0x148] == 0x05 ? "DX - " : "";
            print = "ROM: MARIOLAND2 - " + dxRom + vOne;
            document.getElementById("randomizeRom").disabled = false;
        }
    } else {
        document.getElementById("randomizeRom").disabled = true;
    }
    document.getElementById("romVersion").innerHTML = print;
}

function checkpoint_one() {
    var a = document.getElementById("romVersion").innerHTML.indexOf("DX") > -1;
    var b = document.getElementById("characterPhysics").value == "luigiPhysics";
    return a && b;
}

function seedGenerator(custom = null) {
    if (custom != null && ("000" + parseInt(custom, 16).toString(16).toUpperCase()).substr(-8) == custom && custom.length == 8) {
        prng.setSeed(custom);
    } else {
        var partA = (Math.floor(Math.random() * 3839) + 256).toString(16).toUpperCase();
        var partB = Date.now().toString(16).toUpperCase().substr(-5,5);
        prng.setSeed(partA.concat(partB));
        document.getElementById("seed").value = prng.printSeed.toUpperCase();
    }
}

function checkboxes() {
	var f = document.getElementById("flags").value;
	var flags = parseInt(f, 16);
    if ((flags & 0x004) != 0 && (flags & 0x008) != 0) {
        document.getElementById("flags").value = "";
        alert("Invalid flags - can not set swapping exits to two different settings.");
    } else if ((flags & 0x100) != 0 && (flags & 0x200) != 0){
        document.getElementById("flags").value = "";
        alert("Invalid flags - can not set physics to two different settings.");
    } else {
        $("#randomizeLevels").prop("checked", function() {
    		return (flags & 0x001) != 0;
    	}).checkboxradio('refresh');
    	$("#randomizeBosses").prop("checked", function() {
    		return (flags & 0x002) != 0;
    	}).checkboxradio('refresh');
        if ((flags & 0x004) != 0) {
            $("#swapExits").val("randomSwap").selectmenu('refresh');
        }
        if ((flags & 0x008) != 0) {
            $("#swapExits").val("allExits").selectmenu('refresh');
        }
    	$("#randomizeEnemies").prop("checked", function() {
    		return (flags & 0x010) != 0;
    	}).checkboxradio('refresh');
    	$("#randomizePowerups").prop("checked", function() {
    		return (flags & 0x020) != 0;
    	}).checkboxradio('refresh');
    	$("#randomizePlatforms").prop("checked", function() {
    		return (flags & 0x040) != 0;
    	}).checkboxradio('refresh');
    	$("#randomizeGravity").prop("checked", function() {
    		return (flags & 0x080) != 0;
    	}).checkboxradio('refresh');
        if ((flags & 0x100) != 0) {
            $("#characterPhysics").val("bothPhysics").selectmenu('refresh');
        }
        if ((flags & 0x200) != 0) {
            $("#characterPhysics").val("luigiPhysics").selectmenu('refresh');
        }
        $("#randomizeIce").prop("checked", function() {
    		return (flags & 0x400) != 0;
    	}).checkboxradio('refresh');
    	$("#randomizeScrolling").prop("checked", function() {
    		return (flags & 0x800) != 0;
    	}).checkboxradio('refresh');
    	$("#randomizeMusic").prop("checked", function() {
    		return (flags & 0x1000) != 0;
    	}).checkboxradio('refresh');
    	$("#beastMode").prop("checked", function() {
    		return (flags & 0x2000) != 0;
    	}).checkboxradio('refresh');
    }
}

function flagGenerator() {
    var flags = 0;
    if (document.getElementById("randomizeLevels").checked) {
        doLevels = true;
        flags |= 0x001;
    }
    if (document.getElementById("randomizeBosses").checked) {
        doBosses = true;
        flags |= 0x002;
    }
    if (document.getElementById("swapExits").value == "randomSwap") {
        doSwap = true;
        flags |= 0x004;
    }
    if (document.getElementById("swapExits").value == "allExits") {
        doAllExits = true;
        flags |= 0x008;
    }
    if (document.getElementById("randomizeEnemies").checked) {
        doEnemies = true;
        flags |= 0x010;
    }
    if (document.getElementById("randomizePowerups").checked) {
        doPowerups = true;
        flags |= 0x020;
    }
    if (document.getElementById("randomizePlatforms").checked) {
        doPlatforms = true;
        flags |= 0x040;
    }
    if (document.getElementById("randomizeGravity").checked) {
        doGravity = true;
        flags |= 0x080;
    }
    if (document.getElementById("characterPhysics").value == "bothPhysics") {
        doBothPhysics = true;
        flags |= 0x100;
    }
    if (document.getElementById("characterPhysics").value == "luigiPhysics") {
        doLuigiPhysics = true;
        flags |= 0x200;
    }
    if (document.getElementById("randomizeIce").checked) {
        doIcePhysics = true;
        flags |= 0x400;
    }
    if (document.getElementById("randomizeScrolling").checked) {
        doScrolling = true;
        flags |= 0x800;
    }
    if (document.getElementById("randomizeMusic").checked) {
        doMusic = true;
        flags |= 0x1000;
    }
    if (document.getElementById("beastMode").checked) {
        beastMode = true;
        flags |= 0x2000;
    }
    document.getElementById("flags").value = ("0000" + flags.toString(16).toUpperCase()).substr(-4);
};

function doRandomize(buffer) {
    var rom = new Uint8Array(buffer);
    if (doLevels) {
        randomizeLevels(rom);
    }
    if (doAllExits || doSwap) {
        swapExits(rom);
    }
    if (doBosses) {
        randomizeBosses(rom);
    }
    if (doEnemies) {
        randomizeEnemies(rom);
    }
    if (doPowerups) {
        randomizePowerups(rom);
    }
    if (doPlatforms) {
        randomizePlatforms(rom);
    }
    if (doGravity) {
        randomizeGravity(rom);
    }
    if (doBothPhysics || doLuigiPhysics || doIcePhysics) {
        randomizePhysics(rom);
    }
    if (doScrolling) {
        randomizeScrolling(rom);
    }
    if (doMusic) {
        randomizeMusic(rom);
    }
    if (beastMode) {
        randomizeBossHealth(rom);
    }
    //patch(patchPhysicsScrolling, rom); //TODO testing feature
    fileSelectScreen(rom);
    credits(rom);
    checksum(rom);
    var flags = document.getElementById("flags").value;
    document.getElementById("romVersion").innerHTML = "sml2r.download/?s=" + prng.printSeed + "&f=" + flags;
    $("#romVersion").addClass('clickable');
    var ifDx = rom[0x148] == 0x05 ? "DX-" : "";
    var filename = "sml2r-" + ifDx + prng.printSeed + "-" + flags;
    if (doLog){
        createLog(rom, filename, flags);
    } else {
        saveAs(new Blob([buffer], {type: "octet/stream"}), filename + ".gb");
    }
}
