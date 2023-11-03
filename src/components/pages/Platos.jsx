// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import { useState, useEffect } from "react"; // Importa funciones de React.
import Navbar from "../layout/Navbar"; //Importa el componente Navbar, que contiene la barra de navegación.
import axios from "axios"; // Importa la biblioteca Axios para hacer peticiones HTTP
import "../style/Platos.css"; // Importa el estilo CSS.
import { MdDeleteOutline } from "react-icons/md"; // Importa un icono de la biblioteca de react-icons
import { TbEdit } from "react-icons/tb"; // Importa un icono de la biblioteca de react-icons
import { PiForkKnifeBold } from "react-icons/pi"; // Importa un icono de la biblioteca de react-icons
import { Link } from "react-router-dom"; // Importa componentes de react-router-dom para gestionar las rutas.

function Platos() {

   // Estado que almacena la lista de platos
  const [plato, setPlato] = useState([]);

  // Variable que obtiene el valor del id del usuario de session storage.
  const userId = parseFloat(sessionStorage.getItem("userId"));

   // Efecto que se ejecuta cuando el componente se monta
   // Realiza una solicitud al servidor y actualiza el estado plato con los datos recuperados.
  useEffect(() => {
    axios
      .get("https://server-j7l9.onrender.com/api/platos")
      .then((res) => setPlato(res.data))
      .catch((error) => console.log("Error: " + error));
  }, []);

   // Función para manejar la eliminación de un plato
  function handleBorrar(id_plato) {
    axios
      .delete("https://server-j7l9.onrender.com/api/platos/" + id_plato)
      .then(() => {
        console.log("Elemento eliminado");
        location.reload();
      })
      .catch((error) => console.log("Error en el cliente: " + error));
  }

  return (
    <>
      <Navbar />

      <div className="container-fluid" id="platos-page">
        <div className="container-fluid" id="add_plato">
          <div className="row">
            <div className="col">
              <h1 className="titulo">
                Mis Recetas <PiForkKnifeBold style={{ color: "#F36F5E" }} />
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col" >
              <Link to='/platos/crear/' ><input type="submit" value="Nueva receta" id="boton_crear"/></Link>
            </div>
          </div>
          <div className="row">
            <div className="col" id="lista_platos">
              <ul>
                {plato
                  .filter(
                    (elemento) => parseFloat(elemento.usuario_id) === userId
                  )
                  .map((elemento) => (
                    <li className="elemento_plato" key={elemento.id_plato}>
                      <div className="row" id="nombre-borrar">
                        <div className="col" id="nombre_plato">
                          {elemento.nombre_plato}
                        </div>
                        <div className="col" id="boton_plato">
                          <Link to={"/platos/editar/" + elemento.id_plato}>
                            <TbEdit />
                          </Link>
                          <button
                            onClick={() => handleBorrar(elemento.id_plato)}
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
                      </div>
                      <div className="col" id="descripcion-1">
                        <h3 id="h3_plato">Ingredientes: </h3>
                        <p id="descripcion_p">{elemento.ingredientes_plato}</p>
                      </div>
                      <div className="col" id="descripcion-2">
                        <h3 id="h3_plato">Receta: </h3>
                        <p id="descripcion_p">{elemento.descripcion_plato}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Platos;
