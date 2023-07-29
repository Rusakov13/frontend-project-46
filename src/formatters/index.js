import stylish from './stylish.js';
import plain from './plain.js';

const formatTree = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unknow format: ${format}!`);
  }
};

export default formatTree;
