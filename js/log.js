const overworld = {
		"lv00": {offset: 0x3C218, name: "Mushroom House"},
		"lv01": {offset: 0x3C23B, name: "Tree Zone 1"},
		"lv02": {offset: 0x3C23A, name: "Tree Zone 2"},
		"lv03": {offset: 0x3C239, name: "Tree Zone 3"},
		"lv04": {offset: 0x3C23C, name: "Tree Zone 4"},
		"lv05": {offset: 0x3C238, name: "Tree Zone 5"},
		"lv1D": {offset: 0x3C23E, name: "Tree Zone Special"},
		"lv11": {offset: 0x3C21D, name: "Hippo"},
		"lv12": {offset: 0x3C254, name: "Space Zone 1"},
		"lv13": {offset: 0x3C255, name: "Space Zone 2"},
		"lv1C": {offset: 0x3C25C, name: "Space Zone Special"},
		"lv14": {offset: 0x3C24A, name: "Macro Zone 1"},
		"lv15": {offset: 0x3C24B, name: "Macro Zone 2"},
		"lv16": {offset: 0x3C24C, name: "Macro Zone 3"},
		"lv17": {offset: 0x3C24D, name: "Macro Zone 4"},
		"lv1E": {offset: 0x3C282, name: "Macro Zone Special"},
		"lv06": {offset: 0x3C240, name: "Pumpkin Zone 1"},
		"lv07": {offset: 0x3C241, name: "Pumpkin Zone 2"},
		"lv08": {offset: 0x3C242, name: "Pumpkin Zone 3"},
		"lv09": {offset: 0x3C243, name: "Pumpkin Zone 4"},
		"lv1B": {offset: 0x3C290, name: "Pumpkin Zone Special 1"},
		"lv1F": {offset: 0x3C292, name: "Pumpkin Zone Special 2"},
		"lv0A": {offset: 0x3C268, name: "Mario Zone 1"},
		"lv0B": {offset: 0x3C269, name: "Mario Zone 2"},
		"lv0C": {offset: 0x3C26A, name: "Mario Zone 3"},
		"lv0D": {offset: 0x3C26B, name: "Mario Zone 4"},
		"lv0E": {offset: 0x3C25E, name: "Turtle Zone 1"},
		"lv0F": {offset: 0x3C260, name: "Turtle Zone 2"},
		"lv10": {offset: 0x3C261, name: "Turtle Zone 3"},
		"lv1A": {offset: 0x3C27E, name: "Turtle Zone Special"},
		"lv19": {offset: 0x3C21C, name: "Miscellaneous"},
		"lv18": {offset: 0x57F5, name: "Wario's Castle"} //level number in header since it never moves
}

const levels = {
	"lookup": [
		{byte: 0x00, name: "Mushroom House"},
		{byte: 0x01, name: "Tree Zone 1"},
		{byte: 0x02, name: "Tree Zone 2"},
		{byte: 0x03, name: "Tree Zone 3"},
		{byte: 0x04, name: "Tree Zone 4"},
		{byte: 0x05, name: "Tree Zone 5"},
		{byte: 0x06, name: "Pumpkin Zone 1"},
		{byte: 0x07, name: "Pumpkin Zone 2"},
		{byte: 0x08, name: "Pumpkin Zone 3"},
		{byte: 0x09, name: "Pumpkin Zone 4"},
		{byte: 0x0A, name: "Mario Zone 1"},
		{byte: 0x0B, name: "Mario Zone 2"},
		{byte: 0x0C, name: "Mario Zone 3"},
		{byte: 0x0D, name: "Mario Zone 4"},
		{byte: 0x0E, name: "Turtle Zone 1"},
		{byte: 0x0F, name: "Turtle Zone 2"},
		{byte: 0x10, name: "Turtle Zone 3"},
		{byte: 0x11, name: "Hippo"},
		{byte: 0x12, name: "Space Zone 1"},
		{byte: 0x13, name: "Space Zone 2"},
		{byte: 0x14, name: "Macro Zone 1"},
		{byte: 0x15, name: "Macro Zone 2"},
		{byte: 0x16, name: "Macro Zone 3"},
		{byte: 0x17, name: "Macro Zone 4"},
		{byte: 0x18, name: "Wario's Castle"},
		{byte: 0x19, name: "Miscellaneous"},
		{byte: 0x1A, name: "Turtle Zone Special"},
		{byte: 0x1B, name: "Pumpkin Zone Special 1"},
		{byte: 0x1C, name: "Space Zone Special"},
		{byte: 0x1D, name: "Tree Zone Special"},
		{byte: 0x1E, name: "Macro Zone Special"},
		{byte: 0x1F, name: "Pumpkin Zone Special 2"}
	]
}

const gravity = {
	"lookup": [
		{byte: 0x00, name: "Normal"},
		{byte: 0x01, name: "Space"},
		{byte: 0x08, name: "Moon"}
	]
}

const physics = {
	"lookup": [
		{byte: 0x00, name: "Ice"},
		{byte: 0x03, name: "Luigi"},
		{byte: 0x04, name: "Mario"}
	]
}

const dualExits = {
	"lookup": [
		{byte: 0x02, offset: 0x2A385},
		{byte: 0x07, offset: 0x49215},
		{byte: 0x08, offset: 0x49F61},
		{byte: 0x0F, offset: 0x51D99},
		{byte: 0x11, offset: 0x4C8EB},
		{byte: 0x12, offset: 0x4DA53},
		{byte: 0x14, offset: 0x54ACE}
	]
}

const bosses = {
	"lookup": [
		{byte: 0x05, offset: 0x8E03, name: "Bird"},
		{byte: 0x09, offset: 0x8E08, name: "Witch"},
		{byte: 0x0D, offset: 0x8E0D, name: "Pigs"},
		{byte: 0x10, offset: 0x8E12, name: "Octopus"},
		{byte: 0x13, offset: 0x8E17, name: "Tatanga"},
		{byte: 0x17, offset: 0x8E1C , name: "Rat"}
	]
}

const bossHealth = {
	"lookup": [
		{offset: 0x8E52, name: "Bird"},
		{offset: 0x8E5B, name: "Octopus"},
		{offset: 0x8E61, name: "Rat"},
		{offset: 0x8E5E, name: "Tatanga"},
		{offset: 0x8E55, name: "Witch"}
	]
}

function createLog(rom, filename, flags) {
	var version = rom[0x14C] == 0x02 ? 0x3 : 0x0;
    var obj = new Object();
	obj.randoVersion = VERSION;
    obj.romVersion = rom[0x14C] == 0x00 ? 'v1.0' : 'v1.2';
    obj.dx = rom[0x148] == 0x05;
	obj.seed = prng.printSeed;
	obj.flags = flags;
    obj.levels = [];
	for (o in overworld) {
		var l = new Object();
		var levelByte = rom[overworld[o].offset];
		l.overworld = overworld[o].name;
		const levelNameObj = levels.lookup.find(level => level.byte == levelByte);
		l.level = levelNameObj.name;
		const bossOffsetObj = bosses.lookup.find(level => level.byte == levelByte);
		if (bossOffsetObj !== undefined) {
			for (var i = 0; i < bosses.lookup.length; i++) {
				if (rom[bosses.lookup[i].offset] == levelByte) {
					const bossNameObj = bosses.lookup[i];
					l.boss = bossNameObj.name;
					break;
				}
			}
			if (l.boss == "Pigs") {
				l.pig_one_health = rom[0x8FBB];
				l.pig_two_health = rom[0x8FA9];
				l.pig_three_health = rom[0x8E58];
			} else {
				const bossHealthObj = bossHealth.lookup.find(boss => boss.name == l.boss);
				l.boss_health = rom[bossHealthObj.offset];
			}
		}
		if (levelByte == 0x18) {
			l.boss = "Wario";
			l.phase_one_health = rom[0x8E64];
			l.phase_two_health = rom[0x8E67];
			l.phase_three_health = rom[0x8E6A];
		}
		const dualExitObj = dualExits.lookup.find(level => level.byte == levelByte);
		if (dualExitObj !== undefined) {
			l.true_exit = rom[dualExitObj.offset] == 0x4A;
		}
		var gravityByte = rom[0x1F91 + levelByte + version];
		const gravityObj = gravity.lookup.find(grav => grav.byte == gravityByte);
		l.gravity = gravityObj.name;
		if (doBothPhysics || doLuigiPhysics || doIcePhysics) {
			var physicsTable = rom[0x148] == 0x05 ? 0x93D20 : 0x33020;
			var physicsByte = rom[physicsTable + levelByte];
			const physicsObj = physics.lookup.find(phys => phys.byte == physicsByte);
			if (physicsObj !== undefined) {
				l.physics = physicsObj.name;
			}
		}
		var autoscroller = rom[0x1F71 + levelByte + version] == 0x01;
		l.autoscroller = autoscroller;
		if (autoscroller) {
			var speedTable = rom[0x148] == 0x05 ? 0x93D40 : 0x33040;
			l.autoscroller_speed = rom[speedTable + levelByte];
		}
		obj.levels.push(l);
	}
	saveAs(new Blob([JSON.stringify(obj, undefined, 2)], {type: "text/plain;charset=utf-8"}), filename + ".json");
}
