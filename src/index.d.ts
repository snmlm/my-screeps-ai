declare var module: any
declare var global: any

/**
 * Memory 内存拓展
 * @property {array} spawnList 要生成的 creep 队列
 * @property {object} expansionList 扩张计划列表
 */
interface Memory {
    spawnList: string[]
}

/**
 * creep 内存拓展
 * @property role crep的角色
 * @property working 是否在工作
 * @property hasSendRebirth 是否已经往 spwan 队列中推送了自己的重生任务
 */
interface CreepMemory {
    role: string
    working: boolean
    hasSendRebirth: boolean
    squad?: number
}

/**
 * creep 的作业操作配置项
 * @property func 要执行的方法名，必须在 Creep 原型上
 * @property args 传递给执行方法的参数数组
 */
interface IWorkOperation {
    func: string
    args: any[]
}

/**
 * creep 的配置项
 * @property source creep非工作(收集能量时)执行的方法
 * @property target creep工作时执行的方法
 * @property switch 更新状态时触发的方法, 该方法必须位于 Creep 上, 且可以返回 true/false
 * @property spawn 要进行生产的出生点
 */
interface ICreepConfig {
    source: IWorkOperation[]
    target: IWorkOperation[]
    switch?: IWorkOperation
    spawn: string
    bodys: BodyPartConstant[]
}

/**
 * creep 的配置项列表
 */
interface ICreepConfigs {
    [creepName: string]: ICreepConfig
}

/**
 * 从路径名到颜色的映射表
 */
interface IPathMap {
    [propName: string]: string
}

/**
 * 对 Flag 的原型拓展
 * @see file ./src/mount.flag.ts
 */
interface Flag {
    getStructureByFlag(): Structure<StructureConstant>[]
}