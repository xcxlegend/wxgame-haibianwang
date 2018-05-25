var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var WebGL = laya.webgl.WebGL;
var __class=Laya.class;

//初始化微信小游戏
Laya.MiniAdpter.init();
const modes = "showall"


const IN_WX = false

if (IN_WX) {
	var qcloud = require('./libs/wafer2-client-sdk/index')
	var config = require('./config')
	qcloud.setLoginUrl(config.service.loginUrl)
}

//程序入口
// console.log(Laya.Browser.pixelRatio)
window.innerWidth = 375
window.innerHeight = 667
Laya.init(window.innerWidth, window.innerHeight, WebGL);
Laya.stage.alignV = Laya.Stage.ALIGN_TOP
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
Laya.stage.bgColor  = "#ffffff";
Laya.stage.scaleMode = modes;
Laya.stage.screenMode = "vertical";



//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

function beginLoad(){
	Laya.loader.load([
		"res/atlas/comp.atlas",
		"res/atlas/images.atlas",
		"res/atlas/images/lian.atlas",
		"res/atlas/images/biaoqing.atlas",
		"res/atlas/images/shang.atlas",
		"res/atlas/icons.atlas",
	], Handler.create(null, onLoaded));
}

let UIStack = []
const UI_MODLES = {
	"loading": Loading,
	"play": Play,
	"menu": Menu,
	"rank": Rank,
}

window._globalData = {}

function loadUI(UI) {
	while (UIStack.length > 0) {
		let wd = UIStack.pop()
		wd.visible = false
		wd.hide()
		Laya.stage.removeChild(wd)
	}
	if (!(UI in window._globalData.static_active)){
		if (UI in UI_MODLES){
			window._globalData.static_active[UI] = new UI_MODLES[UI]()
		}
	}
	if (UI in window._globalData.static_active){
		let wd = window._globalData.static_active[UI]
		Laya.stage.addChild(wd)
		wd.show()
		wd.visible = true
		UIStack.push(wd)
	}
}

rnd = function (start, end) {
	return Math.floor(Math.random() * (end - start) + start)
}

const UIKEY_LOADING = "loading"
const UIKEY_PLAY = "play"
const UIKEY_MENU = "menu"
const UIKEY_RANK = "rank"


function initUIs() {
	window._globalData.static_active = {
		// loading : new Loading(),
		// play: new Play(),
		// menu: new Menu(),
		// rank: new rank(),
	}

	// for (let ui in window._globalData.static_active) {
		// Laya.stage.addChild(window._globalData.static_active[ui])
		// window._globalData.static_active[ui].visible = false
	// }
}

function onLoaded()
{	
	window._globalData = {
		tunnelStatus: 'unconnected', //只建立一个长连接websocket
		isLogin: false,
		userInfo: {}, //登录账号信息
		userData: {
			loaded: false,
			heart: 0,
		},
		openDataContext: WX.getOpenDataContext()
	};
	WX.Init(window._globalData)
	initUIs()
	loadUI(UIKEY_LOADING)

	WX.login(
		() => {
			WX.openTunnel()
		}
	)
	
}
