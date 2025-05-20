# 🎧 TP3 – App de Música con React + Spotify API

Este proyecto es una aplicación web desarrollada en **React** que permite buscar artistas, visualizar información sobre su música y marcar favoritos, utilizando la **Spotify Web API**.

> ⚠️ **IMPORTANTE:** por problemas con el `redirect URI` en producción, **la app no está hosteada online**. Sin embargo, funciona correctamente de forma local.

---

## 🚀 Tecnologías utilizadas

- React
- Redux
- JavaScript (ES6+)
- HTML + CSS
- Spotify Web API

---

## ✅ Requisitos cumplidos

- ✔ Posee **más de 5 componentes** de React
- ✔ Consume **más de 2 endpoints** distintos de la API de Spotify
- ✔ Hay al menos **un commit por integrante** del grupo
- ✔ Incluye una **barra de búsqueda de artistas** (usa el endpoint `/search`)
- ✔ Muestra **foto y nombre del artista** en los resultados
- ✔ Al hacer clic en un artista, se muestra su **vista de detalle** con:
  - Nombre del artista
  - Lista de álbumes (nombre y año de publicación)
- ✔ Hay un **botón para volver** desde el detalle del artista a la vista de búsqueda
- ✔ Se puede **marcar un artista como favorito**
- ✔ Los artistas favoritos aparecen listados a la izquierda y se puede acceder rápidamente a su vista de detalle
- ✔ Se realizó toda la lógica con **Redux** (sin React Router)

---

## 🌟 Funcionalidades extra (+1)

- 🔊 **Reproductor de música** funcional con botones para reproducir, pausar, avanzar y retroceder canciones
- 🎵 Se pueden **escuchar 30 segundos** de cada canción
- 📚 **Importa toda la biblioteca personal de Spotify**, incluyendo playlists, álbumes y artistas guardados
- 📁 Tiene una **vista específica de álbumes** dentro del sidebar (donde se muestran imágenes de portada y otros datos)
- 🎨 Incluye una sección de **exploración por géneros, nuevos lanzamientos y destacados**
- ❤️ Los artistas favoritos se **actualizan en tiempo real**
- 🔊 Permite **ajustar el volumen** de reproducción

---

## 🧪 ¿Cómo correr la app localmente?

Para ejecutar esta aplicación de forma local, seguí estos pasos:
------------------------------------------------------------------
1. Cloná el repositorio desde GitHub:

   ```bash
   git clone https://github.com/usuario/tp3-spotify-clone.git
------------------------------------------------------------------
2. Ingresá a la carpeta del proyecto:


cd tp3-spotify-clone
------------------------------------------------------------------
3. Instalá las dependencias necesarias con npm:

npm install
------------------------------------------------------------------
4. Iniciá la aplicación en modo desarrollo:

npm start
-----------------------------------------------------------------------------------------
Esto abrirá automáticamente la app en tu navegador en la dirección http://localhost:3000.