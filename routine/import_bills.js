
var request = require("request");
var knex = require("../model/db.js");

request("https://data.ly.gov.tw/odw/ID20Action.action?term=10"+
    "&meetingTimes=&billName=&billOrg=&billProposer=&billCosignatory=&fileType=json",
    async function(req,res,body){    
    // console.log(body.dataList);
    var start = body.indexOf("{"), end = body.lastIndexOf("}");
    var datas = JSON.parse(body.substring(start,end+1)).dataList;
    
    for(var i = 0 ; i < datas.length ;++i){
        var item  = datas[i];
        console.log(item);
        try{
            await knex('bills').insert({ 
                term:item.term,
                sessionPeriod:item.sessionPeriod,
                sessionTimes:item.sessionTimes,
                meetingTimes:item.meetingTimes,
                billNo:item.billNo,
                billName:item.billName,
                billOrg:item.billOrg,
                billProposer:item.billProposer,
                billCosignatory:item.billCosignatory,
                billStatus:item.billStatus,
                pdfUrl:item.pdfUrl,
                docUrl:item.docUrl,
                selectTerm:item.selectTerm,
            });
        }catch(ex){

        }
    }
    console.log("end");
    knex.destroy();

});

