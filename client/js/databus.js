import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()
    this.user = {}

    this.reset()
  }

  reset() {
    this.activity = ""
    this.frame      = 0
    this.scale = 3
    this.lastHitFrame   = 0
    this.score      = 0
    this.bullets    = []
    this.enemys     = []
    this.enemyFrame = []
    this.enemyFace  = []
    this.animations = []
    this.gameOver   = false
    this.pause = false

    // 超时判断的变量
    this.startFrame = 0
    this.duration = 0
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = this.enemys.shift()
    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  removeEnemyFrame(enemyFrame) {
    let temp = this.enemyFrame.shift()
    temp.visible = false
    this.pool.recover('enemyFrame', enemyFrame)
  }


  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
}
