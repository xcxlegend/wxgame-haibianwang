const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

wx.onMessage(data => {
  console.log(data)
  switch (data.type) {
    case "rank": 
      console.log("rank:")
      wx.getFriendCloudStorage({
        keyList: ["score"],
        success: (e) => {
          console.log(e)
          showRank(e)
        }
      })
    case "set_score":
      updateScore(data.score)
    break
  }
})

function showRank(e) {
  let rank = []
  let sharedCanvas = wx.getSharedCanvas()
  let ctx = sharedCanvas.getContext('2d')

  ctx.fillStyle = "#ffffff"
  ctx.font = "12px Arial"
  e.data.forEach( (item, i) => {
    
    let nick = item.nickname
    let score = 0
    item.KVDataList.forEach( (kv) => {
      if (kv.key == "score") {
        score = parseInt(kv.value) || 0
      }
    })
    rank.push({"nickname": nick, "score": score})

    ctx.fillText(
      nick,
      0,
      100 + 30 * i
    )

    ctx.fillText(
      score,
      300,
      100 + 30 * i
    )
  })
  
}

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
  getScore((e) => {
    // console.log(e)
    let old = 0
    if (e.KVDataList.length > 0){
      e.KVDataList.map( (item) => {
        if (item.key == "score"){
          old = item.value
        }
      })
    }

    // console.log("upadte score:", old, score)
    if (score <= old) {
       return
    }

    let kvdata = [{ key: "score", value: score + '' }]
    // console.log(kvdata)
    wx.setUserCloudStorage({
      KVDataList: kvdata,
      success: (e) => {
        // console.log("setUserCloudStorage", e)
      },
      fail: (msg) => { console.log('fail', msg) }
    })
  })
}


function drawRank() {

}