var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.task = 'collecting';
            creep.say('collecting');
        } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.task = 'building';
            creep.say('building');
        } else {
            creep.memory.task = 'harvesting';
            creep.say('harvesting')
        }
        if (creep.memory.task == 'building') {
            var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (constructions.length) {
                if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0]);
                }
            }
        } else if (creep.memory.task == 'collecting') {
            var stores = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy > 0;
                }
            });

            if (stores.length > 0 && creep.carry.energy < creep.carryCapacity) {
                if (creep.withdraw(stores[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(stores[0]);
                }
            }
        } else if (creep.memory.task == 'harvesting') {
            let sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
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
}

module.exports = roleBuilder;
