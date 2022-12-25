
var knex = require("./db")

var model = {
    bills: async()=>{
        //term
        //sessionPeriod
        //sessionTimes
        //meetingTimes
        //billNo
        //billName
        //billOrg
        //billProposer
        //billCosignatory
        //billStatus
        //pdfUrl
        //docUrl
        //selectTerm
        var bills = await knex("bills").where( 'billOrg', '本院時代力量黨團').orderBy("billNo","desc").select();
        return bills;
    },
    async questions(){
        return knex("questions").orderBy("meetingDate","desc").select();  
    },
    async nocontentBill(){
        var bills = await knex("bills").where( 'billOrg', '本院時代力量黨團').whereNull("rawDocContent").select();
        return bills;
    },
    update(billNo,body){
        return knex("bills").where('billNo',billNo).update(body);;
    },
    countNpp:async ()=>{
        var count = await knex("bills").where( 'billOrg', '本院時代力量黨團').count();
        return count;
    },
    queryNpp:async ()=>{
        var count = await knex("bills").where( 'billOrg', '本院時代力量黨團').select();
        return count;
    },
    close:()=>{
        knex.destroy();
    }
};

module.exports  = model ;
