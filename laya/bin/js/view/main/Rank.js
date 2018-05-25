var __class=Laya.class;

/**Created by the LayaAirIDE*/
	var Rank=(function(_super){
		function Rank(){
			Rank.__super.call(this);
			
			this.width = window.innerWidth
			this.height = window.innerHeight

			this.btn_back.on(laya.events.Event.CLICK, this, onBtnBackClick)

			function onBtnBackClick(){
				loadUI(UIKEY_MENU)
			}

			this.show = () => {
				console.log("show menu")
				// Laya.stage.bgColor = "#000000"
				WX.getRank()
				this.sp_rank_panel.visible = true
				Laya.timer.loop(1000, this, loop, null, true)
			}

			this.hide = () => {
				console.log("hide")
				// Laya.stage.bgColor = "#FFFFFF"
				Laya.timer.clear(this, loop)
			}

			function loop() {
				console.log("loop")
				try {
					var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
					console.log(rankTexture, rankTexture.width, rankTexture.height)
					this.sp_rank_panel.graphics.drawTexture(rankTexture, 24, 55, rankTexture.width, rankTexture.height);
				} catch (error) {
					console.log(error)
				}
				
			}

		}

		__class(Rank,'view.main.Rank',_super);
		return Rank;
	})(RankUI)