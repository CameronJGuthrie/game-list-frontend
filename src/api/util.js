import Axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const defaultConfig = {
  headers: {
    'ContentType': 'application/json'
  }
}

/**
 * GET wrapper method
 * @param {*} url Request URL
 * @param {*} config Axios config
 */
export const get = async (url, config = defaultConfig) => {
  return Axios.get(BACKEND_URL + url, config);
}

/**
 * POST wrapper method
 * @param {*} url Request URL
 * @param {*} payload Data to be sent
 * @param {*} config Axios config
 */
export const post = async (url, payload, config = defaultConfig) => {
  return Axios.post(BACKEND_URL + url, payload, config);
}

/**
 * PUT wrapper method
 * @param {*} url Request URL
 * @param {*} payload Data to be sent
 * @param {*} config Axios config
 */
export const put = async (url, payload, config = defaultConfig) => {
  return Axios.put(BACKEND_URL + url, payload, config);
}

/**
 * DELETE wrapper method
 * @param {*} url Request URL
 * @param {*} config Axios config
 */
export const del = async (url, config = defaultConfig) => {
  return Axios.delete(BACKEND_URL + url, config);
}