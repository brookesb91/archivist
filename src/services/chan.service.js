import axios from 'axios';
import {
  DownloadService
} from './download.service.js';

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

      await this.downloadAttachments(board, thread, res.data);

      return res.data;

    } catch (e) {
      throw new Error(e);
    }
  },

  async downloadAttachments(board, thread, data) {

    const posts = data.posts.filter(x => x.filename);
    const total = posts.length;

    for (let i = 0; i < total; i++) {
      const post = posts[i];

      try {
        console.log(`Downloading ${i+1} of ${total} attachments [${post.filename}${post.ext}](${post.fsize} bytes)`);
        await DownloadService.download(`https://i.4cdn.org/${board}/${post.tim}s.jpg`, `${board}/${thread}`, `${post.tim}s.jpg`);
        await DownloadService.download(`https://is2.4chan.org/${board}/${post.tim}${post.ext}`, `${board}/${thread}`, `${post.tim}${post.ext}`);
      } catch (e) {
        continue;
      }
    }
  }
};