#!/usr/bin/env node
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parser from './parsers.js';
import tree from './differenceFile.js';
import stylish from './stylish.js';

const getPath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const getExtension = (file) => path.extname(file).slice(1);

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = getPath(filepath1);
  const absolutePath2 = getPath(filepath2);

  const obj1 = parser(readFileSync(absolutePath1, 'utf-8'), getExtension(filepath1));
  const obj2 = parser(readFileSync(absolutePath2, 'utf-8'), getExtension(filepath2));

  const result = tree(obj1, obj2);
  return stylish(result);
};

export default genDiff;
