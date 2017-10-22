var fs = require('fs');

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        prop: 'some property',
        pkg: grunt.file.readJSON('package.json'),
        running: {
            taskOwner: 'Bruno',
            src: 'js/somefile.js',
            dest: 'js/somefileother.js',
            options: {
                comment: '/* <%= pkg.author %> */'
            }
        },
        multi: {
            config1: {
                message: 'This is congig1',
                files: [{
                    src: "js/somefile.js",
                    dest: "js/someotherfile1.js"
                }]
            },
            config2: {
                message: 'This is congig2',
                files: [{
                    src: "js/somefile.js",
                    dest: "js/someotherfile2.js"
                }]
            }
        }
    });

    //grunt
    grunt.registerTask('default', 'The default task', function () {
        grunt.log.writeln('grunt running with default task...');
    });

    //grunt running:a-basic-task
    grunt.registerTask('running', 'A running task', function (arg1) {
        var done = this.async(),
            comment = this.options().comment;
        grunt.config.requires('running.taskOwner');
        grunt.log.writeln('grunt running... arg1:', arg1);
        grunt.log.writeln('grunt running... this.name:', this.name);
        grunt.log.writeln('grunt running... config.get:', grunt.config.get('running.taskOwner'));
        grunt.log.writeln('running.src:', grunt.config.get('running.src'));
        grunt.log.writeln('running.dest:', grunt.config.get('running.dest'));

        fs.readFile(grunt.config.get('running.src'), function (error, data) {

            var text = comment + '\n' + data;
            fs.writeFile(grunt.config.get('running.dest'), text, function (err) {
                if (err) {
                    grunt.log.writeln('error:');
                    throw err;
                }
                grunt.log.writeln('The file has been saved!');
                done();
            });

        });
    });

    //grunt multi:config1
    // grunt multi:config2
    //grunt multi
    grunt.registerMultiTask('multi', 'An example multi task', function () {
        grunt.log.writeln(this.data.message);

//        this.files.forEach(function(file){
        this.data.files.forEach(function (file) {
            grunt.log.writeln(JSON.stringify(file));
            grunt.log.writeln(file.src, file.dest);
        });
    });


    grunt.registerTask('run', 'Running all the tasks', ['default', 'running:a-basic-task']);
}

