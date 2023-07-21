import yaml from 'js-yaml';

const parser = (file, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.load(file);
    case 'yml':
      return yaml.load(file);
    default:
      return console.log('Error!');
  }
};

export default parser;
