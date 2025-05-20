// Importa React para poder usar JSX
import React from 'react';

// Importa PropTypes para validar las props que se pasan al componente
import PropTypes from 'prop-types';

// Importa los estilos específicos de este componente
import './ArtWork.css';

// Componente funcional que recibe una prop llamada 'albumImage'
const ArtWork = ({ albumImage }) => {
  // Si no hay imagen, no muestra nada
  if (!albumImage) return null;

  return (
    <div className='album-artwork-container'>
      <img alt="artwork" className='album-artwork' src={albumImage} />
    </div>
  );
};

// Validación de la prop esperada
ArtWork.propTypes = {
  albumImage: PropTypes.string
};

// Exporta el componente para poder usarlo en otros archivos
export default ArtWork;


