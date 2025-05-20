// Importa el componente TrackSearch
import TrackSearch from "./component";

// Importa funciones necesarias para conectar Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Importa las acciones necesarias
import { searchArtists } from '../../actions/artistActions';
import { updateHeaderTitle } from '../../actions/uiActions';
import { updateViewType } from '../../actions/songActions';

// Función que mapea el estado global de Redux a las props del componente
const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token
  };
};

// Función que mapea las acciones (dispatchers) a las props del componente
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchArtists,
      updateHeaderTitle,
      updateViewType
    },
    dispatch
  );
};

// Conecta el componente con Redux y lo exporta
export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);

