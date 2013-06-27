# grunt-firefoxos

<img src="http://v14d.com/grunt-firefoxos.jpg" alt="grunt-firefoxos" />

**An expanding toolkit of [Grunt](http://gruntjs.com) tasks that are aimed at making your Firefox OS development even more enjoyable!**

Note: This project is a work in progress...

#### Contents
* [Application Tasks](#application-tasks)
  * [fxos-init](#fxos-init)
  * [fxos-examples](#fxos-examples)
  * [fxos-deploy](#fxos-deploy)
* [Utilities](#utilities)
  * [fxos-screenshot](#fxos-screenshot)
  * [fxos-env](#fxos-env)
  * [fxos-icon](#fxos-icon)
  * [fxos-manifest](#fxos-manifest)
* [Simulator](#simulator)
  * [fxos-sim](#fxos-sim)
* [Getting Started](#getting-started)
* [Configuration](#configuration)

## Tasks & Features

### Application Tasks

#### fxos-init
__CLI:__ `grunt fxos-init`

Helps you initialize a new Firefox OS Application. This is perfect if you are starting a brand new project.
This task will go through the steps of creating your application directory, generating a `.webapp` manifest file, and setting up other necessary files. 

#### fxos-examples

__CLI:__ `grunt fxos-examples` 

First time developing for Firefox OS or learning? Love experimenting with new APIs? This is for you!
An expanding list of application templates to help you quickly get started! 
This task will download the selected example and will even deploy it for you.
You can also create your own templates and [contribute back to the project](#).

### Deploy to device

#### fxos-deploy

__CLI:__ `grunt fxos-deploy`
Optional: `--path [file path]` to your application directory that includes the manifest file.

__Gruntfile:__ configure: `fxos.options.src`

Deploy an application folder to your Firefox OS device.
Push your application to the device. See [Configuration] for more details.

****

### Utilities

#### fxos-screenshot

__CLI__: `grunt fxos-screenshot`
Optional: `--path [file path]` - where to save the screenshot file

A quick way to take a screenshot from your Firefox OS device.


#### fxos-env

__CLI__: `grunt fxos-icon --icon file.png`

Run the dev environment check.


#### fxos-manifest

__CLI__: `grunt fxos-manifest`

Generate a [.webapp manifest](https://developer.mozilla.org/en-US/docs/Web/Apps/Manifest) file for your application.


#### fxos-icon

__CLI__: `grunt fxos-icon --icon file.png`
Optional: `--sizes 16,32,42`, `--path [file path]`

__Gruntfile__: `dist` and `sizes` are optional:
```
fxos: {
  options: {
    icon: {
      src: 'icon.png',
      dest: 'app/icons',
      sizes: '16,32,42'
    }
  }
}
```

Generate application icons from a file (png or svg). Default icon sizes: 16, 30, 32, 48, 60, 64, 128, 256.
Requires [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/).
See [node-gm getting started](https://github.com/aheckmann/gm#getting-started) for more details.
You can also add [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) or [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
to your workflow.


****

### Simulator

#### fxos-sim

__CLI__: `grunt fxos-sim`

Download and start the Firefox OS simulator! Note: ~60 mb download

****

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fxos --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fxos');
```

Now in your terminal run:
```
grunt fxos
```
**Make sure you get `>> All required tools available!` after you run this command.** 

If not, then please configure the required tools. 

__A Yeoman Generator is also available, use: `npm install -g generator-fxos` then: `yo fxos:app`__

## Configuration

Setup your application folder and other settings

```
fxos: {
  options: {
    src: "app"
    icon: {
      src: 'icon.png',
      dest: 'app/icons',
      sizes: '16,32,42'
    }
  }
}

```

### Settings

#### src
Type: `String`
Optional, path to your app directory

#### icon

##### icon.src
Type: `String`
Source file of the icon.

##### icon.dest
Type: `String`
Destination for the generated icons.

##### icon.sizes
Type: `String`
Comma-separated icon sizes.

## Support

Ask for help in IRC, in `#grunt` on Freenode.

## TODO

Windows support: run `fxos-env` to detect compatibility.

## License

MIT

© [Vlad Filippov](http://vladfilippov.com)
