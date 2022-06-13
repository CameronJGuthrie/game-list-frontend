import { get, post, put, del } from './util';

/**
 *  Get all games
 */
export const getGames = async () => {
  return get('/games');
}

/**
 *  Get game with given id
 * @param {number} id
 */
export const getGame = async (id) => {
  return get(`/games/${id}`);
}

/**
 *  Get game with given id
 * @param {object} payload
 */
export const addGame = async (payload) => {
  return post(`/games`, payload);
}

/**
 *  Update game with given id
 * @param {number} id
 * @param {object} payload
 */
export const updateGame = async (id, payload) => {
  return put(`/games/${id}`, payload);
}

/**
 *  Get game with given id
 * @param {number} id
 */
export const deleteGame = async (id) => {
  return del(`/games/${id}`, id);
}

/**
 *  Get game types enum list
 */
 export const getGameTypes = async () => {
  return get('/game-types');
}