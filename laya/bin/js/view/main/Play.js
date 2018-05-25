/**Created by the LayaAirIDE*/
	var Play=(function(_super){
		function Play(){
			const FRAME_PER_SECOND = 60

			// const
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

			const SHENTI = [
				["images/lian/lian1(w230h191).png", 230, 191],
				["images/lian/lian2(w208h243).png", 208, 243],
				["images/lian/lian3(w247h281).png", 281, 247],
				["images/lian/lian4(w232h319).png", 232, 319],
				["images/lian/lian5(w394h199).png", 394, 199],
				["images/lian/lian6(w172h152).png", 172, 152],
				["images/lian/lian7(w180h228).png", 180, 228],
				["images/lian/lian8(w348h328).png", 348, 328],
				["images/lian/lian9(w374h154).png", 374, 154],
				["images/lian/lian10(w320h393).png", 320, 393],
				["images/lian/lian11(w251h147).png", 251, 147]
			]
			const FACE = [
				"images/biaoqing/biaoqing1.png",
				"images/biaoqing/biaoqing2.png",
				"images/biaoqing/biaoqing3.png",
				"images/biaoqing/biaoqing4.png",
				"images/biaoqing/biaoqing5.png",
				"images/biaoqing/biaoqing6.png",
				"images/biaoqing/biaoqing7.png",
				"images/biaoqing/biaoqing8.png",
				"images/biaoqing/biaoqing9.png",
				"images/biaoqing/biaoqing10.png"
			]
			const HITTED = [
				"images/shang/shang1.png",
				"images/shang/shang2.png",
				"images/shang/shang3.png",
				"images/shang/shang4.png",
				"images/shang/shang5.png",
				"images/shang/shang6.png",
				"images/shang/shang7.png"
			]


			Play.__super.call(this);

			// init

			SCALE = 0.3

			this.width = window.innerWidth
			this.height = window.innerHeight
			 
			// function

			this.playHitSound = () => {
				Laya.SoundManager.playSound("audio/hit2.mp3", 1)
			}

			this.show = () => {
				console.log("start play")
				this.dlg_dead.visible = false

				if (window._globalData.userData.heart != undefined){
					this.heart = window._globalData.userData.heart
				}else{
					this.heart = 3
				}

				this.genEnemy()
				Laya.timer.frameLoop(1, this, loop, null, true)
			}

			this.hide = () => {
				console.log("hide")
			}

			this.genEnemy = () => {
				let shentiID =  rnd(0, SHENTI.length)
				this.shenti.skin = SHENTI[shentiID][0]

				this.enemy.scaleX = SCALE
				this.enemy.scaleY = SCALE
			 
				this.enemy.x = rnd(0, this.width - this.shenti.width * SCALE)
				this.enemy.y = rnd(80, this.height - this.shenti.height * SCALE)

				let x = SHENTI[shentiID][1]
				let y = SHENTI[shentiID][2]

				this.avatar.top = y - this.avatar.height/2
				this.avatar.left = x - this.avatar.width/2

				let faceID = rnd(0, FACE.length)
				this.face.skin = FACE[faceID]
				this.face.top = this.avatar.top
				this.face.left = this.avatar.left
				
				let hitID = rnd(0, HITTED.length)
				this.hitted.skin = HITTED[hitID]
				this.hitted.top = this.avatar.top
				this.hitted.left = this.avatar.left
				
				if (this.score > 0){
					let talkID = rnd(0, TALK_TEXT.length)
					this.label_talk.text = TALK_TEXT[talkID]
					this.duration = FRAME_PER_SECOND - parseInt(3 * Math.log(this.score) / Math.log(10)) * 3
				}
				 
				this.face.visible = true
				this.hitted.visible = false
				this.enemy.visible = true
				
			}

			// flow

			this.reset = () => {
				this.score = 0
				this.frame = 0
				this.duration = -1
				this.over = false
				this.dlg_dead.visible = false
			}

			this.game_over = () => {
				this.over = true
				this.enemy.visible = false
				this.label_alive_text.text = "剩余复活 " + this.heart + " 次"
				if (this.heart <= 0){
					this.btn_alive.disabled = true
					this.upload_score()
				}
				this.dlg_dead.visible = true
			}

			this.alive = () => {
				this.heart--
				this.over = false
				this.dlg_dead.visible = false
				this.genEnemy()
			}


			function loop(){
				this.frame ++
				this.label_score.text = this.score

				if (this.over) return;

				if (this.duration > 0) {
					this.duration --
				}

				if (this.duration == 0){
					this.game_over()
				}
			}

			this.upload_score = () => {
				WX.uploadScore(this.score)
			}


			// bind

			this.face.on(Laya.Event.CLICK, this, onFaceClick)
			this.btn_restart.on(Laya.Event.CLICK, this, onBtnRestartClick)
			this.btn_alive.on(Laya.Event.CLICK, this, onBtnAliveClick)

			this.btn_rank.on(Laya.Event.CLICK, this, onBtnRankClick)


			// click
			function onBtnRankClick() {
				loadUI("rank")
			}
			
			function onFaceClick() {
				this.playHitSound()
				this.face.visible = false
				this.hitted.visible = true
				this.score++
				setTimeout(() => {
					this.enemy.visible = false
					this.genEnemy()
				}, 100)
			}

			function onBtnRestartClick() {
				// WX 
				if (this.score > 0){
					this.upload_score()
				}
				this.reset()
				this.genEnemy()
			}

			function onBtnAliveClick() {
				if (this.heart <= 0) return;
				this.alive()
			}


			this.heart = 0
			this.reset()

		}

		__class(Play,'view.main.Play',_super);
		return Play;
	})(PlayUI)