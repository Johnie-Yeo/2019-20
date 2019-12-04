import data from './20191129';

export default (from, size, category) => new Promise((resolve) => {
  console.log('request!');
  const result = data
    .filter((content) => category.includes(content.category))
    .slice(from, from + size);
  setTimeout(() => {
    resolve(result);
  }, 100000000)
});
