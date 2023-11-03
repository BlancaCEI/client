// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import { useState, useEffect } from "react"; // Importa funciones de React.
import Navbar from "../layout/Navbar"; //Importa el componente Navbar, que contiene la barra de navegación.
import axios from "axios"; // Importa la biblioteca Axios para hacer peticiones HTTP
import "../style/PlatosCrear.css"; // Importa el estilo CSS.
import { Link, useNavigate } from "react-router-dom"; // Importa componentes de react-router-dom para gestionar la navegación y las rutas.

function CreatePlatos() {
  // Función de navegación proporcionada por react-router-dom
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre_plato: "",
    ingredientes_plato: "",
    descripcion_plato: "",
    usuario_id: "",
  });

  // Variable que obtiene el valor del id del usuario de session storage.
  const userId = parseFloat(sessionStorage.getItem("userId"));

  // Función para manejar cambios en los campos del formulario
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Función que envia los datos del formulario al servidor
  function handleSubmit(e) {
    e.preventDefault();
    if (formData.nombre_plato == "") {
      console.log("Campo vacío");
    } else {
      axios
        .post("https://server-j7l9.onrender.com/api/platos", {
          nombre_plato: formData.nombre_plato,
          ingredientes_plato: formData.ingredientes_plato,
          descripcion_plato: formData.descripcion_plato,
          usuario_id: userId,
        })
        .then((res) => {
          navigate("/platos");
        })
        .catch((error) => {
          console.log("Error en la peticion: " + error);
        });
    }
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid" id="crear_platos">
        <div className="row" id="form_platos">
          <div className="col">
            <form
              className="form_crear2"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <h2 className="h2crear">Crear receta</h2>
              <div className="nombre">
                <label>Nombre del Plato:</label>
                <input
                  type="text"
                  name="nombre_plato"
                  onChange={handleChange}
                  value={formData.nombre_plato}
                />
              </div>
              <div className="ingredientes">
                <label>Ingredientes:</label>
                <textarea
                  type="text"
                  name="ingredientes_plato"
                  onChange={handleChange}
                  value={formData.ingredientes_plato}
                  rows="2"
                />
              </div>
              <div className="descripcion">
                <label>Receta:</label>
                <textarea
                  type="text"
                  name="descripcion_plato"
                  onChange={handleChange}
                  value={formData.descripcion_plato}
                  rows="4"
                />
              </div>
              <input type="submit" value="Añadir" />
            </form>
            <div className="col">
              <Link to={"/platos"} id="link_recetas">
                Volver a las recetas
              </Link>
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </>
  );
}

export default CreatePlatos;
