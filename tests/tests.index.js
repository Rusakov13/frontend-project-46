#!/usr/bin/env node

import fs from 'fs';
import { path, dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from 'jest';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test #1', () => {
  const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual1).toEqual(readFile('expect.txt'));
});
