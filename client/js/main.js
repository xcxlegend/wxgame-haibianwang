import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import EnemyFrame from "./npc/enemy_frame"

let ctx = canvas.getContext('2d')
let databus = new DataBus()
const FRAME_PER_SECOND = 60

let runtime = require('./runtime/index')
let openDataContext = wx.getOpenDataContext()

/**
 * 游戏主函数
 */
export default class Main {
constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.eventHandlers = []
    this.initEventHandler()

    this.gameinfo = new GameInfo()
    this.gameinfo.renderLoading(ctx)


    //登录
    runtime.handleLogin( () => {
      openDataContext.postMessage({
        type: 'rank',
      })
      this.ready()
    }, () => {
      console.log("login error")
    })

    //打开websocket信道长连接
    runtime.openTunnel()
    // this.restart()
  }

  initEventHandler() {
    // 点击敌人
    this.touchEnemyHandler = this.touchEventEnemyHandler.bind(this)
    // 进入主界面按钮
    this.touchGoReadyHandler = this.touchEventGoReadyHandler.bind(this)
    // 进入排行榜按钮
    this.touchRankHandler = this.touchEventRankHandler.bind(this)
    // 关闭排行榜按钮
    this.touchRankCloseHandler = this.touchEventRankCloseHandler.bind(this)
    // 开始按钮
    this.touchStartHandler = this.touchEventStartHandler.bind(this)

    // 重新开始
    this.touchHandler = this.touchEventRestartHandler.bind(this)
    this.eventHandlers.push(this.touchEnemyHandler)
    this.eventHandlers.push(this.touchGoReadyHandler)
    this.eventHandlers.push(this.touchRankHandler)
    this.eventHandlers.push(this.touchRankCloseHandler)
    this.eventHandlers.push(this.touchStartHandler)

  }

  clearAllEvent() {
    this.eventHandlers.forEach( (e) => {
      canvas.removeEventListener(
        'touchstart',
        e
      )
    })
  }



  ready() {
    console.log("ready")

    // Must pause = true
    this.pause()

    // clear event
    this.clearAllEvent()

    // render 
    this.gameinfo.renderStartMenu(ctx)

    // button event
    canvas.addEventListener('touchstart', this.touchStartHandler)
    canvas.addEventListener('touchstart', this.touchRankHandler)
  }

  touchEventRankHandler(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.rankBtnArea
    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY) {
      // console.log(e)
      this.showRank()
    }
  }

  pause() {
    databus.pause = true
  }

  showRank() {

    this.pause()
    this.clearAllEvent()
    
    
    // console.log("show rank")
    this.gameinfo.renderRankFrame(ctx, openDataContext)

    canvas.addEventListener('touchstart', this.touchRankCloseHandler)
  }

  touchEventRankCloseHandler(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.closeBtnArea
    // if (x >= area.startX
    //   && x <= area.endX
    //   && y >= area.startY
    //   && y <= area.endY) {
      this.ready()
    // }
  }

  touchEventStartHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.btnArea
    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY){
      // console.log(e)
      this.restart()
    }
  }

  restart() {

    this.clearAllEvent()
    databus.reset()

    this.bg = new BackGround(ctx)
    // this.player = new Player(ctx)
    
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (databus.enemyFrame.length > 0) return;
    this.clearAllEvent()

    let enemy = databus.pool.getItemByClass('enemy', Enemy)
    let enemyFrame = databus.pool.getItemByClass('enemyFrame', EnemyFrame)
    enemyFrame.init()
    enemy.init(enemyFrame)
    databus.enemys.push(enemy)
    databus.enemyFrame.push(enemyFrame)
    databus.hitFrame = databus.frame
    canvas.addEventListener('touchstart', this.touchEnemyHandler)
    databus.startFrame = databus.frame
    databus.duration = this.getDuration()
  }

  // 获取显示时间
  getDuration(){
    return databus.score > 0 ? FRAME_PER_SECOND - parseInt(3 * Math.log(databus.score) / Math.log(10)) * 3 : FRAME_PER_SECOND
  }

  touchEventEnemyHandler(e){
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (databus.enemys.length == 0) { return }
      let enemy = databus.enemys[0]
      if (x >= enemy.x
        && x <= enemy.x + enemy.width
        && y >= enemy.y
        && y <= enemy.y + enemy.height)
      {
        this.music.playExplosion()
        enemy.hit()
        databus.score += 1
        canvas.removeEventListener(
          'touchstart',
          this.touchEnemyHandler
        )
        databus.startFrame = 0
        databus.lastHitFrame = databus.frame
      }
  }
 
  touchEventGoReadyHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.readyBtnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY){
        this.ready()
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventRestartHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  gameOver () {
    databus.gameOver = true
    this.clearAllEvent()
    databus.enemys.
      concat(databus.enemyFrame).
      forEach((item) => {
        item.visible = false
        item.update()
      })
    this.uploadGameResult()

    this.gameinfo.renderGameOver(ctx, databus.score)

    canvas.addEventListener('touchstart', this.touchHandler)
    canvas.addEventListener('touchstart', this.touchGoReadyHandler)
  }


  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
   
    if (databus.pause) return;

    // 游戏结束停止帧循环
    if (databus.gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)

    databus.enemyFrame.forEach((item) => {
      item.drawToCanvas(ctx)
    })

    databus.enemys.forEach((item) => {
        item.drawToCanvas(ctx)
    })

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)
    
  }



  uploadGameResult() {
    if (window._globalData.isLogin && databus.score > 0){
       
      openDataContext.postMessage({
        type: 'set_score',
        score: databus.score
      })

    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    if (databus.pause)
      return;

    if (databus.enemys.length > 0 ){
      if (databus.startFrame > 0 && databus.startFrame + databus.duration < databus.frame) {
        this.gameOver()
        return
      }
    }

    databus.enemys.
      concat(databus.enemyFrame).
      forEach((item) => {
        item.update()
    })

    this.enemyGenerate()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++
    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
