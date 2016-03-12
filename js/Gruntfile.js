module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transport: {
            options: {
                idleading: ''
            },
            all: {
                files: {  // 复制要打包的目录
                    '.build': ['**/*.js', '!*.js', '!node_modules/**/*.js','!liveAdmin/**/*.js']
                }
            }
        },
        concat: {
            main: {
                options: {
                    include: 'all'
                },
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['*/page/*.js','*/page/**/*.js'],  // 合并所有js/任意/page/的所有js文件
                    dest: '.build/',
                    ext: '.js'
                }]
            },
        },
        css_combo: {
            options: {
                debug: false,
                compress: true
            },
            css: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['css/page/*.css'],
                    dest: 'dist/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            video: {
                files: [
                    {expand: true, cwd: '.build/', src: ['!*/page/*-debug.js','!liveHome/page/*.js','!livePlay/page/*.js'], dest: 'dist/'}
                ]
            },
            live : {
                files: [
                    {expand: true, cwd: '.build/', src: ['!*/page/*-debug.js','!home/page/*.js','!play/page/*.js'], dest: 'dist/'}
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*<%= grunt.template.date(new Date(),"yyyy-mm-dd HH:MM:ss") %> zimin */\n',
                beautify: {
                    ascii_only: true  // 转义non-ascii字符
                }
            },
            video:{
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['home/page/*.js','home/page/**/*.js','play/page/*.js','play/page/**/*.js','!*/page/*-debug.js','!*/page/**/*-debug.js'], // 压缩除debug文件
                    dest: 'dist/',
                    ext: '.js'
                }]
            },
            live : {
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['liveHome/page/*.js','liveHome/page/**/*.js','liveplay/page/*.js','liveplay/page/**/*.js','!*/page/*-debug.js','!*/page/**/*-debug.js','!home/page/*.js','!play/page/*.js',"!active/page/*.js"], // 压缩除debug文件
                    dest: 'dist/',
                    ext: '.js'
                }]
            },
            active : {
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['active/page/*.js','active/page/**/*.js','!active/page/*-debug.js','!active/page/**/*-debug.js'], // 压缩除debug文件
                    dest: 'dist/',
                    ext: '.js'
                }]
            },
            xiyi : {
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['xiyi/page/*.js','xiyi/page/**/*.js','!xiyi/page/*-debug.js','!xiyi/page/**/*-debug.js'], // 压缩除debug文件
                    dest: 'dist/',
                    ext: '.js'
                }]
            },
            all : {
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['*/page/*.js','*/page/**/*.js','!*/page/*-debug.js','!*/page/**/*-debug.js'], // 压缩除debug文件
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },
        clean: {
            build: ['.build'],
            dist: ['dist']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-css-combo');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('css', ['css_combo', 'clean']);
    // grunt.registerTask('default', ['clean', 'transport', 'concat', 'uglify:video', 'copy', 'clean:build']);
    // grunt.registerTask('video', ['clean', 'transport', 'concat', 'uglify:live', 'copy', 'clean:build']);


    grunt.registerTask('default', ['clean', 'transport', 'concat', 'uglify:live', 'copy', 'clean:build']);

    grunt.registerTask('video', ['clean', 'transport', 'concat', 'uglify:video', 'copy', 'clean:build']);

    grunt.registerTask('active', ['clean', 'transport', 'concat', 'uglify:active', 'copy', 'clean:build']);
    grunt.registerTask('all', ['clean', 'transport', 'concat', 'uglify:all', 'copy', 'clean:build']);
    grunt.registerTask('xiyi', ['clean', 'transport', 'concat', 'uglify:xiyi', 'copy', 'clean:build']);
};
