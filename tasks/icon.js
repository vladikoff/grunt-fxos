'use strict';

module.exports = function (grunt) {
  var fs = require('fs');
  var gm = require('gm');

  var iconLib = require('./lib/icon').init(grunt);

  grunt.registerTask('fxos-icon', 'Generate 5 app icons from a given svg or png.', function () {
    // async task
    var done = this.async();

    // icon file
    var icon = null;
    var iconSizes = [16, 30, 32, 48, 60, 64, 128, 256];
    // fxos Gruntfile config
    var fxConf = grunt.config('fxos');

    // if there are options and an icon
    if (fxConf && fxConf.options && fxConf.options.icon && fxConf.options.icon.src) {
      icon = fxConf.options.icon.src;
      // if icon sizes specified
      if (fxConf.options.icon.sizes) {
        // set icon sizes from grunt config options
        iconSizes = [].concat(fxConf.options.sizes.split(','));
      }
    }
    // else use --icon
    else {
      // get CLI option for icon
      icon = grunt.option('icon');
      var sizes = grunt.option('sizes');
      if (sizes) {
        // set icon list from --sizes
        iconSizes = [].concat(sizes.split(','));
      }
    }

    // if such exists
    if (icon) {
      // if file exists
      fs.exists(icon, function (exists) {
        if (exists) {
          var icons = {};
          // destination icon path
          var savePath = iconLib.savePath();

          grunt.log.writeln('Writing icons to: ' + savePath);

          iconSizes.forEach(function(size, i) {
            // save anything to png
            var filePath = savePath + 'icon' + size + '.png';
            icons[size] = filePath;

            // perform gm resize
            gm(icon)
              .resize(size, size)
              .noProfile()
              // write to the generated path
              .write(filePath, function (err) {
                if (!err) {
                  // collect all generated icons, to have an array of paths for the manifest

                  // if last icon
                  if (iconSizes.length - 1 === i) {
                    grunt.log.ok('Done!');
                    grunt.log.ok('Add this to manifest.webapp:');
                    console.log('icons: ' + JSON.stringify(icons, null, 4));
                    done(true);
                  }

                } else {
                  grunt.fail.warn('Failed to resize the icons');
                  grunt.log.write(err);
                  done(false);
                }
            });
          });
        }
        // else failed to find this file
        else {
          grunt.fail.warn('Icon file not found at: ' + icon + ' . \n');
          done(false);
        }
      });
    }
    // else failed to provide args
    else {
      grunt.fail.warn('Usage: `grunt fxos-icon --icon file.png` or configured Gruntfile. \n');
      done(false);
    }

  });

};
