var express = require('express');
var router = express.Router();


var db = require("../model/bill");

/* GET home page. */
router.all('/bills', async function(req, res, next) {
  var bills =await db.bills();

  var columns = {term:"屆別",
    sessionPeriod:"會期",
    sessionTimes:"會次",
    meetingTimes:"臨時會會次",
    billNo:"議案編號",
    billName:"提案名稱",
    billOrg:"提案單位/委員",
    billProposer:"提案人(委員或黨團)",
    billCosignatory:"連署人",
    billStatus:"議案狀態",
    pdfUrl:"關係文書pdf檔案下載位置",
    docUrl:"關係文書doc檔案下載位置",
    selectTerm:"屆別期別篩選條件"
  };
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send({ title: '法案清單', bills , columns});
});

router.all('/questions', async function(req, res, next) {
  var questions = await db.questions();

  var columns = {
    term:"屆期",
    sessionPeriod:"會期",
    meetingDate:"會議日期(西元年)",
    meetingTime:"會議時間",
    meetingTypeName:"主辦單位",
    meetingName:"會議名稱",
    meetingContent:"會議事由",
    legislatorName:"委員姓名",
    areaName:"選區名稱",
    speechStartTime:"委員發言時間起",
    speechEndTime:"委員發言時間迄",
    speechRecordUrl:"發言紀錄網址",
    videoLength:"影片長度",
    videoUrl:"影片網址",
    selectTerm:"屆別期別篩選條件"
  };
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send({ title: '質詢清單', questions , columns});

});

module.exports = router;
