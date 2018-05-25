var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var LoadingUI=(function(_super){
		function LoadingUI(){
			
		    this.label_loading=null;

			LoadingUI.__super.call(this);
		}

		CLASS$(LoadingUI,'ui.main.LoadingUI',_super);
		var __proto__=LoadingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoadingUI.uiView);

		}

		LoadingUI.uiView={"type":"View","props":{"width":0,"height":0},"child":[{"type":"Label","props":{"visible":true,"var":"label_loading","text":"Loading","fontSize":24,"color":"#000000","centerY":0,"centerX":0,"bold":true}}]};
		return LoadingUI;
	})(View);
var MenuUI=(function(_super){
		function MenuUI(){
			
		    this.bg=null;
		    this.btn_play=null;
		    this.btn_rank=null;

			MenuUI.__super.call(this);
		}

		CLASS$(MenuUI,'ui.main.MenuUI',_super);
		var __proto__=MenuUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MenuUI.uiView);

		}

		MenuUI.uiView={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","top":0,"left":0}},{"type":"Image","props":{"var":"btn_play","skin":"icons/anniu.png","scaleY":0.3,"scaleX":0.3,"centerY":100,"centerX":0},"child":[{"type":"Image","props":{"x":100,"top":88,"skin":"icons/play.png","left":100}},{"type":"Label","props":{"top":94,"text":"开始游戏","left":200,"fontSize":60,"color":"#333333"}}]},{"type":"Image","props":{"top":80,"skin":"icons/logo.png","scaleY":0.3,"scaleX":0.3,"centerX":0}},{"type":"Image","props":{"var":"btn_rank","skin":"icons/paihang.png","scaleY":0.3,"scaleX":0.3,"centerX":-100,"bottom":100}}]};
		return MenuUI;
	})(View);
var PlayUI=(function(_super){
		function PlayUI(){
			
		    this.enemy=null;
		    this.shenti=null;
		    this.avatar=null;
		    this.face=null;
		    this.hitted=null;
		    this.label_talk=null;
		    this.label_score=null;
		    this.dlg_dead=null;
		    this.btn_alive=null;
		    this.btn_restart=null;
		    this.btn_rank=null;
		    this.label_alive_text=null;

			PlayUI.__super.call(this);
		}

		CLASS$(PlayUI,'ui.main.PlayUI',_super);
		var __proto__=PlayUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PlayUI.uiView);

		}

		PlayUI.uiView={"type":"View","props":{},"child":[{"type":"Box","props":{"visible":true,"var":"enemy","top":0,"left":0},"child":[{"type":"Image","props":{"var":"shenti","top":90,"skin":"images/lian/lian1(w230h191).png"},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"avatar","skin":"images/renlian.png"}},{"type":"Image","props":{"y":0,"x":0,"var":"face","skin":"images/biaoqing/biaoqing1.png"}},{"type":"Image","props":{"y":0,"x":0,"var":"hitted","skin":"images/shang/shang1.png"}}]},{"type":"Label","props":{"var":"label_talk","top":0,"text":"请对准脸","left":0,"fontSize":40,"color":"#333333"}}]},{"type":"Label","props":{"y":10,"x":30,"var":"label_score","text":"0","fontSize":24,"font":"SimHei","color":"#000003","bold":true}},{"type":"View","props":{"width":300,"var":"dlg_dead","height":200,"centerY":0,"centerX":0},"child":[{"type":"Button","props":{"var":"btn_alive","skin":"comp/button.png","right":0,"label":"续命一次","bottom":0}},{"type":"Button","props":{"y":0,"var":"btn_restart","skin":"comp/button.png","left":0,"label":"重新开始","bottom":0}},{"type":"Image","props":{"var":"btn_rank","skin":"icons/paihang.png","scaleY":0.3,"scaleX":0.3,"centerX":0,"bottom":0}},{"type":"Label","props":{"var":"label_alive_text","text":"剩余复活 3 次","fontSize":18,"color":"#333333","centerY":0,"centerX":0,"bold":true}}]}]};
		return PlayUI;
	})(View);
var RankUI=(function(_super){
		function RankUI(){
			
		    this.sp_rank_panel=null;
		    this.btn_back=null;

			RankUI.__super.call(this);
		}

		CLASS$(RankUI,'ui.main.RankUI',_super);
		var __proto__=RankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RankUI.uiView);

		}

		RankUI.uiView={"type":"View","props":{"width":0,"height":0},"child":[{"type":"Label","props":{"y":75,"x":164,"text":"排行榜","fontSize":16,"color":"#000000","centerX":0}},{"type":"Sprite","props":{"var":"sp_rank_panel"}},{"type":"Image","props":{"var":"btn_back","skin":"icons/anniu.png","scaleY":0.3,"scaleX":0.3,"centerX":0,"bottom":10},"child":[{"type":"Label","props":{"text":"返回","fontSize":60,"color":"#333333","centerY":0,"centerX":0}}]}]};
		return RankUI;
	})(View);