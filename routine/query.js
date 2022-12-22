

var bill = require("../model/bill.js");

(async function(){

    var count = await bill.queryNpp();
    console.log(count);




})();
