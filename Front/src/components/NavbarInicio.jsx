import "./navbarinicio.css";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav"></div>
      </nav>
    </div>
  );
}
