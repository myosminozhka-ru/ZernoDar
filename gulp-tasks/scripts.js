"use strict";

import { paths } from "../gulpfile.babel";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import vueStr from "./vue.js";

const webpackConfig = require("../webpack.config.js"),
    argv = yargs.argv,
    production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

gulp.task("scripts", () => {
    gulp.src("./src/js/map.js")
    .pipe(gulp.dest("./dist/js/"))

    gulp.src(paths.scripts.srcLibs)
    .pipe(gulp.dest(paths.scripts.distLibs))
    
    return gulp.src(paths.scripts.src)
        // .pipe(webpackStream(webpackConfig), webpack)
        // .pipe(gulpif(production, rename({
        //     suffix: ".min"
        // })))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(debug({
            "title": "JS files"
        }))
        .pipe(browsersync.stream());
});