
var request = require("request");
var billdb = require("../model/bill.js");
const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();
var fs = require("fs");

(async function(){
    var bills = await billdb.bills();
    var index = 0;
    for(var i = 0 ; i < bills.length ;++ i){
        (async function(ind){
            var bill = bills[ind];
            var content = (bill.rawDocContent || "");
            var start = content.indexOf("案由：");
            var end = content.indexOf("提案人");
            if(start != -1){
//                console.log(bill.rawDocContent.substring(start,end));
                await billdb.update(bill.billNo,
                    {
                        "jsonDocContent": JSON.stringify({subject:bill.rawDocContent.substring(start,end)})
                    }
                );
            }
            try{
                // await billdb.update(bill.billNo,{"rawDocContent":extracted.getBody()});
                console.log(bill.billNo);
            }catch(ex){
                // await billdb.update(bill.billNo,{"rawDocContent":"error"});
                console.log(bill.billNo+":error");

            }
            index++;
            console.log(index +" / "+ bills.length);
        })(i)
        // await new Promise(resolve => setTimeout(resolve, 1000));

    }
})();
