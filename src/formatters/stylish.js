import _ from 'lodash';

const indent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const string = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const str = Object.entries(data).map(([key, value]) => `${indent(depth)}  ${key}: ${string(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${indent(depth - 1)}  }`;
};

const makeStylish = (tree) => {
  const iter = (obj, depth) => obj
    .map((node) => {
      const {
        key, value, newValue, oldValue, children, status,
      } = node;

      switch (status) {
        case 'added':
          return `${indent(depth)}+ ${key}: ${string(value, depth + 1)}`;
        case 'removed':
          return `${indent(depth)}- ${key}: ${string(value, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}  ${key}: ${string(value, depth + 1)}`;
        case 'updated': {
          const str1 = `${indent(depth)}- ${key}: ${string(oldValue, depth + 1)}`;
          const str2 = `${indent(depth)}+ ${key}: ${string(newValue, depth + 1)}`;
          return `${str1}\n${str2}`;
        }
        case 'nested':
          return `${indent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${indent(depth)}  }`;
        default:
          throw new Error(`Unknown ${status}!`);
      }
    })
    .join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};

export default makeStylish;
