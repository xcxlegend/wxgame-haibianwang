/**Created by the LayaAirIDE*/
	var Menu=(function(_super){
		function Menu(){
			Menu.__super.call(this);

			this.width = window.innerWidth
			this.height = window.innerHeight
 
			this.bg.width = this.width
			this.bg.height = this.height


			this.btn_play.on(laya.events.Event.CLICK, this, onBtnPlayClick)
			this.btn_rank.on(laya.events.Event.CLICK, this, onBtnRankClick)


			function onBtnPlayClick() {
				loadUI("play")
			}

			function onBtnRankClick() {
				loadUI("rank")
			}


			// function

			this.show = () => {
				console.log("show menu")
			}

			this.hide = () => {
				console.log("hide")
			}


		}

		__class(Menu,'view.main.Menu',_super);
		return Menu;
	})(MenuUI)