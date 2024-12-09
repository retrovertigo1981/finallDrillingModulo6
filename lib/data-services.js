import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export const readFile = async (folder, fileName) => {
  let descriptorArchivo;

  try {
    const filePath = path.join(folder, fileName);

    descriptorArchivo = await fs.open(filePath);

    const data = await fs.readFile(descriptorArchivo, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  } finally {
    if (descriptorArchivo) {
      await descriptorArchivo.close();
    }
  }
};

export const updateFile = async (folder, fileName, data) => {
  const filePath = path.join(folder, fileName);
  let descriptorArchivo;
  try {
    descriptorArchivo = await fs.open(filePath, 'r+');

    if (!descriptorArchivo) throw new Error('No existe archivo');

    try {
      await descriptorArchivo.truncate(0);
      await fs.writeFile(descriptorArchivo, JSON.stringify(data), {
        encoding: 'utf8',
      });
    } catch (err) {
      console.error('Error escribiendo archivo', err);
    }
  } catch (err) {
    console.error('Error leyendo archivo', err);
  } finally {
    if (descriptorArchivo) {
      await descriptorArchivo.close();
    }
  }
};
