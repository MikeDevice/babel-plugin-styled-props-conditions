import path from 'path';
import pluginTester from 'babel-plugin-tester';
import styledPropsConditions from '../../src';

pluginTester({
  plugin: styledPropsConditions,
  fixtures: path.join(__dirname, 'fixtures'),
});
