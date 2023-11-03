// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import { useState, useEffect } from "react"; // Importa funciones de React.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.
import "../style/Lista.css"; // Importa el estilo CSS.
import axios from "axios"; // Importa la biblioteca Axios para hacer peticiones HTTP
import { FaShoppingCart } from "react-icons/fa"; // Importa un icono de la biblioteca de react-icons
import { MdDeleteOutline } from "react-icons/md"; // Importa un icono de la biblioteca de react-icons
import Navbar from "../layout/Navbar"; //Importa el componente Navbar, que contiene la barra de navegación.

const Lista = function () {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre_lista: "",
    completada_lista: false,
    usuario_id: "",
  });

  // Estado que almacena los datos de la lista
  const [lista, setLista] = useState([]);
  // Variable que obtiene el valor del id del usuario de session storage.
  const userId = parseFloat(sessionStorage.getItem("userId"));

  // Efecto que se ejecuta cuando el componente se monta,
  // realiza una solicitud al servidor y actualiza el estado lista.
  useEffect(() => {
    axios
      .get("https://server-j7l9.onrender.com/api/lista")
      .then((res) => setLista(res.data))
      .catch((error) => console.log("Error: " + error));
  }, []);

  // Función que se llama cuando los campos del formulario cambian.
  // Actualiza el estado con los valores ingresados.
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Función para añadir un elemento a la lista con el formulario.
  // Realiza una solicitud al servidor, y tras insertarlo, recarga la página para mostrar la lista actualizada.
  function handleSubmit(e) {
    e.preventDefault();
    if (formData.nombre_lista == "") {
      console.log("Campo vacío");
    } else {
      axios
        .post("https://server-j7l9.onrender.com/api/lista", {
          nombre_lista: formData.nombre_lista,
          usuario_id: userId,
        })
        .then((res) => {
          location.reload();
        })
        .catch((error) => {
          console.log("Error en la peticion: " + error);
        });
    }
  }

  // Función para eliminar un elemento de la lista según su id.
  // Realiza una solicitud al servidor, y tras eliminarlo, recarga la página para mostrar la lista actualizada.
  function handleBorrar(id_lista) {
    axios
      .delete("https://server-j7l9.onrender.com/api/lista/" + id_lista)
      .then(() => {
        console.log("Elemento eliminado");
        location.reload();
      })
      .catch((error) => console.log("Error en el cliente: " + error));
  }

  // Función para marcar o desmarcar un elemento como completado en la lista y cambiar su estado en la base de datos.
  // Realiza una solicitud al servidor, y tras cambiar su estado, recarga la página para mostrar la lista actualizada.
  function handleCompletada(id_lista, e) {
    const estado_lista = e.target.checked ? 1 : 0;
    axios
      .put("https://server-j7l9.onrender.com/api/lista/" + id_lista, {
        completada_lista: estado_lista,
      })
      .then((res) => {
        console.log("Elemento actualizado correctamente: " + res.data);
        location.reload();
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid" id="lista-page">
        <div className="container" id="add_lista">
          <div className="row">
            <div className="col">
              <h1 className="titulolista">
                Lista de la compra{" "}
                <FaShoppingCart style={{ color: "#F36F5E" }} />
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form className="form_crear" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="nombre_lista"
                  onChange={handleChange}
                  value={formData.nombre_lista}
                />
                <input type="submit" value="Añadir" />
              </form>
            </div>
          </div>

          <div className="container text-center">
            <div className="row">
              <div className="col">
                <ul>
                  {lista
                    .filter(
                      (elemento) => parseFloat(elemento.usuario_id) === userId
                    )
                    .map((elemento) => (
                      <li className="elemento_lista" key={elemento.id_lista}>
                        {elemento.nombre_lista}
                        <input
                          type="checkbox"
                          name="checklista"
                          id="checklista"
                          checked={elemento.completada_lista}
                          onChange={(e) =>
                            handleCompletada(elemento.id_lista, e)
                          }
                        />
                        <button onClick={() => handleBorrar(elemento.id_lista)}>
                          <MdDeleteOutline />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Lista;
