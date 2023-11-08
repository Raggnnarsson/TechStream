import "./navbar.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthUser } from "react-auth-kit";
function NavbarDarkExample() {
  const auth = useAuthUser();
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <div className="contenedor-logo">
          <a className="navbar-brand" href="/">
            <img
              src="./public/Logo/logo-removebg-preview.png"
              width="40"
              height="auto"
              alt=""
            />
            TechStream
          </a>
        </div>

        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Inicio
              </Link>
            </li>
            {auth().nombre === "Taller" || auth().nombre === "Administrador" ? (
              <>
                <li>
                  <Link className="nav-link text-light" to="/addRov">
                    Agregar Rov
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {auth().nombre === "Logística" ||
            auth().nombre === "Administrador" ? (
              <>
                <li>
                  <Link className="nav-link text-light" to="/addPilot">
                    Agregar Piloto
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {auth().nombre === "Logística" ||
            auth().nombre === "Administrador" ? (
              <>
                <li>
                  <Link className="nav-link text-light" to="/Pilots">
                    Ver Pilotos
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {auth().nombre === "Logística" ||
            auth().nombre === "Administrador" ? (
              <>
                <li>
                  <Link className="nav-link text-light" to="/CrearCentro">
                    Crear Centro
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {auth().nombre === "Logística" ||
            auth().nombre === "Administrador" ? (
              <>
                <li>
                  <Link className="nav-link text-light" to="/Centros">
                    Ver Centros
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDarkExample;
