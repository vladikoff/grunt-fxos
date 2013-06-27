'use strict';

exports.init = function(grunt) {
    var exports = {};

    /**
    // the init-[name] of the template
    name: 'boilerplate',
    // a short title for this template to explain what it is
    title: 'Boilerplate App - Includes a lot of API demos',
    // git url to get the template
    git: 'https://github.com/robnyman/Firefox-OS-Boilerplate-App.git'
    // [optional] the git directory that has the template files
    directory: 'app'
    */

    var templates = [
        {
            name: 'boilerplate',
            title: 'Boilerplate App - Includes a lot of API demos',
            git: 'https://github.com/robnyman/Firefox-OS-Boilerplate-App.git'
        },
        {
            name: 'blank',
            title: 'Blank - Basic template with a manifest file',
            // TODO: update this
            git: 'https://github.com/robnyman/Firefox-OS-Boilerplate-App.git'
        },
        {
            name: 'dropbox',
            title: 'Dropbox - a basic app with Dropbox integration',
            git: 'https://github.com/vladikoff/FirefoxOS-Dropbox',
            directory: 'app'
        }
    ];

    exports.templates = templates;

    return exports;
};