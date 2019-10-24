/**
 * 设置项
 * 本文件和 config.ts 的区别在于，本文件中的内容一般情况下不需要进行修改。
 * 本文件内容为项目中的内置常量
 */

/**
 * 不同角色类型的身体部件
 * spawn 在孵化时会根据所处房间的等级自动调整身体部件
 */
export const bodyConfigs: IBodyConfigs = {
    /**
     * 工作单位
     * 诸如 harvester、builder、upgrader 之类的
     */
    worker: {
        1: [ WORK, CARRY, MOVE ],
        2: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        3: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        4: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        5: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        6: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
        7: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        8: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ]
    },

    /**
     * 纯粹的工作单位
     * 只包含 WORK 和少量的 MOVE
     */
    pureWork: {
        1: [ WORK, WORK, MOVE ],
        2: [ WORK, WORK, MOVE, WORK, MOVE ],
        3: [ WORK, WORK, MOVE, WORK, WORK, MOVE ],
        4: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, MOVE ],
        5: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE ],
        6: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, MOVE ],
        7: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE ],
        8: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE ]
    },
    
    /**
     * 小型 worker
     */
    smallWorker: {
        1: [ WORK, CARRY, MOVE ],
        2: [ WORK, CARRY, MOVE ],
        3: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        4: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        5: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        6: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        7: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        8: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ]
    },

    /**
     * 转移单位
     * 负责转移基地资源的 creep
     */
    transfer: {
        1: [ CARRY, CARRY, MOVE ],
        2: [ CARRY, CARRY, MOVE, CARRY, MOVE ],
        3: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        4: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE ],
        5: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        6: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE ],
        7: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        8: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ]
    },

    /**
     * 声明单位
     * 包含 CLAIM 的 creep
     */
    claimer: {
        1: [ MOVE, CLAIM ],
        2: [ MOVE, CLAIM ],
        3: [ MOVE, CLAIM ],
        4: [ MOVE, CLAIM ],
        5: [ MOVE, CLAIM, MOVE, CLAIM ],
        6: [ MOVE, CLAIM, MOVE, CLAIM ],
        7: [ MOVE, CLAIM, MOVE, CLAIM ],
        8: [ MOVE, CLAIM, MOVE, CLAIM ],
    },

    /**
     * 基础攻击单位
     * 使用 attack 身体部件的攻击单位
     */
    attacker: {
        1: [ MOVE, MOVE, ATTACK, ATTACK ],
        2: [ MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK ],
        3: [ MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK ],
        4: [ MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        5: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        6: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        7: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        8: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ]
    },
    
    /**
     * 治疗单位
     */
    healer: {
        1: [ MOVE, MOVE, HEAL, HEAL ],
        2: [ MOVE, MOVE, MOVE, HEAL, HEAL, HEAL ],
        3: [ MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL ],
        4: [ MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL ],
        5: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ],
        6: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ],
        7: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ],
        8: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ]

    }
}