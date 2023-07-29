import _ from 'lodash';

const tree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: tree(obj1[key], obj2[key]), status: 'nested' };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], status: 'unchanged' };
    }
    return {
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
      status: 'updated',
    };
  });
};

export default tree;
