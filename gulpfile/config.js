var src = "./app/assets";

module.exports = {
    scss: {
        files: [src + "/scss/**/*.scss", src + "/scss/**/**/*.scss"]
    },

    style: {
        files: [src+"/stylesheets/**/*.css", src+"/stylesheets/**/**/*.css"]
    },

    scripts: {
        files: [src+"/javascripts/*.js", src+"/javascripts/cans/*.js"]
    },

    scripts_dist: {
        files: [src+"/javascripts/dist/*.js", src+"/javascripts/dist/**/*.js"]
    },

    erb: {
        files: ["views/**/*.erb", "views/**/**/*.erb"]
    }
};