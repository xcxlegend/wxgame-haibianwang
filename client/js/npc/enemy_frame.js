import Animation from '../base/animation'
import DataBus from '../databus'

const ENEMY_FRAME_IMG_SRCS = [
  ["images/lian1(w230h191).png", 597, 599, 230, 191],
  ["images/lian2(w208h243).png", 436, 511, 208, 243],
  ["images/lian3(w247h281).png", 473, 583, 281, 247],
  ["images/lian4(w232h319).png", 485, 721, 232, 319],
  ["images/lian5(w394h199).png", 937, 525, 394, 199],
  ["images/lian6(w172h152).png", 326, 450, 172, 152],
  ["images/lian7(w180h228).png", 455, 491, 180, 228],
  ["images/lian8(w348h328).png", 799, 767, 348, 328],
  ["images/lian9(w374h154).png", 570, 547, 374, 154],
  ["images/lian10(w320h393).png", 680, 691, 320, 393],
  ["images/lian11(w251h147).png", 591,543, 251, 147],
  // ["images/lian12(w245h145).png", 245, 145],
  // ["images/lian13(w232h175).png", 232, 175],
  // ["images/lian14(w430h363).png", 430, 363],
  // ["images/lian15(w292h186).png", 292, 186],
  // ["images/lian16(w160h163).png", 160, 163],
  // ["images/lian17(w137h205).png", 137, 205],
  // ["images/lian18(w193h216).png", 193, 216]
]

const TALK_TEXT = [
  "你来打我啊",
  "那又怎么样",
  "你开心就好",
  "我们不一样",
  "你能奈我何",
  "你再打一次",
  "一边玩儿去",
  "放马过来啊",
  "你给我住手",
  "我觉得不行",
  "你好直接哦",
  "看有谁理你",
  "来单挑啊",
  "你个单身狗",
  "看我的表情",
  "有种再来啊",
  "不要太嚣张",
  "制杖你走开",
  "开始你的表演",
  "有请下一位"
]

const IMG_SCALE = 3

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}


export default class EnemyFrame extends Animation {
  constructor() {
    let src_id = rnd(0, ENEMY_FRAME_IMG_SRCS.length)
    let src = ENEMY_FRAME_IMG_SRCS[src_id][0]
    super(src, ENEMY_FRAME_IMG_SRCS[src_id][1] / IMG_SCALE, ENEMY_FRAME_IMG_SRCS[src_id][2] / IMG_SCALE)
    this.enemyX = this.x + ENEMY_FRAME_IMG_SRCS[src_id][3] / IMG_SCALE - 50
    this.enemyY = this.y + ENEMY_FRAME_IMG_SRCS[src_id][4] / IMG_SCALE - 50
  }

  init() {
    let src_id = rnd(0, ENEMY_FRAME_IMG_SRCS.length)
    this.img.src = ENEMY_FRAME_IMG_SRCS[src_id][0]

    this.width = ENEMY_FRAME_IMG_SRCS[src_id][1] / IMG_SCALE
    this.height = ENEMY_FRAME_IMG_SRCS[src_id][2] / IMG_SCALE
    this.x = rnd(0, window.innerWidth - this.width)
    this.y = rnd(80, window.innerHeight - this.height)

    this.enemyX = this.x + ENEMY_FRAME_IMG_SRCS[src_id][3] / IMG_SCALE - 50
    this.enemyY = this.y + ENEMY_FRAME_IMG_SRCS[src_id][4] / IMG_SCALE - 50
    this.visible = true
    this.talkShow = true
    let tid = rnd(0, TALK_TEXT.length)
    this.talk = {
      "text": TALK_TEXT[tid],
      "x": this.x,
      "y": this.y - 10,
    }

  }
 
  // 每一帧更新子弹位置
  update() {
    if (!this.visible) {
      databus.removeEnemyFrame(this)
      this.talkShow = false
    }
  }

  drawToCanvas(ctx){
    super.drawToCanvas(ctx)
    this.drawTalk(ctx)
  }

  drawTalk(ctx){
    if (this.talkShow){
      ctx.fillStyle = "#ff00ff"
      ctx.font = "20px Arial"

      ctx.fillText(
        this.talk.text,
        this.talk.x,
        this.talk.y
      )
    }
  }


}