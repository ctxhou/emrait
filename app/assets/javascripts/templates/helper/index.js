var hbs = require('hbsfy/runtime');

hbs.registerHelper('setIndex', function(value) {
    this.index = Math.random()*1000; //I needed human readable index, not zero based
});

module.exports = hbs;
