// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import { Link } from "react-router-dom"; // Importa componentes de react-router-dom para gestionar las rutas.
import "../style/Navbar.css"; // Importa el estilo CSS.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import {FaShoppingCart} from 'react-icons/fa'; // Importa un icono de la biblioteca de react-icons.
import { PiForkKnifeFill } from "react-icons/pi"; // Importa un icono de la biblioteca de react-icons.
import LogoBlanco from '../../../public/Logoblanco1.png'; // Importa una imagen.

function Navbar() {
  return (
    <>
      <div className="container-fluid" id="navbar">
        <div className="row" >
          <div className="col-8">
            <Link to='/'><img src={LogoBlanco} className="logo"/></Link>
          </div>
          <div className="col-4" >
            <div className="row" id="menu">
          <div className="col-12 col-sm-6">
            <Link to='/platos'>Mis recetas <PiForkKnifeFill/></Link>
          </div>
          <div className="col-12 col-sm-6">
            <Link to='/lista'>Lista de la compra <FaShoppingCart/></Link>
          </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Navbar;
