import axios from 'axios';
import Path from 'path';
import Fs from 'fs';

export const DownloadService = {
  async download(url, dir, filename) {
    const fsDir = Path.resolve(process.cwd(), 'web', 'static', dir);

    if (!Fs.existsSync(fsDir)) {
      Fs.mkdirSync(fsDir, {
        recursive: true
      });
    }

    const path = Path.resolve(fsDir, filename);
    const writer = Fs.createWriteStream(path);

    const res = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    res.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
};