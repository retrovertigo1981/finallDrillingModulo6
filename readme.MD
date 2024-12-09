# Final Drilling Módulo 6 Node.js - Proyecto Anime

[Imgur](https://i.imgur.com/YnAqb4j.gifv)

Este proyecto es un CRUD de una base de datos que almacena información sobre animes, desarrollado como parte del Bootcamp Desarrollo FullStack JavaScript de Talento Digital. Utiliza **Node.js** para crear un servidor básico y manipular datos desde un archivo JSON. La funcionalidad se evalúa a través de **Postman**, y las pruebas automatizadas se implementan con **Jest**.

## Requerimientos Técnicos

- **Node.js** como base para crear el servidor y manejar la lógica del proyecto.  
- Un archivo `anime.json` que sirve como base de datos, almacenando los animes en formato JSON.  
- Métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) implementados para las operaciones CRUD.  
- Validaciones avanzadas para asegurar que los datos enviados cumplen con los requisitos.  
- Pruebas unitarias desarrolladas con **Jest**.

## Estructura del Proyecto

```plaintext
├── __test__/
│   └── anime.test.js          # Archivo con pruebas unitarias
├── .data/
│   └── anime.json             # Base de datos de animes
├── controllers/
│   └── animeController.js     # Controlador principal para CRUD
├── lib/
│   ├── data-services.js       # Utilidades para manejar datos
│   └── validations.js         # Validaciones para datos de entrada
├── models/
│   └── animeModel.js          # Modelo para la interacción con la base de datos
├── node_modules/              # Dependencias del proyecto
├── index.js                   # Entrada principal del servidor
├── routes.js                  # Archivo para el manejo de rutas
├── package.json               # Configuración del proyecto y dependencias
├── package-lock.json          # Detalles de las dependencias instaladas
└── .gitignore                 # Archivos a ignorar por Git
```

## Uso del Proyecto

### Instalación

Asegúrate de tener **Node.js** instalado en tu sistema. Luego, clona este repositorio e instala las dependencias:

```bash
npm install
```

### Ejecutar el Servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

### Pruebas

Ejecuta las pruebas unitarias con:

```bash
npm test
```

### Endpoints Disponibles

- `GET /`: Lista todos los animes.  
- `GET /:id`: Muestra los detalles de un anime específico por su `id`.  
- `POST /`: Crea un nuevo anime (valida los datos ingresados).  
- `PUT /:id`: Actualiza un anime por su `id` (requiere que al menos una clave permitida esté presente).  
- `DELETE /:id`: Elimina un anime por su `id`.

## Validaciones de Datos

El archivo `validations.js` contiene la función `isValidBody` que asegura:

- **Creación (`POST`)**: Los datos enviados deben incluir todas las claves requeridas: `nombre`, `genero`, `año`, `autor`.  
- **Actualización (`PUT`)**: Al menos una de estas claves debe estar presente, y no se permiten claves adicionales.

## Pruebas Implementadas

Las pruebas en Jest aseguran:

- Validación correcta de datos.  
- Respuesta esperada de los endpoints.  
- Comprobación del CRUD completo.

## Licencia

Este proyecto está bajo la licencia MIT.


