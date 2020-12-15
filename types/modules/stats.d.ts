interface StatsMemory {
    /**
     * GCl/GPL 升级百分比
     */
    gcl?: number
    gclLevel?: number
    gpl?: number
    gplLevel?: number
    /**
     * CPU 当前数值及百分比
     */
    cpu?: number
    /**
     * bucket 当前数值
     */
    bucket?: number
    /**
     * 当前还有多少钱
     */
    credit?: number

    /**
    * 房间内的数据统计
    */
    rooms: {
        [roomName: string]: RoomStats
    }
}

/**
 * 房间的统计数据
 */
interface RoomStats {
    /**
     * storage 中的能量剩余量
     */
    energy: number
    /**
     * 终端中的 power 数量
     */
    power: number
    /**
     * nuker 的资源存储量
     */
    nukerEnergy: number
    nukerG: number
    nukerCooldown: number
    /**
     * 控制器升级进度，只包含没有到 8 级的
     */
    controllerRatio: number
    controllerLevel: number
    /**
     * 其他种类的资源数量，由 factory 统计
     */
    [commRes: string]: number
    /**
     * 升级工的工作时长
     */
    upgraderWorkingTime: number
    /**
     * 升级工的生命总时长
     */
    upgraderLifeTime: number
    /**
     * 搬运工的工作时长
     */
    transporterWorkingTime: number
    /**
     * 搬运工的生命总时长
     */
    transporterLifeTime: number
}