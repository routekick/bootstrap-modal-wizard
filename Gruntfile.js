module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.license %> License\n" +
                " */\n"
        },
        concat: {
            dist: {
                options: {
                    banner: "<%= meta.banner %>"
                },
                files: {
                    "dist/jquery.modal-wizard.js": "src/jquery.modal-wizard.js"
                }
            }
        },
        uglify: {
            dist: {
                src: ["dist/jquery.modal-wizard.js"],
                dest: "dist/jquery.modal-wizard.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },
        devserver: {
            base: "."
        },
        watch: {
            files: ["src/*"],
            tasks: ["build"]
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ["build", "devserver", "watch"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-devserver");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.registerTask("build", ["concat", "uglify"]);
    grunt.registerTask("default", ["build"]);
    grunt.registerTask("dev", ['concurrent:dev']);

}
