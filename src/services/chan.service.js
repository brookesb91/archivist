import axios from 'axios';

const getUrl = (board, thread) => `https://a.4cdn.org/${board}/thread/${thread}.json`;

export const ChanService = {
  async getThread(board, thread) {
    const url = getUrl(board, thread);

    try {
      const res = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return res.data;

    } catch (e) {
      throw new Error(e);
    }
  }
};