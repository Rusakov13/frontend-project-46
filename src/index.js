#!/usr/bin/env node
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getPath = (file) => path.resolve('__fixtures__', file);

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = getPath(filepath1);
  const absolutePath2 = getPath(filepath2);

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const obj1 = readFileSync(absolutePath1, 'utf-8');
  const obj2 = readFileSync(absolutePath2, 'utf-8');

  let newObj1;
  let newObj2;
  if (extension1.slice(1) === 'json') {
    newObj1 = JSON.parse(obj1);
  }
  if (extension2.slice(1) === 'json') {
    newObj2 = JSON.parse(obj2);
  }

  const dataKeys1 = _.keys(newObj1);
  const dataKeys2 = _.keys(newObj2);
  const sortedAllKeys = _.sortBy(_.union(dataKeys1, dataKeys2));

  const result = sortedAllKeys.map((key) => {
    if (_.has(newObj1, key) && _.has(newObj2, key)) {
      if (newObj1[key] === newObj2[key]) {
        return {
          key,
          value: newObj1[key],
          type: 'unchanged',
        };
      }
      if (newObj1[key] !== newObj2[key]) {
        return {
          key,
          value1: newObj1[key],
          value2: newObj2[key],
          type: 'changed',
        };
      }
    }
    if (_.has(newObj1, key) && !_.has(newObj2, key)) {
      return {
        key,
        value: newObj1[key],
        type: 'deleted',
      };
    }
    if (!_.has(newObj1, key) && _.has(newObj2, key)) {
      return {
        key,
        value: newObj2[key],
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
