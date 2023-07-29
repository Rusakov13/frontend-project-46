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

test('stylish test file.json', () => {
  const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual1).toEqual(readFile('stylish_expect.txt'));
});

test('stylish test file.yml', () => {
  const actual2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  expect(actual2).toEqual(readFile('stylish_expect.txt'));
});

test('stylish test file.yaml', () => {
  const actual3 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish');
  expect(actual3).toEqual(readFile('stylish_expect.txt'));
});

test('plain test file.json', () => {
  const actual4 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual4).toEqual(readFile('plain_expect.txt'));
});

test('plain test file.yml', () => {
  const actual5 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(actual5).toEqual(readFile('plain_expect.txt'));
});

test('plain test file.yaml', () => {
  const actual6 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');
  expect(actual6).toEqual(readFile('plain_expect.txt'));
});
