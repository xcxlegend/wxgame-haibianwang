import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH   = 100
const ENEMY_HEIGHT  = 100
const ENEMY_HIT_ANIMATE = 20

const ENEMY_IMG_SRCS = [
  "images/biaoqing1.png",
  "images/biaoqing2.png",
  "images/biaoqing3.png",
  "images/biaoqing4.png",
  "images/biaoqing5.png",
  "images/biaoqing6.png",
  "images/biaoqing7.png",
  "images/biaoqing8.png",
  "images/biaoqing9.png",
  "images/biaoqing10.png",
  ]

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    let src_id = rnd(0, ENEMY_IMG_SRCS.length)
    let src = ENEMY_IMG_SRCS[src_id]
    super(src, ENEMY_WIDTH, ENEMY_HEIGHT)
  }

  init(enemyFrame) {

    this.enemyFrame = enemyFrame
    this.hited = false

    this.x = this.enemyFrame.enemyX
    this.y = this.enemyFrame.enemyY

    let src_id = rnd(0, ENEMY_IMG_SRCS.length)
    this.img.src = ENEMY_IMG_SRCS[src_id]

    this.visible = true
  }

  hit() {
    const EXPLO_IMG_PREFIX = 'images/shang'
    const rdnCount = 7
    let id = rnd(0, rdnCount)
    this.img.src = EXPLO_IMG_PREFIX + (id + 1) + '.png'
    this.hited = true
    this.hitFrame = databus.frame
  }

  // 每一帧更新子弹位置
  update() {
    if (this.hited && databus.frame - this.hitFrame > ENEMY_HIT_ANIMATE) {
      this.visible = false
      this.enemyFrame.visible = false
    }

    if (!this.visible) databus.removeEnemey(this)
  }
}
