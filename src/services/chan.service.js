import axios from 'axios';

export const ChanService = {
  async getThread(board, thread) {
    try {
      const url = `https://a.4cdn.org/${board}/thread/${thread}.json`;
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