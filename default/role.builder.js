var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var repairTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: function(object) {
                return object.hits < object.hitsMax
                    && object.hitsMax - object.hits > REPAIR_POWER;
            }
        });
        repairTargets.sort((a,b) => a.hits - b.hits);
        if (repairTargets.length > 0) creep. repair(repairTargets[0]);

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleBuilder;
