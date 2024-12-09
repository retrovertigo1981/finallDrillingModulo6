import { isValidBody } from '../lib/validations.js';

describe('Validacion de datos para crear y actualizar animes', () => {
  const currentYear = new Date().getFullYear();
  const validAnime = {
    nombre: 'Dragon Ball',
    genero: 'Shonen',
    año: '1986',
    autor: 'Akira Toriyama',
  };
  test('Validar que no tenga claves no permitidas', () => {
    const invalidAnime = { ...validAnime, invalidKey: 'key no permitida' };

    const result = isValidBody(invalidAnime);
    expect(result).toEqual({
      isValid: false,
      message: 'El cuerpo contiene claves no permitidas.',
    });
  });

  test('Validar que al hacer update tenga al menos una key valida', () => {
    const emptyUpdate = {};
    const result = isValidBody(emptyUpdate, true);
    expect(result).toEqual({
      isValid: false,
      message: 'Debe proporcionar al menos una clave válida para actualizar.',
    });
  });

  test('Para creación de un nuevo anime, se requieren todas las claves obligatorias', () => {
    const incompleteAnime = {
      nombre: 'Dragon Ball',
      genero: 'Shonen',
    };

    const result = isValidBody(incompleteAnime);
    expect(result).toEqual({
      isValid: false,
      message: 'Faltan claves requeridas para la creación del anime.',
    });
  });

  test('Validar que el año del anime no puede ser mayor al año actual al crear', () => {
    const invalidYearAnime = {
      ...validAnime,
      año: currentYear + 1,
    };
    const result = isValidBody(invalidYearAnime);
    expect(result).toEqual({
      isValid: false,
      message: `El año debe ser menor o igual a ${currentYear}.`,
    });
  });

  test('Validar que el año del anime no puede ser mayor al año actual al actualizar', () => {
    const invalidYearUpdate = {
      año: currentYear + 1,
    };
    const result = isValidBody(invalidYearUpdate, true);
    expect(result).toEqual({
      isValid: false,
      message: `El año debe ser menor o igual a ${currentYear}.`,
    });
  });
});
