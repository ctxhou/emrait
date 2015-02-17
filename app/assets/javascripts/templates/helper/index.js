var hbs = require('hbsfy/runtime');

hbs.registerHelper('setIndex', function(value) {
    if (value == "rand"){
        this.index = Math.round(Math.random()*100000000); //I needed human readable index, not zero based        
    } else {
        this.index = value
    }
});

module.exports = hbs;
