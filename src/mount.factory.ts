import { FACTORY_LOCK_AMOUNT, FACTORY_STATE, factoryTopTargets } from './setting'
import { createHelp } from './utils'

/**
 * 当工厂中的目标商品数量超过该值时
 * 所有的目标商品都将转移至 termial 
 */
const FACTORY_TARGET_LIMIT = 500

/**
 * Factory 原型拓展
 */
export default class FactoryExtension extends StructureFactory {
    public work(): void {
        // 没有启用则跳过
        if (!this.room.memory.factory) return
        // 没有冷却好就直接跳过
        if (this.cooldown !== 0) return

        // 实时更新房间内存中 factoryId
        if (!this.room.memory.factoryId) this.room.memory.factoryId = this.id

        // 执行 factory 工作
        this.runFactory()
    }

    /**
     * factory 的工作总入口
     * 根据当前状态跳转到指定工作
     */
    private runFactory(): void {
        switch (this.room.memory.factory.state) {
            case FACTORY_STATE.PREPARE: 
                if (Game.time % 5) return
                this.prepare()
            break
            case FACTORY_STATE.GET_RESOURCE:
                if (Game.time % 10) return
                this.getResource()
            break
            case FACTORY_STATE.WORKING:
                if (Game.time % 2) return
                this.working()
            break
            case FACTORY_STATE.PUT_RESOURCE:
                if (Game.time % 10) return
                this.putResource()
            break
        }
    }
    
    /**
     * 准备阶段
     * 该阶段会对队列中的任务进行新增（没有任务）或分解（任务无法完成）操作，一旦发现可以生成的任务，则进入下个阶段。
     */
    private prepare(): void {
        console.log('准备阶段!')
        if (!this.room.terminal) console.log(`[${this.room.name} factory] prepare 阶段未找到 terminal，已暂停`)

        // 获取当前任务，没有任务就新增顶级合成任务
        const task = this.getCurrentTask()
        if (!task) {
            this.addTask()
            return
        }

        // 查看 terminal 中底物数量是否足够
        const subResources = COMMODITIES[task.target].components
        for (const resType in subResources) {
            // 所需底物数量不足就拆分任务
            if (this.room.terminal.store[resType] < subResources[resType] * task.amount) {
                // 添加新任务，数量为需要数量 - 已存在数量
                this.addTask({
                    target: resType as CommodityConstant,
                    amount: (subResources[resType] * task.amount) - this.room.terminal.store[resType]
                })
                // 挂起当前任务
                return this.hangTask()
            } 
        }

        // 通过了底物检查就说明可以合成，进入下个阶段
        this.room.memory.factory.state = FACTORY_STATE.GET_RESOURCE
    }

    /**
     * 获取资源
     */
    private getResource(): void {
        console.log('获取资源!')
    }

    /**
     * 执行合成
     */
    private working(): void {
        console.log('执行合成!')
    }

    /**
     * 移出资源
     */
    private putResource(): void {
        console.log('移出资源!')
    }

    /**
     * 获取当前合成任务
     */
    private getCurrentTask(): IFactoryTask | undefined {
        if (this.room.memory.factory.taskList.length <= 0) return undefined
        else return this.room.memory.factory.taskList[0]
    }

    /**
     * 移除当前任务
     * 任务完成或者出错时调用
     */
    private deleteCurrentTask(): void {
        this.room.memory.factory.taskList.shift()
    }

    /**
     * 添加新的合成任务
     * 该方法会自行决策应该合成什么顶级产物
     * 
     * @param task 如果指定则将其添加为新任务，否则新增顶级产物合成任务
     * @returns 新任务在队列中的位置，第一个为 1
     */
    private addTask(task: IFactoryTask = undefined): number {
        if (task) return this.room.memory.factory.taskList.push(task)

        /**
         * @todo 新增顶级化合物
         */
    }

    /**
     * 挂起合成任务
     * 在任务无法进行时调用，将会把任务移动至队列末尾
     */
    private hangTask(): void {
        const task = this.room.memory.factory.taskList.shift()
        this.room.memory.factory.taskList.push(task)
    }

    /**
     * 处理任务
     * 调用该方法来更新当前任务的未完成量
     * 
     * @param amount 完成合成的产物数量
     * @returns OK 任务已完成
     * @returns number 任务剩余的目标数量
     */
    private dealTask(amount: number): OK | number {
        const task = this.getCurrentTask()
        if (!task) return

        const newAmount = task.amount - amount

        // 剩余目标数量大于零就更新，否则就返回完成
        if (newAmount > 0) {
            this.room.memory.factory.taskList[0].amount = newAmount
            return newAmount
        }
        else {
            this.deleteCurrentTask()
            return OK
        }
    }

    /**
     * 设置工厂等级
     * 
     * @todo 如果已经有 power 的话就拒绝设置
     * 
     * @param depositType 生产线类型
     * @param level 等级
     * @returns ERR_INVALID_ARGS 生产线类型异常或者等级小于 1 或者大于 5
     */
    private setLevel(depositType: DepositConstant, level: number): OK | ERR_INVALID_ARGS {
        if (!this.room.memory.factory) this.initMemory()
        const memory = this.room.memory.factory

        // 类型不对返回异常
        if (!(depositType in factoryTopTargets)) return ERR_INVALID_ARGS
        // 等级异常夜蛾返回错误
        if (level > 5 || level < 1) return ERR_INVALID_ARGS

        // 如果之前注册过的话
        if (!_.isUndefined(memory.level) && memory.depositType) {
            // 移除过期的全局 comm 注册
            if (memory.depositType in Memory.commodities) {
                _.pull(Memory.commodities[memory.depositType].node[memory.level], this.room.name)
            }
            // 移除过期共享协议注册
            factoryTopTargets[memory.depositType][memory.level].forEach(resType => {
                this.room.shareRemoveSource(resType)
            })
        }

        // 注册新的共享协议
        factoryTopTargets[depositType][level].forEach(resType => {
            this.room.shareAddSource(resType)
        })
        // 注册新的全局 comm
        if (!Memory.commodities) Memory.commodities = {}
        if (!Memory.commodities[depositType]) Memory.commodities[depositType] = {
            node: {
                1: [], 2: [], 3: [], 4: [], 5: []
            }
        }
        Memory.commodities[depositType].node[level].push(this.room.name)

        // 更新内存属性
        this.room.memory.factory.level = level
        this.room.memory.factory.depositType = depositType
        return OK
    }

    /**
     * 用户操作：设置工厂等级
     * 
     * @param depositType 生产线类型
     * @param level 等级
     */
    public setlevel(depositType: DepositConstant, level: number): string {
        const result = this.setLevel(depositType, level)

        if (result === OK) return `[${this.room.name} factory] 设置成功，${depositType} 生产线 ${level} 级`
        else if (result === ERR_INVALID_ARGS) return `[${this.room.name} factory] 设置失败，请检查参数是否正确`
    }

    /**
     * 用户操作 - 输出当前工厂的状态
     */
    public state(): string {
        if (!this.room.memory.factory) return `[${this.room.name} factory] 工厂未启用`
        const memory = this.room.memory.factory

        // 工厂基本信息
        let states = [
            `生产线类型: ${memory.depositType} 工厂等级: ${memory.level}`,
            `当前工作状态: ${memory.state}`,
            `现存任务数量: ${memory.taskList.length} 任务队列详情:`
        ]

        // 工厂任务队列详情
        if (memory.taskList.length <= 0) states.push('无任务')
        else states.push(...memory.taskList.map((task, index) => `[任务 ${index}] 任务目标: ${task.target} 任务数量: ${task.amount}`))
        
        // 组装返回
        return states.join('\n')
    }

    public help(): string {
        return createHelp([
            {
                title: '设置工厂生产线及等级',
                params: [
                    { name: 'depositType', desc: '生产线类型，必须为 RESOURCE_MIST RESOURCE_BIOMASS RESOURCE_METAL RESOURCE_SILICON 之一' },
                    { name: 'level', desc: '该工厂的生产等级， 1~5 之一'}
                ],
                functionName: 'setlevel'
            },
            {
                title: '显示工厂详情',
                functionName: 'state'
            }
        ])
    }

    /**
     * 初始化工厂内存 
     */
    private initMemory(): void {
        this.room.memory.factory = {
            state: FACTORY_STATE.PREPARE,
            taskList: []
        }
    }

    /**
     * 装填合成需要的资源
     * 
     * @param target 想要合成的资源
     * @returns 是否装填完成
     */
    private getNeedResource(target: ResourceConstant): boolean {
        const componentResources = COMMODITIES[target].components
        for (const component in componentResources) {
            // 如果自己存储里该资源的数量不足，则发布任务
            if (this.store[component] < componentResources[component]) {
                // 检查 terminal 中底物数量是否足够
                if (!this.room.terminal) {
                    console.log(`[${this.room.name} factory] 未发现 terminal，已停工`)
                    return false
                }

                // 如果底物有数量限制的话要先达标才会发布任务
                if ((component in FACTORY_LOCK_AMOUNT) && (this.room.terminal.store[component] < FACTORY_LOCK_AMOUNT[component])) {
                    // console.log(`[${this.room.name} factory] ${component} 数量不足, ${this.room.terminal.store[component]}/${FACTORY_LOCK_AMOUNT[component]}，已停工`)
                    // 在这里添加进入休眠阶段
                    return false
                }

                this.addGetTask(component as ResourceConstant, componentResources[component])
                return false
            }
        }

        return true
    }

    /**
     * 向房间中央转移队列发布获取资源任务
     * 从 storage 中获取指定的资源
     * 
     * @param resourceType 想要获取的资源类型
     * @param amount 想要获取的资源数量
     */
    public addGetTask(resourceType: ResourceConstant, amount: number): void {
        // 发布前先检查下有没有任务
        if (this.room.hasCenterTask(STRUCTURE_FACTORY)) return 

        this.room.addCenterTask({
            submit: STRUCTURE_FACTORY,
            // 如果是能量就从 storage 里拿，是其他资源就从 terminal 里拿
            source: resourceType == RESOURCE_ENERGY ? STRUCTURE_STORAGE : STRUCTURE_TERMINAL,
            target: STRUCTURE_FACTORY,
            resourceType: resourceType,
            amount: amount
        })
    }
    
    /**
     * 向房间中央转移队列发布移出资源任务
     * 将自己 store 中合成好的资源全部转移到 termial 中
     * 
     * @param resourceType 想要转移出去的资源类型
     */
    public addPutTask(resourceType: ResourceConstant): void {
        // 发布前先检查下有没有任务
        if (this.room.hasCenterTask(STRUCTURE_FACTORY)) return 

        this.room.addCenterTask({
            submit: STRUCTURE_FACTORY,
            source: STRUCTURE_FACTORY,
            target: STRUCTURE_TERMINAL,
            resourceType: resourceType,
            amount: this.store.getUsedCapacity(resourceType)
        })
    }
}