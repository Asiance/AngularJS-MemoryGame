basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'test/lib/angular/angular.min.js',
  'example/example-controller.js',
  'src/angular-memory-game.js',
  'test/lib/angular/angular-mocks.js',
  'test/unit/directiveSpec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
