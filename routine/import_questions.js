
const moment = require("moment");
var request = require("request");

//https://data.ly.gov.tw/odw/ID148Action.action?term=10&sessionPeriod=4&meetingDateS=110/10/01&meetingDateE=110/10/30&meetingTime=&legislatorName=&fileType=json

var knex = require("../model/db.js");

var getId = (item)=>{
    return item.meetingDate+","+item.meetingTime+","+item.speechStartTime;
};

var importDateSpeedch= async (datestart,name) =>{
    // https://data.ly.gov.tw/odw/ID148Action.action?term=10&meetingDateS=110/10/01&meetingDateE=110/10/30&meetingTime=&legislatorName=%E9%82%B1%E9%A1%AF%E6%99%BA&fileType=json
    return new Promise((resolve,rej)=>{

        var startYear = moment(datestart).add(-1911, 'years').format('YYYY').substring(1);
        var dateend = moment(datestart).add(5, 'months');
        var endYear =  moment(dateend).add(-1911, 'years').format('YYYY').substring(1);
        var url = "https://data.ly.gov.tw/odw/ID148Action.action?term=10&fileType=json"+
        "&meetingDateS="+startYear+moment(datestart).add(-1911, 'years').format('MMDD')+
        "&meetingDateE="+endYear+moment(dateend).add(-1911, 'years').format('MMDD') +
        "&legislatorName="+ encodeURIComponent(name);
        console.log(url);
        request(url,
            async function(req,res,body){    
            // console.log(body.dataList);
            var start = body.indexOf("{"), end = body.lastIndexOf("}");
            var datas = JSON.parse(body.substring(start,end+1)).dataList;
            
            for(var i = 0 ; i < datas.length ;++i){
                var item  = datas[i];
                console.log(item,getId(item));
                try{
                    await knex('questions').insert({ 
                        term:item.term,
                        questionid:getId(item),
                        sessionPeriod:item.sessionPeriod,
                        meetingDate:item.meetingDate,
                        meetingTime:item.meetingTime,
                        meetingTypeName:item.meetingTypeName,
                        meetingName:item.meetingName,
                        meetingContent:item.meetingContent,
                        legislatorName:item.legislatorName,
                        areaName:item.areaName,
                        speechStartTime:item.speechStartTime,
                        speechEndTime:item.speechEndTime,
                        speechRecordUrl:item.speechRecordUrl,
                        videoLength:item.videoLength,
                        videoUrl:item.videoUrl,
                        selectTerm:item.selectTerm,
                    });
                }catch(ex){

                }
            }
            console.log("end");
            resolve();
        });
    });
  
}

var importDateAllSpeedch = async (date) =>{
    var users = ["陳椒華","王婉諭","邱顯智"];
    for(var i = 0 ; i < users.length;++i){
        await importDateSpeedch(date,users[i]);
    }
}

(async ()=>{
    var item = await knex("questions").orderBy('meetingDate','desc').first(); 
    await importDateAllSpeedch( ( item && item.meetingDate ) || "2020-05-01");
    knex.destroy();
})();

