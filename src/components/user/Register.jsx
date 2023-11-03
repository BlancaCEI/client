// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import { useState } from "react"; // Importa funciones de React.
import axios from "axios"; // Importa la biblioteca Axios para hacer peticiones HTTP
import Navbar2 from "../layout/Navbar2"; //Importa el componente Navbar, que contiene la barra de navegación.
import "../style/Register.css";  // Importa el estilo CSS.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.

// Es una función de componente de React llamada Register.
// Define un estado inicial que almacena el nombre,
// correo electrónico y la contraseña del formulario.
function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

// Función  que se encarga de actualizar el estado formData cuando se producen cambios. 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

// Función que realiza una solicitud al servidor con los datos del formulario.
//  Compara datos con la base de datos y crea un nuevo usuario.
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://server-j7l9.onrender.com/api/register", {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.data.status == "1") {
          alert("Usuario ya existente, intente otro correo");
        } else {
          alert("Usuario creado,redirigiendo a login");
          location.replace("/login");
        }
      })
      .catch((error) => {
        console.log("Error en la peticion: " + error);
      });
  }

  return (
    <>
      <Navbar2 />
      <div className="container-fluid" id="reginpage">
        <div className="container-fluid" id="reginform">
          <div className="row">
            <div className="col">
              <h1 className="titulo">Registro</h1>
            </div>
          </div>
          <div className="row">
            <div className="col" id="form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  id="nom1"
                  required
                  onChange={handleChange}
                />
                <br />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="em1"
                  required
                  onChange={handleChange}
                />
                <br />

                <label htmlFor="password">Contraseña: </label>
                <input
                  type="password"
                  name="password"
                  id="pass1"
                  required
                  onChange={handleChange}
                />
                <br />

                <input type="submit" value="Registrarme" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
