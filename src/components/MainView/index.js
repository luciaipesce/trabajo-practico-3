// Importamos el componente principal de la vista
import MainView from "./component";

// Importamos la función connect para conectar el componente con Redux
import { connect } from "react-redux";

// Definimos qué parte del estado global le vamos a pasar como props al componente
const mapStateToProps = (state) => {
  return {
    // Le pasamos el título actual del encabezado, que se usa para decidir qué vista mostrar
    headerTitle: state.uiReducer.title
  };
};

// Conectamos MainView al store de Redux usando mapStateToProps y lo exportamos
export default connect(mapStateToProps)(MainView);

