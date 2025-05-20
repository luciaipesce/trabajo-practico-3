// Importa las librerías principales de React y Redux
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Importa acciones necesarias
import { fetchUser } from './actions/userActions';
import { setToken } from './actions/tokenActions';
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from './actions/songActions';

// Importa componentes visuales y funcionales
import Header from './components/Header';
import Footer from './components/Footer';
import UserPlaylists from './components/UserPlaylists';
import MainView from './components/MainView';
import ArtWork from './components/ArtWork';
import MainHeader from './components/MainHeader';
import SideMenu from './components/SideMenu';

// Estilos principales
import './App.css';

class App extends Component {
  // Define el objeto de audio estático para controlar la reproducción
  static audio;

  // Se ejecuta cuando el componente se monta por primera vez
  componentDidMount() {
    // Extrae el token de la URL después de la autenticación con Spotify
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    // Si no hay token, redirige al login de Spotify
    if (!hashParams.access_token) {
      window.location.href =
        'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
      } else {
      // Si hay token, lo guarda en Redux
      this.props.setToken(hashParams.access_token);
    }
  }

  // Se ejecuta cuando llegan nuevas props
  componentWillReceiveProps(nextProps) {
    // Si llega un nuevo token, trae los datos del usuario
    if (nextProps.token) {
      this.props.fetchUser(nextProps.token);
    }

    // Ajusta el volumen del audio cuando cambia
    if (this.audio !== undefined) {
      this.audio.volume = nextProps.volume / 100;
    }
  }

  // Detiene la canción
  stopSong = () => {
    if (this.audio) {
      this.props.stopSong();
      this.audio.pause();
    }
  };

  // Pausa la canción
  pauseSong = () => {
    if (this.audio) {
      this.props.pauseSong();
      this.audio.pause();
    }
  };

  // Reanuda la canción
  resumeSong = () => {
    if (this.audio) {
      this.props.resumeSong();
      this.audio.play();
    }
  };

  // Controla la reproducción de canciones (play/pausa nuevo tema)
  audioControl = (song) => {
    const { playSong, stopSong } = this.props;

    if (this.audio === undefined) {
      playSong(song.track);
      this.audio = new Audio(song.track.preview_url);
      this.audio.play();
    } else {
      stopSong();
      this.audio.pause();
      playSong(song.track);
      this.audio = new Audio(song.track.preview_url);
      this.audio.play();
    }
  };

  // Renderiza toda la estructura de la aplicación
  render() {
    return (
      <div className="App">
        <div className="app-container">
          {/* Sección lateral izquierda */}
          <div className="left-side-section">
            <SideMenu />
            <UserPlaylists />
            <ArtWork />
          </div>

          {/* Sección principal del contenido */}
          <div className="main-section">
            <Header />
            <div className="main-section-container">
              <MainHeader
                pauseSong={this.pauseSong}
                resumeSong={this.resumeSong}
              />
              <MainView
                pauseSong={this.pauseSong}
                resumeSong={this.resumeSong}
                audioControl={this.audioControl}
              />
            </div>
          </div>

          {/* Reproductor inferior (footer) */}
          <Footer
            stopSong={this.stopSong}
            pauseSong={this.pauseSong}
            resumeSong={this.resumeSong}
            audioControl={this.audioControl}
          />
        </div>
      </div>
    );
  }
}

// Validación de props que recibe el componente
App.propTypes = {
  token: PropTypes.string,
  fetchUser: PropTypes.func,
  setToken: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  volume: PropTypes.number,
};

// Asocia el estado global de Redux con las props del componente
const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    volume: state.soundReducer.volume,
  };
};

// Asocia las acciones con el dispatch
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      setToken,
      playSong,
      stopSong,
      pauseSong,
      resumeSong,
    },
    dispatch
  );
};

// Exporta el componente conectado a Redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
