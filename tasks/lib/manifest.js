'use strict';

exports.init = function(grunt) {
  var exports = {};

  exports.noteFields =
    ">> See [ https://developer.mozilla.org/en-US/docs/Web/Apps/Manifest ] for " +
    "other manifest.json fields. \n Such as 'appcache_path', 'locales', 'permissions'";

  /**
   * Manifest file contents
   * @param result
   * @returns {*}
   */
  exports.create = function(result) {
    var tpl = {
      "name": result.name,
      "version": result.version,
      "description": result.description,
      "launch_path": result.launch_path,
      "icons": {
        "16": "/images/logo16.png",
        "32": "/images/logo32.png",
        "48": "/images/logo48.png",
        "64": "/images/logo64.png",
        "128": "/images/logo128.png"
      },
      "fullscreen": result.fullscreen,
      "orientation": result.orientation,
      "installs_allowed_from": ["*"],
      "developer": {
        "name": result.developer__name,
        "url": result.developer__url
      },
      "default_locale": result.default_locale
    };

    if (result.cache_path && result.cache_path.lenght > 0) {
      tpl["cache_path"] = result.cache_path;
    }

    return JSON.stringify(tpl, null, 4);
  };


  /**
   * Question Schema
   * @type {Array}
   */
  exports.schema = [
      {
        name: 'name',
        message: 'App Name',
        required: true,
        default: 'My App'
      },
      {
        name: 'version',
        message: 'Manifest Version',
        default: '1.0'
      },
      {
        name: 'description',
        message: 'App Description',
        required: true,
        default: 'This app is just a test.'
      },
      {
        name: 'launch_path',
        message: 'Launch Path (required for packaged apps)',
        default: 'index.html'
      },
      {
        name: 'cache_path',
        message: 'Cache Manifest File (optional, path + file name)'
      },
      {
        type: "confirm",
        name: "fullscreen",
        message: "Fullscreen only",
        default: false
      },
      {
        name: 'orientation',
        type: 'list',
        message: 'Orientation',
        choices: [
          'portrait',
          'landscape',
          'portrait and landscape-secondary'
        ],
        default: 'portrait'
      },
      {
        name: 'developer__name',
        message: 'Your Name (Firefox Marketplace)'
      },
      {
        name: 'developer__url',
        message: 'Your Site (Firefox Marketplace)'
      },
      {
        name: 'default_locale',
        message: 'Manifest language',
        default: "en"
      }
  ];

  return exports;
};