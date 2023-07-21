#!/usr/bin/env node
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parser from './parsers.js';

const getPath = (file) => path.resolve(process.cwd(), '__fixtures__', file);

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = getPath(filepath1);
  const absolutePath2 = getPath(filepath2);

  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);

  const obj1 = readFileSync(absolutePath1, 'utf-8');
  const obj2 = readFileSync(absolutePath2, 'utf-8');

  const parseObj1 = parser(obj1, extension1);
  const parseObj2 = parser(obj2, extension2);

  const dataKeys1 = _.keys(parseObj1);
  const dataKeys2 = _.keys(parseObj2);
  const sortedAllKeys = _.sortBy(_.union(dataKeys1, dataKeys2));

  const result = sortedAllKeys.map((key) => {
    if (_.has(parseObj1, key) && _.has(parseObj2, key)) {
      if (parseObj1[key] === parseObj2[key]) {
        return {
          key,
          value: parseObj1[key],
          type: 'unchanged',
        };
      }
      if (parseObj1[key] !== parseObj2[key]) {
        return {
          key,
          value1: parseObj1[key],
          value2: parseObj2[key],
          type: 'changed',
        };
      }
    }
    if (_.has(parseObj1, key) && !_.has(parseObj2, key)) {
      return {
        key,
        value: parseObj1[key],
        type: 'deleted',
      };
    }
    if (!_.has(parseObj1, key) && _.has(parseObj2, key)) {
      return {
        key,
        value: parseObj2[key],
        type: 'added',
      };
    }
    return result;
  });

  const finalResult = result.map((node) => {
    if (node.type === 'unchanged') {
      return `  ${node.key}: ${node.value}`;
    }
    if (node.type === 'changed') {
      return `- ${node.key}: ${node.value1}\n + ${node.key}: ${node.value2}`;
    }
    if (node.type === 'deleted') {
      return `- ${node.key}: ${node.value}`;
    }
    if (node.type === 'added') {
      return `+ ${node.key}: ${node.value}`;
    }
    return finalResult;
  });

  return `{\n ${finalResult.join('\n ')}\n}`;
};

export default genDiff;
