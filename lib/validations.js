export const isValidBody = (anime, isUpdate = false) => {
  const allowedKeys = ['nombre', 'genero', 'año', 'autor'];
  const keys = Object.keys(anime);
  const currentYear = new Date().getFullYear();

  // Validar que no haya claves no permitidas
  const hasOnlyAllowedKeys = keys.every((key) => allowedKeys.includes(key));

  if (!hasOnlyAllowedKeys) {
    return {
      isValid: false,
      message: 'El cuerpo contiene claves no permitidas.',
    };
  }

  /**
   * Para actualización de un anime, se requiere al menos una clave válida y que el año
   * no sea mayor al año actual
   */
  if (isUpdate) {
    if (keys.length === 0) {
      return {
        isValid: false,
        message: 'Debe proporcionar al menos una clave válida para actualizar.',
      };
    }

    if (anime.año > currentYear) {
      return {
        isValid: false,
        message: `El año debe ser menor o igual a ${currentYear}.`,
      };
    }

    return { isValid: true };
  }

  // Para creación de un nuevo anime, se requieren todas las claves obligatorias
  const hasAllRequiredKeys = allowedKeys.every((key) => keys.includes(key));
  if (!hasAllRequiredKeys) {
    return {
      isValid: false,
      message: 'Faltan claves requeridas para la creación del anime.',
    };
  }

  // Validar el año

  if (anime.año > currentYear) {
    return {
      isValid: false,
      message: `El año debe ser menor o igual a ${currentYear}.`,
    };
  }

  return { isValid: true };
};
