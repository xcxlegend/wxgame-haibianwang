let sharedCanvas = wx.getSharedCanvas()
let ctx = sharedCanvas.getContext('2d')
let nickname = ""

function drawRankList(data) {

  ctx.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, sharedCanvas.width - 48, sharedCanvas.height - 180);

  data.sort(function(a, b){
    return a.KVDataList[0].value > b.KVDataList[0].value
  })

  console.log(nickname)
  let myRank = 0

  data.forEach((item, index) => {
    // console.log(item)
   
    if (nickname == item.nickname) {
      myRank = index + 1
      console.log("my rank:", myRank)
    }

    if (index < 5){
    // ctx.drawImage(item.avatarUrl, 0, 0, 200, 400);  
    var image1 = wx.createImage()  
    image1.src = item.avatarUrl  
    // console.log(image1)
    
    let height = 20 + index * 60
    let score = item.KVDataList[0].value;

    let rank = index + 1

    let rankColor = "#ffffff"
    switch (rank){
      case 1:
        rankColor = "red"
        break
      case 2:
        rankColor = "yellow"
        break
      case 2:
        rankColor = "blue"
        break
    }

    ctx.font = "20px Georgia";
    ctx.fillStyle = rankColor
    ctx.fillText(rank, 20, height + 20);


    image1.onload = function () {
      ctx.drawImage(image1, 60, height, 40, 40)
    };



    ctx.font = "14px Georgia";
    ctx.fillStyle = "#ffffff"
    ctx.fillText(item.nickname, 120, height + 20);

    ctx.font = "14px Georgia";
    ctx.fillStyle = "#ffffff"
    ctx.fillText(score, 230, height + 20);
    }

    // ctx.drawImage(image1, 200, 200, 120, 120)
    // var image = new Laya.Image();
    // image.loadImage(item.avatarUrl, 0, 0, 40, 40);

    // var score = new Laya.Text();
    // score.text = item.KVDataList[0].value;
    // image.addChild(score)

    // var nickName = new Laya.Text();
    // nickName.text = item.nickname;
    // Laya.stage.addChild(image);

    // image.addChild(nickName);
    // image.x = 30
    // nickName.x = image.x + 60;
    // image.y = index * 80
    // score.x = image.x + 180;
  })
}


wx.onMessage((data) => {
  console.log("open:", data)
  switch (data.type) {
    case "rank":
      console.log("rank:")
      nickname = data.nickname
      getRank()
      break
    case "set_score":
      updateScore(data.score)
      break
  }
})

function getScore(call) {
  wx.getUserCloudStorage({
    keyList: ["score"],
    success: (e) => {
      call(e)
    },
    fail: (msg) => { console.log('fail', msg) }
  })
}


function updateScore(score) {
  let that = this
  getScore((e) => {
    // console.log(e)
    let old = 0
    if (e.KVDataList.length > 0) {
      e.KVDataList.map((item) => {
        if (item.key == "score") {
          old = item.value
        }
      })
    }

    console.log("upadte score:", old, score)
    if (score <= old) {
      return
    }

    let kvdata = [{ key: "score", value: score + '' }]
    // console.log(kvdata)
    wx.setUserCloudStorage({
      KVDataList: kvdata,
      success: (e) => {
        // console.log("setUserCloudStorage", e)
        getRank()
      },
      fail: (msg) => { console.log('fail', msg) }
    })
  })
}

function getRank() {
  wx.getFriendCloudStorage({
    keyList: ["score"],
    success: (e) => {
      // console.log(e)
      let data = e.data
      drawRankList(data)
    },
    fail: (e) => {
      console.log(e)
    }
  })
}