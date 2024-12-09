import { animeModel } from '../models/animeModel.js';
import { isValidBody } from '../lib/validations.js';
import * as url from 'node:url';

export const animeController = async (req, res, payload, urlParts) => {
  const queryParams = url.parse(req.url, true);
  /**
   * Obtener todos los animes
   */
  if (req.method === 'GET' && !urlParts[2] && !queryParams.search) {
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
  } /** Obtener anime por id */ else if (
    req.method == 'GET' &&
    urlParts[2] &&
    urlParts.length <= 3
  ) {
    let anime = await animeModel.getAnimeById(urlParts[2]);

    if (anime) {
      res.writeHead(200, 'OK', { 'content-type': 'application/json' });
      res.end(JSON.stringify(anime));
    } else {
      res.writeHead(404, 'Not Found', { 'content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Anime no encontrado' }));
    }
    /**
     * Agregar un nuevo anime
     */
  } else if (req.method === 'POST' && !urlParts[2]) {
    try {
      let data = JSON.parse(payload);
      const { isValid, message } = isValidBody(data);
      if (!isValid) {
        res.writeHead(400, 'Bad Request', {
          'content-type': 'application/json',
        });
        return res.end(JSON.stringify({ message }));
      }
      let animes = await animeModel.getAllAnimes();
      let lastId = Object.keys(animes)[Object.keys(animes).length - 1];
      let id = parseInt(lastId) + 1;

      animes[id] = data;

      let status = await animeModel.createAndUpdateAnime(animes);
      if (status) {
        res.writeHead(201, 'Created', { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Anime Agregado' }));
      } else {
        res.writeHead(500, 'Internal Server Error', {
          'content-type': 'application/json',
        });
        res.end(JSON.stringify({ message: 'Error interno al crear disco' }));
      }
    } catch (err) {
      res.writeHead(400, 'Bad Request', { 'content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Solicitud mal hecha' }));
    }
  } else if (req.method === 'PUT' && urlParts[2]) {
    try {
      let animes = await animeModel.getAllAnimes();
      let anime = await animeModel.getAnimeById(urlParts[2]);

      if (anime) {
        try {
          let update = JSON.parse(payload);
          const { isValid, message } = isValidBody(update, true);
          if (!isValid) {
            res.writeHead(400, 'Bad Request', {
              'content-type': 'application/json',
            });
            return res.end(JSON.stringify({ message }));
          }
          anime = { ...anime, ...update };
          animes[urlParts[2]] = anime;

          await animeModel.createAndUpdateAnime(animes);
          res.writeHead(200, 'OK', { 'content-type': 'application/json' });
          return res.end(JSON.stringify({ message: 'updated', anime }));
        } catch (err) {
          res.writeHead(400, 'Bad Request', {
            'content-type': 'application/json',
          });
          return res.end(JSON.stringify({ message: 'Payload mal formado' }));
        }
      } else {
        res.writeHead(404, 'Not Found', { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Anime no encontrado' }));
      }
    } catch (err) {
      res.writeHead(500, 'Internal Server Error', {
        'content-type': 'application/json',
      });
      return res.end(JSON.stringify({ message: 'Error interno de servidor' }));
    }
  } else if (req.method == 'DELETE' && urlParts[2]) {
    /**
     * Eliminar un anime por id
     */
    let animes = await animeModel.getAllAnimes();

    let ids = Object.keys(animes);
    if (ids.includes(urlParts[2])) {
      delete animes[urlParts[2]];

      await animeModel.createAndUpdateAnime(animes);

      res.writeHead(200, 'OK', { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Anime eliminado con éxito' }));
    } else {
      res.writeHead(404, 'Not Found', { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Anime no encontrado' }));
    }
  } /** 
    busqueda por nombre
  */ else if (req.method == 'GET' && !urlParts[2] && queryParams.search) {
    const { nombre } = queryParams.query;
    const animes = await animeModel.getAllAnimes();

    let ids = Object.keys(animes);

    for (let id of ids) {
      let anime = animes[id];

      if (!anime.nombre.toLowerCase().includes(nombre.toLocaleLowerCase())) {
        delete animes[id];
      }
    }
    let remainingKeys = Object.keys(animes);

    if (remainingKeys.length == 0) {
      res.writeHead(404, 'Not Found', { 'content-type': 'application/json' });
      return res.end(
        JSON.stringify({ message: 'No se encontraron animes con ese nombre' })
      );
    } else {
      res.writeHead(200, 'OK', { 'content-type': 'application/json' });
      return res.end(JSON.stringify(animes));
    }
  }
};
