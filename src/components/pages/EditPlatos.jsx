// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import { useState, useEffect } from "react"; // Importa funciones de React.
import Navbar from "../layout/Navbar"; //Importa el componente Navbar, que contiene la barra de navegación.
import axios from "axios"; // Importa la biblioteca Axios para hacer peticiones HTTP
import "../style/EditPlatos.css";  // Importa el estilo CSS.
import { useNavigate, useParams } from "react-router-dom"; // Importa componentes de react-router-dom.

function EditPlatos() {

  // Variable que almacena el parámetro "id_plato" de la URL
  const { id_plato } = useParams();
  // Función de navegación proporcionada por react-router-dom
  const navigate = useNavigate();

  // Estados que almacenan los datos del plato a editar, el nombre, ingredientes y descripción.
  const [nombre_plato, setNombre] = useState("");
  const [ingredientes_plato, setIngredientes] = useState("");
  const [descripcion_plato, setDescripcion] = useState("");

  // Efecto que se ejecuta cuando el componente se monta.
  // Realiza una solicitud al servidor para obtener los datos.
  useEffect(() => {
    axios
      .get("https://server-j7l9.onrender.com/api/platos/" + id_plato)
      .then((res) => {
        setNombre(res.data.nombre_plato);
        setIngredientes(res.data.ingredientes_plato);
        setDescripcion(res.data.descripcion_plato);
      })
      .catch((error) => console.log("Error del cliente: " + error));
  }, []);

  // Función que actualiza los datos del servidor.
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put("https://server-j7l9.onrender.com/api/platos/" + id_plato, {
        nombre_plato: nombre_plato,
        ingredientes_plato: ingredientes_plato,
        descripcion_plato: descripcion_plato,
      })
      .then((res) => {
        console.log("Usuario actualizado correctamente: " + res.data);
        navigate("/platos");
      })
      .catch((error) => {
        console.log("Error del cliente " + error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid" id="edit-page">
        <div className="container-fluid" id="edit">
          <div className="row">
            <div className="col">
              <h2 id="h2_editar">Editar Plato</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form  onSubmit={handleSubmit} className="form_editar">
                <div className="nombre_plato">
                  <label htmlFor='Nombre'>Nombre del Plato: </label>
                  <input
                    type="text"
                    id="nom1"
                    name="nombre_plato"
                    onChange={e=>setNombre(e.target.value)}
                    value={nombre_plato}
                  /></div>
                  <div className="ingredientes_plato">
                  <label htmlFor='Ingredientes'>Ingredientes del Plato: </label>
                  <textarea
                    name="ingredientes_plato"
                    id="ing1"
                    onChange={e=>setIngredientes(e.target.value)}
                    value={ingredientes_plato}
                    rows='5'
                  />
                </div>
                <div className="descripcion_plato">
                  <label htmlFor='Descripcion'>Descripción del Plato: </label>
                  <textarea
                    name="descripcion_plato"
                    id="des1"
                    onChange={e=>setDescripcion(e.target.value)}
                    value={descripcion_plato}
                    rows='10'
                  />
                </div>
                <input type="submit" id='actualizar' value="Actualizar" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPlatos;
