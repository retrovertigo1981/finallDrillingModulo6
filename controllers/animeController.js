import { animeModel } from '../models/animeModel.js';
import * as url from 'node:url';

export const animeController = async (req, res, payload, urlParts) => {
  const queryParams = url.parse(req.url, true);

  if (req.method == 'GET' && !urlParts[2] && !queryParams.search) {
    try {
      let discos = await animeModel.getAllAnimes();

      res.writeHead(200, 'OK', { 'content-type': 'application/json' });
      return res.end(JSON.stringify(discos));
    } catch (err) {
      res.writeHead(500, 'Internal Server Error', {
        'content-type': 'application/json',
      });
      return res.end(JSON.stringify({ message: err.message }));
    }
  } else if (req.method == 'GET' && urlParts[2] && urlParts.length <= 3) {
    let anime = await animeModel.getAnimeById(urlParts[2]);

    if (anime) {
      res.writeHead(200, 'OK', { 'content-type': 'application/json' });
      res.end(JSON.stringify(anime));
    } else {
      res.writeHead(404, 'Not Found', { 'content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Disco no encontrado' }));
    }
  }
};
