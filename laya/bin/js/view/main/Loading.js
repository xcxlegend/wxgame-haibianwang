var __class=Laya.class;
/**Created by the LayaAirIDE*/
var Loading=(function(_super){

	function Loading(){
		Loading.__super.call(this);
		this.width = window.innerWidth
		this.height = window.innerHeight

		if (IN_WX){
			this.button = wx.createUserInfoButton({
				type: 'text',
				text: '获取用户信息',
				style: {
					top: 400,
					left: window.innerWidth / 2 - 50,
					width: 100,
					height: 50,
					lineHeight: 40,
					backgroundColor: '#000000',
					color: '#ffffff',
					textAlign: 'center',
					fontSize: 16,
					borderRadius: 4
				}
			})
			this.button.onTap((res) => {
				console.log(res)
				window._globalData.isLogin = true
				window._globalData.userInfo = res
				WX.openTunnel()
			})
		}


		this.show = () => {
			console.log("show loading")
			if (IN_WX){
				this.button.style.hidden = false
				Laya.timer.loop(30, this, loop)
			}else{
				setTimeout(function() {
					loadUI(UIKEY_MENU)
				}, 300);
			}
		}

		this.hide = () => {
			console.log("hide loading")
			if (IN_WX){
				this.button.style.hidden = true
			}
		}

		function loop() {
			if (window._globalData.isLogin) //&& window._globalData.userData.loaded)
			{
				Laya.timer.clear(this, loop)
				loadUI(UIKEY_MENU)
			}
		}
	}

	__class(Loading,'view.main.Loading',_super);
	return Loading;
})(LoadingUI)