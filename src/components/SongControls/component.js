import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; // Librería para formatear tiempo
import './SongControls.css';

class SongControls extends Component {
  // Estado local para llevar la cuenta del tiempo transcurrido y el intervalo
  state = {
    timeElapsed: this.props.timeElapsed
  };

  // Se llama cuando el componente recibe nuevas props
  componentWillReceiveProps(nextProps) {
    // Si se detuvo la reproducción, detiene el contador de tiempo
    if (!nextProps.songPlaying) {
      clearInterval(this.state.intervalId);
    }

    // Si empieza una nueva canción, reinicia el contador de tiempo
    if (nextProps.songPlaying && nextProps.timeElapsed === 0) {
      clearInterval(this.state.intervalId);
      this.calculateTime(); // Empieza el conteo
    }

    // Actualiza el estado local con el nuevo tiempo
    this.setState({
      timeElapsed: nextProps.timeElapsed
    });
  }

  // Inicia un intervalo para ir sumando segundos de reproducción
  calculateTime() {
    const intervalId = setInterval(() => {
      if (this.state.timeElapsed === 30) {
        // Si llega a 30 segundos (el límite), detiene la canción
        clearInterval(this.state.intervalId);
        this.props.stopSong();
      } else if (!this.props.songPaused) {
        // Si no está pausada, aumenta el contador
        this.props.increaseSongTime(this.state.timeElapsed + 1);
      }
    }, 1000); // Cada segundo

    // Guarda el ID del intervalo en el estado
    this.setState({ intervalId });
  }

  // Devuelve el índice de la canción actual
  getSongIndex = () => {
    const { songs, songDetails } = this.props;

    const currentIndex = songs
      .map((song, index) => {
        if (song.track === songDetails) {
          return index;
        } else {
          return undefined;
        }
      })
      .filter(item => item !== undefined)[0];

    return currentIndex;
  }

  // Pasa a la siguiente canción en la lista
  nextSong = () => {
    const { songs, audioControl } = this.props;
    let currentIndex = this.getSongIndex();

    // Si está en la última canción, vuelve a la primera
    currentIndex === songs.length - 1
      ? audioControl(songs[0])
      : audioControl(songs[currentIndex + 1]);
  }

  // Vuelve a la canción anterior en la lista
  prevSong = () => {
    const { songs, audioControl } = this.props;
    let currentIndex = this.getSongIndex();

    // Si está en la primera canción, salta a la última
    currentIndex === 0
      ? audioControl(songs[songs.length - 1])
      : audioControl(songs[currentIndex - 1]);
  }

  render() {
    // Clase del botón de reproducción/pausa según el estado
    const showPlay = this.props.songPaused
      ? 'fa fa-play-circle-o play-btn'
      : 'fa fa-pause-circle-o pause-btn';

    return (
      <div className='song-player-container'>

        {/* Información de la canción */}
        <div className='song-details'>
          <p className='song-name'>{this.props.songName}</p>
          <p className='artist-name'>{this.props.artistName}</p>
        </div>

        {/* Controles: anterior, play/pausa, siguiente */}
        <div className='song-controls'>
          <div onClick={this.prevSong} className='reverse-song'>
            <i className="fa fa-step-backward reverse" aria-hidden="true" />
          </div>

          <div className='play-btn'>
            <i
              onClick={
                !this.props.songPaused
                  ? this.props.pauseSong
                  : this.props.resumeSong
              }
              className={"fa play-btn" + showPlay}
              aria-hidden="true"
            />
          </div>

          <div onClick={this.nextSong} className='next-song'>
            <i className="fa fa-step-forward forward" aria-hidden="true" />
          </div>
        </div>

        {/* Barra de progreso y temporizador */}
        <div className='song-progress-container'>
          <p className='timer-start'>
            {/* Tiempo transcurrido formateado */}
            {moment().minutes(0).second(this.state.timeElapsed).format('m:ss')}
          </p>
          <div className='song-progress'>
            {/* Progreso de reproducción: 30s total, se multiplica para calcular el ancho */}
            <div
              style={{ width: this.state.timeElapsed * 16.5 }}
              className='song-expired'
            />
          </div>
          <p className='timer-end'>
            {/* Tiempo restante */}
            {moment().minutes(0).second(30 - this.state.timeElapsed).format('m:ss')}
          </p>
        </div>
      </div>
    );
  }
}

// Validación de props
SongControls.propTypes = {
  timeElapsed: PropTypes.number,
  songPlaying: PropTypes.bool,
  songPaused: PropTypes.bool,
  songName: PropTypes.string,
  artistName: PropTypes.string,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  increaseSongTime: PropTypes.func,
  pauseSong: PropTypes.func,
  songs: PropTypes.array,
  songDetails: PropTypes.object,
  audioControl: PropTypes.func
};

export default SongControls;

