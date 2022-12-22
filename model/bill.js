
var knex = require("./db")

var model = {
    countNpp:async ()=>{
        var count = await knex("bills").where( 'billOrg', '本院時代力量黨團').count();
        return count;
    },
    queryNpp:async ()=>{
        var count = await knex("bills").where( 'billOrg', '本院時代力量黨團').select();
        return count;
    }
};

export default model ;
