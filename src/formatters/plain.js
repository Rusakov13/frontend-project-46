import _ from 'lodash';

const getFormatValue = (value) => {
  if (_.isObject(value)) {
    return `${'[complex value]'}`;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (data, path) => data
    .map((node) => {
      const {
        key, value, oldValue, newValue, children, status,
      } = node;

      const property = !path ? `${key}` : `${path}.${key}`;

      switch (status) {
        case 'unchanged':
          return null;
        case 'added':
          return `Property '${property}' was ${status} with value: ${getFormatValue(value)}\n`;
        case 'removed':
          return `Property '${property}' was ${status}\n`;
        case 'updated': {
          const value1 = getFormatValue(oldValue);
          const value2 = getFormatValue(newValue);
          return `Property '${property}' was ${status}. From ${value1} to ${value2}\n`;
        }
        case 'nested':
          return iter(children, property);
        default:
          throw new Error(`Unknow type ${status}!`);
      }
    })
    .join('');
  return iter(tree, '').trim();
};

export default plain;
