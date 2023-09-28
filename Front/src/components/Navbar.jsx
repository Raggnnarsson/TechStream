import "./navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top pb-20">
        <div className="contenedor-logo">
          <a className="navbar-brand" href="#">
            <img
              src="./public/Logo/logo-removebg-preview.png"
              width="40"
              height="auto"
              alt=""
            />
          </a>
          <a className="navbar-brand" href="#">
            TechStream
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Inicio
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ROV
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/addRov">
                      Agregar Rov
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item">Editar Rov</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pilotos
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Agregar Piloto
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Editar Rov
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Eliminar
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav"></div>
      </nav>
    </div>
  );
}
