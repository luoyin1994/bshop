module.exports = function (grunt) {
    grunt.initConfig({//定义的任务
        watch: {
            jade: {
                files  : ['views/**'],
                options: {
                    livereload: true
                }
            },
            js  : {
                files  : ['public/**'],
                // tasks  : ['jshint'],//语法检查
                options: {
                    livereload: true
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file             : 'app.js',
                    args             : [],
                    ignoredFiles     : ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders   : ['./'],
                    debug            : true,
                    delayTime        : 1,
                    env              : {
                        PORT: 4000
                    },
                    cwd              : __dirname
                }
            }
        },

        concurrent: {
            tasks  : ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    })
    grunt.loadNpmTasks('grunt-contrib-watch')//有文件添加修改可以重新执行里边注册好的任务
    grunt.loadNpmTasks('grunt-nodemon')//实时监听app.js,改变自动重启app
    grunt.loadNpmTasks('grunt-concurrent')//慢任务的优化
    grunt.option('force', true)//不要因为警告而中断整个服务
    grunt.registerTask('default', ['concurrent'])//注册任务
}
