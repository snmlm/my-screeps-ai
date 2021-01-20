interface Room {
    /**
     * 建筑快捷访问
     */
    [STRUCTURE_FACTORY]?: StructureFactory
    [STRUCTURE_POWER_SPAWN]?: StructurePowerSpawn
    [STRUCTURE_NUKER]?: StructureNuker
    [STRUCTURE_OBSERVER]?: StructureObserver
    [STRUCTURE_EXTRACTOR]?: StructureExtractor

    [STRUCTURE_SPAWN]?: StructureSpawn[]
    [STRUCTURE_EXTENSION]?: StructureExtension[]
    [STRUCTURE_ROAD]?: StructureRoad[]
    [STRUCTURE_WALL]?: StructureWall[]
    [STRUCTURE_RAMPART]?: StructureRampart[]
    [STRUCTURE_KEEPER_LAIR]?: StructureKeeperLair[]
    [STRUCTURE_PORTAL]?: StructurePortal[]
    [STRUCTURE_LINK]?: StructureLink[]
    [STRUCTURE_TOWER]?: StructureTower[]
    [STRUCTURE_LAB]?: StructureLab[]
    [STRUCTURE_CONTAINER]?: StructureContainer[]

    mineral?: Mineral
    source?: Source[]
    centerLink?: StructureLink
}

interface Memory {
    /**
     * 延迟任务存储
     */
    delayTasks: DelayTaskMemory[]
}

/**
 * 延迟任务的数据
 */
interface DelayTaskData {
    /**
     * 必须为延迟任务分配一个房间名
     * 执行回调时会自动将其转换为房间对象
     */
    roomName: string
}

/**
 * 所有延迟任务的名称和数据的对应 map
 */
interface DelayTaskTypes {
    /**
     * 刷墙工延迟孵化任务
     */
    spawnFiller: DelayTaskData
    /**
     * 挖矿工延迟孵化任务
     */
    spawnMiner: DelayTaskData
    /**
     * 升级工延迟孵化任务
     */
    spawnUpgrader: DelayTaskData
    /**
     * 任务模块的全局重置后重规划任务
     */
    taskDispath: DelayTaskData
}

/**
 * 所有延迟任务的名字
 */
type AllDelayTaskName = keyof DelayTaskTypes

/**
 * 延迟任务的回调
 * 
 * @param data 任务的数据
 * @param room 该任务对应的房间对象，由数据中的 roomName 获取
 */
type DelayTaskCallback<K extends AllDelayTaskName> = (room: Room | undefined, data: DelayTaskTypes[K]) => void

interface DelayTaskMemory {
    /**
     * 该任务被调用的 Game.time
     */
    call: number
    /**
     * 被 JSON.stringify 压缩成字符串的任务数据，其值为任务名 + 空格 + 任务数据
     */
    data: string
}