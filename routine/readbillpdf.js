
var request = require("request");
var billdb = require("../model/bill.js");
const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();
var fs = require("fs");

(async function(){
    var bills = await billdb.nocontentBill();
    var index = 0;
    for(var i = 0 ; i < bills.length ;++ i){
        (async function(ind){
            var bill = bills[ind];
            request({encoding :null,url:bill.docUrl},async function(req,res,body){

                try{
                    const extracted = await extractor.extract(res.body);
                    await billdb.update(bill.billNo,{"rawDocContent":extracted.getBody()});
                    console.log(bill.billNo);
                }catch(ex){
                    await billdb.update(bill.billNo,{"rawDocContent":"error"});
                    console.log(bill.billNo+":error");

                }
                index++;
                console.log(index +" / "+ bills.length);
            });
        })(i)
        await new Promise(resolve => setTimeout(resolve, 1000));

    }
})();