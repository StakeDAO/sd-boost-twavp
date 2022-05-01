import { readFileSync } from 'fs';
import path from 'path';

import * as sdBoost from './sd-boost';
import * as sdBoostTWAVP from './sd-boost-twavp';

const strategies = {
  'sd-boost': sdBoost,
  'sd-boost-twavp': sdBoostTWAVP
};

Object.keys(strategies).forEach(function (strategyName) {
  let examples = null;
  let schema = null;
  let about = '';

  try {
    examples = JSON.parse(
      readFileSync(path.join(__dirname, strategyName, 'examples.json'), 'utf8')
    );
  } catch (error) {
    examples = null;
  }

  try {
    schema = JSON.parse(
      readFileSync(path.join(__dirname, strategyName, 'schema.json'), 'utf8')
    );
  } catch (error) {
    schema = null;
  }

  try {
    about = readFileSync(
      path.join(__dirname, strategyName, 'README.md'),
      'utf8'
    );
  } catch (error) {
    about = '';
  }
  strategies[strategyName].examples = examples;
  strategies[strategyName].schema = schema;
  strategies[strategyName].about = about;
});

export default strategies;
