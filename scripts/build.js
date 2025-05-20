'use strict';

// Establece el entorno para Babel y Node.js en modo producción
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Maneja errores en promesas no atrapadas
process.on('unhandledRejection', err => {
  throw err;
});

// Carga las variables de entorno desde .env
require('../config/env');

// Módulos necesarios
const path = require('path');
const chalk = require('chalk'); // Para colorear la salida en consola
const fs = require('fs-extra'); // Extensión de fs con funciones útiles
const webpack = require('webpack'); // Empaquetador principal
const config = require('../config/webpack.config.prod'); // Configuración de Webpack para producción
const paths = require('../config/paths'); // Rutas del proyecto
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles'); // Verifica si los archivos clave existen
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages'); // Da formato a los mensajes del compilador
const printHostingInstructions = require('react-dev-utils/printHostingInstructions'); // Muestra instrucciones al subir a un host
const FileSizeReporter = require('react-dev-utils/FileSizeReporter'); // Mide y reporta el tamaño de los archivos
const printBuildError = require('react-dev-utils/printBuildError'); // Muestra los errores de compilación en consola

// Funciones para medir tamaño de archivos antes y después del build
const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// Verifica si se está usando Yarn
const useYarn = fs.existsSync(paths.yarnLockFile);

// Límites de advertencia para archivos grandes
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Verifica que existan los archivos base necesarios antes de compilar
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Mide tamaños actuales, borra la carpeta build, copia archivos públicos y compila
measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    fs.emptyDirSync(paths.appBuild);  // Borra la carpeta build sin borrar la carpeta misma
    copyPublicFolder();               // Copia el contenido de /public (menos el index.html)
    return build(previousFileSizes);  // Inicia el proceso de compilación
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        // Si hay advertencias, se muestran en amarillo
        console.log(chalk.yellow('Compilación con advertencias.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nBuscá las ' +
            chalk.underline(chalk.yellow('palabras clave')) +
            ' para aprender más sobre cada advertencia.'
        );
        console.log(
          'Para ignorarlas, agregá ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' en la línea anterior.\n'
        );
      } else {
        console.log(chalk.green('Compilación exitosa.\n'));
      }

      // Muestra el tamaño de los archivos comprimidos
      console.log('Tamaños de archivos luego de aplicar gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      // Muestra instrucciones útiles para hostear la app
      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      // Si ocurre un error de compilación, se muestra en rojo
      console.log(chalk.red('Falló la compilación.\n'));
      printBuildError(err);
      process.exit(1);
    }
  );

// Función que realiza la compilación con Webpack
function build(previousFileSizes) {
  console.log('Creando una versión optimizada para producción...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Muestra solo el primer error para no saturar la consola
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      // Si el entorno es CI (integración continua) y hay advertencias, se tratan como errores
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nSe están tratando las advertencias como errores porque process.env.CI = true.\n' +
              'La mayoría de los servidores CI lo configuran automáticamente.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

// Copia el contenido de la carpeta /public al destino final, sin copiar el index.html
function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}