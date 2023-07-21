#!/usr/bin/env node

import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('test file.json', () => {
  const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual1).toEqual(readFile('expect.txt'));
});

test('test file.yml', () => {
  const actual2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual2).toEqual(readFile('expect.txt'));
});

test('test file.yaml', () => {
  const actual3 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(actual3).toEqual(readFile('expect.txt'));
});
