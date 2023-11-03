// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import Logo_nombre from '../../../public/Logo_nombre.png'; // Importa una imagen.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import "../style/Home.css"; // Importa el estilo CSS.
import { Link } from "react-router-dom"; // Importa un componente de react-router-dom para gestionar las rutas.

function Home() {
  return (
    <>
      <div className="container-fluid" id="homepage">
        <div className="container-fluid" id="home">
          <div className="row">
            <div className="col">
              <h1 id="bienvenido">Bienvenido a</h1>
            </div></div>
            <div className="row">
            <div className="col">
              <img src={Logo_nombre} className="logo_nombre"/>
              </div></div>
            <div className="row">
            <div className="col">
            <Link to='/platos'><input type="submit" value="Recetas" id="boton_home"/></Link>
            </div>
            <div className="col">
            <Link to='/lista'><input type="submit" value="Lista de la compra" id="boton_home"/></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
