'use strict';

// Establece el entorno de desarrollo para Babel y Node.js
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Captura errores en promesas no manejadas y detiene la ejecución
process.on('unhandledRejection', err => {
  throw err;
});

// Carga las variables de entorno desde archivos .env
require('../config/env');

// Importación de módulos necesarios
const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,            // Elige un puerto disponible
  createCompiler,        // Crea el compilador de Webpack
  prepareProxy,          // Prepara configuración para el proxy
  prepareUrls,           // Prepara las URLs para abrir la app
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser'); // Abre la app en el navegador automáticamente
const paths = require('../config/paths');                   // Rutas de archivos del proyecto
const config = require('../config/webpack.config.dev');     // Configuración de Webpack en modo desarrollo
const createDevServerConfig = require('../config/webpackDevServer.config'); // Configuración del servidor

// Verifica si se está usando Yarn como gestor de paquetes
const useYarn = fs.existsSync(paths.yarnLockFile);

// Verifica si el entorno actual permite interacción con consola
const isInteractive = process.stdout.isTTY;

// Verifica que existan los archivos HTML y JS requeridos
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Define el puerto y host por defecto
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Intenta elegir un puerto disponible para iniciar el servidor
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // Si no hay puerto disponible, no continúa
      return;
    }

    // Define si usar HTTPS o HTTP y configura URLs de acceso
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);

    // Crea el compilador de Webpack
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);

    // Prepara configuración del proxy (opcional)
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

    // Crea la configuración final del servidor de desarrollo
    const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
    const devServer = new WebpackDevServer(compiler, serverConfig);

    // Inicia el servidor de desarrollo
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }

      // Limpia la consola si es interactiva
      if (isInteractive) {
        clearConsole();
      }

      // Muestra mensaje de inicio y abre el navegador
      console.log(chalk.cyan('Iniciando el servidor de desarrollo...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    // Maneja señales de interrupción (como Ctrl+C) para cerrar el servidor
    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    // Muestra mensaje de error si algo sale mal al iniciar
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });