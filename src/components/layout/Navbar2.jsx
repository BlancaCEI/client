// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import "../style/Navbar.css"; // Importa el estilo CSS.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import LogoBlanco from '../../../public/Logoblanco1.png'; // Importa una imagen.

function Navbar2() {
  return (
    <>
      <div className="container-fluid" id="navbar">
        <div className="row" >
          <div className="col-8">
            <img src={LogoBlanco} className="logo"/>
          </div>
      </div>
      </div>
    </>
  );
}

export default Navbar2;