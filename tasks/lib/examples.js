exports.init = function(grunt) {
  // application examples
  const EXAMPLES = [
    {
      name: 'boilerplate',
      title: 'Boilerplate App - Includes a lot of API demos',
      git: 'https://github.com/robnyman/Firefox-OS-Boilerplate-App.git'
    },
    {
      name: 'blank',
      title: 'Blank - Basic template with a manifest file',
      git: 'https://github.com/robnyman/Firefox-OS-Blank-Example'
    },
    {
      name: 'persona',
      title: 'Mozilla Persona integration example',
      git: 'https://github.com/vladikoff/FirefoxOS-Persona-Example',
      extract: 'app'
    },
    {
      name: 'dropbox',
      title: 'Dropbox - a basic app with Dropbox integration',
      git: 'https://github.com/vladikoff/FirefoxOS-Dropbox',
      extract: 'app'
    },
    {
      name: 'memory',
      title: 'Memory Match - The firm favourite Memory Match puzzle game.',
      author: 'Andrew Chilton https://github.com/chilts',
      git: 'https://github.com/chilts/fxos-memory-match.git',
      extract: 'public'
    }
  ];

  // names of application examples
  const EXAMPLE_NAMES = grunt.util._.map(EXAMPLES, 'name');

  exports.schema = [
    {
      name: 'example',
      type: 'list',
      message: 'Select an example you would like to download and try out',
      choices: EXAMPLE_NAMES
    }
  ];

  exports.examples = EXAMPLES;
  exports.names = EXAMPLE_NAMES;

  return exports;
};
