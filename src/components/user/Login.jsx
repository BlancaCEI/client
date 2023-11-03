// Importación de los elementos necesarios para el funcionamiento del archivo.
import React from "react"; // Importa el módulo que define los componentes.
import { useState } from "react"; // Importa funciones de React.
import axios from "axios"; // Importa la biblioteca Axios para hacer peticiones HTTP
import { Link } from "react-router-dom"; // Importa un componente de react-router-dom para gestionar las rutas.
import "../style/Login.css";  // Importa el estilo CSS.
import Navbar2 from "../layout/Navbar2"; //Importa el componente Navbar, que contiene la barra de navegación.
import "bootstrap/dist/css/bootstrap.min.css"; // Importa la librería de Bootstrap.

// Es una función de componente de React llamada Login.
// Define un estado inicial que almacena el correo electrónico y la contraseña del formulario.
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

// Función que se encarga de actualizar el estado formData cuando se producen cambios. 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

//Función que se llama cuando se envía el formulario de inicio de sesión.
//Realiza una solicitud al servidor con los datos del correo electrónico y contraseña del formulario.
//Si la solicitud tiene éxito, guarda los datos en el session storage y redirige al usuario a la página principal.
//Si la solicitud falla, muestra una alerta al usuario.
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("https://server-j7l9.onrender.com/api/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        alert("Inicio de sesion satisfactorio");
        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("password", formData.password);
        location.replace("/");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          alert("Email o contraseña incorrectos");
        }
      });
  }

  return (
    <>
      <Navbar2 />
      <div className="container-fluid" id="loginpage">
        <div className="container-fluid" id="loginform">
          <div className="row">
            <div className="col">
              <h1 className="titulo">Iniciar Sesión</h1>
            </div>
          </div>
          <div className="row">
            <div className="col" id='form'>
              <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="em1"
                  onChange={handleChange}
                  value={formData.email}
                />

                <br />
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  id="pass1"
                  onChange={handleChange}
                  value={formData.password}
                />
                <br />
                <input type="submit" value="Iniciar sesión" />
              </form>
            </div>
          </div>
          <div className="row" id="registro">
            <div className="col" >
              <h2 id="h2">¿Aún no tienes cuenta?</h2>
              <div className="col" id="registro">
              <Link to='/register' id="link">Regístrate</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
