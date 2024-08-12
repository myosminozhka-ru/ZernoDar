"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./src/views/**/*.html",
                "./src/views/pages/*.html"
            ],
            dist: "./dist/",
            watch: [
                "./src/blocks/**/*.html",
                "./src/views/**/*.html"
            ]
        },
        styles: {
            src: "./src/styles/main.{scss,sass}",
            srcVue: "./vue/dist/assets/index.css",
            dist: "./dist/styles/",
            srcLibs: "./src/styles/libs/*.css",
            distLibs: "./dist/styles/libs",
            srcSass: "./src/styles/helpers/*.scss",
            distSass: "./vue/src/assets/styles/helpers",
            distVue: "./dist/styles",
            watch: [
                "./src/blocks/**/*.{scss,sass}",
                "./src/styles/**/*.{scss,sass}"
            ]
        },
        scripts: {
            src: "./src/js/main.js",
            srcVue: "./vue/dist/assets/index.js",
            dist: "./dist/js/",
            srcLibs: "./src/js/libs/*.js",
            distLibs: "./dist/js/libs",
            distVue: "./dist/js",
            watch: [
                "./src/blocks/**/*.js",
                "./src/js/**/*.js"
            ]
        },
        images: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"
        },
        sprites: {
            src: "./src/img/sprites/*.svg",
            dist: "./dist/img/sprites/",
            watch: "./src/img/sprites/*.svg"
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2,ttf}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2,ttf}"
        },
        favicons: {
            src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
            dist: "./dist/img/favicons/",
        },
        gzip: {
            src: "./src/.htaccess",
            dist: "./dist/"
        },
        video: {
            src: "./src/video/*",
            dist: "./dist/video/",
            watch: "./src/video/*"
        },
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons", "video"]),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons", "gzip", "video"]));

export default development;