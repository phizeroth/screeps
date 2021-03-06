var roleHarvester = {

    /**@param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            let sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else {
            // repair on the go
            var repairTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: function(object) {
                    return object.hits < object.hitsMax
                        && object.hitsMax - object.hits > REPAIR_POWER;
                }
            });
            repairTargets.sort((a,b) => a.hits - b.hits);
            if (repairTargets.length > 0) creep.repair(repairTargets[0]);

            // find energy stores
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;
