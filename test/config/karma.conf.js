basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/jquery-2.0.0.min.js',
  'lib/angular.min.js',
  '../example/example-controller.js',
  '../src/angular-memory-game.js',
  'lib/angular-mocks.js',
  'moduleSpec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
