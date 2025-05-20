// Importa el componente visual que se va a conectar
import VolumeControls from "./component";

// Importa la función connect para conectar el componente a Redux
import { connect } from "react-redux";

// Importa bindActionCreators para simplificar el uso de acciones
import { bindActionCreators } from "redux";

// Importa la acción que actualiza el volumen
import { updateVolume } from '../../actions/soundActions';

// mapStateToProps: define qué parte del estado global se pasa como props
const mapStateToProps = (state) => {
  return {
    volume: state.soundReducer.volume // Toma el volumen desde el reducer de sonido
  };
};

// mapDispatchToProps: define qué acciones se pueden despachar desde este componente
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateVolume // Habilita la acción para actualizar el volumen
  }, dispatch);
};

// Conecta el componente a Redux y lo exporta
export default connect(mapStateToProps, mapDispatchToProps)(VolumeControls);
