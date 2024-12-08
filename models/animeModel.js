import { readFile, updateFile } from '../lib/data-services.js';

export class animeModel {
  static folder = '.data/';
  static fileName = 'anime.json';

  static async getAllAnimes() {
    let animes = await readFile(animeModel.folder, animeModel.fileName);

    return animes;
  }

  static async getAnimeById(id) {
    let anime = await animeModel.getAllAnimes();

    return anime[id];
  }
}
