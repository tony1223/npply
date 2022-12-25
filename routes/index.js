var express = require('express');
var router = express.Router();


var db = require("../model/bill");

/* GET home page. */
router.get('/', async function(req, res, next) {
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
  
  res.render('index', { title: '法案清單', bills , columns});
});

module.exports = router;
