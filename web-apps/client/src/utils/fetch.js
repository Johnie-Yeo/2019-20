import Axios from 'axios';
import { PRODUCT_API } from './config';

const URI = PRODUCT_API;

export const getCategoryList = async () => {
  try {
    const response = await Axios.get(`${URI}/info/category`);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw Error(err.response.status);
    }
    throw Error(err.errno);
  }
};

const makeQuery = ({
  price: {
    start,
    end,
  },
  categories,
  coordinates,
  distance,
  from,
  limits, }) => {
  const queries = [];
  if (from) {
    queries.push(['from', from]);
  }
  if (limits) {
    queries.push(['limits', limits]);
  }
  if (categories && categories.length >= 1) {
    queries.push(['category', categories.join(',')]);
  }
  if (coordinates) {
    queries.push(['coordinates', coordinates]);
    if (distance) {
      queries.push(['distance', distance]);
    }
  }
  if (end || start) {
    queries.push(['price', `${start}${end ? `,${end}` : ''}`]);
  }
  const query = queries.map((q) => q.join('=')).join('&');
  return query;
};

export const getProductList = async (options) => {
  try {
    const query = makeQuery(options);
    const requestUri = `${URI}/products?${query}`;
    const response = await Axios.get(requestUri);
    const result = response.data.map(({ _id, _source }) => {
      return { id: _id, ..._source, order: Date.parse(_source.order) };
    });
    return result;
  } catch (err) {
    throw Error(err.response);
  }
};
