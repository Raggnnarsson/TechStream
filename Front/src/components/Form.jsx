import { useState, useEffect } from "react";
import axios from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./form.css";

export default function Form() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nombre: "",
    pass: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const sigIn = useSignIn();

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Resetea el estado de error cuando el usuario cambia la contraseña
    setPasswordError("");
  }
  //nombre:ID CONTRASEÑA:
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formValues
      );
      sigIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { nombre: formValues.nombre },
      });
    } catch (err) {
      setPasswordError(err.response.data.message);
    }
  }

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
          <div className="containergeneraladd">
            <div className="container">
              <div className="card">
                <div className="card-content"></div>
                <img
                  src="./public/Logo/Logo TechStream.png"
                  className="img-fluid"
                  alt="Logo TechStream"
                />
                <h2 className="inicioText pt-5">Inicio de sesión</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 pt-4">
                    <select
                      name="nombre"
                      onChange={handleChangeInput}
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                    >
                      <option selected>Seleccione un tipo de usuario</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Logística">Logística</option>
                      <option value="Taller">Taller</option>
                    </select>
                  </div>
                  <div
                    className={`form-group ${passwordError === "Contraseña incorrecta"
                        ? "has-error"
                        : ""
                      }`}
                  >
                    <input
                      type="password"
                      name="pass"
                      className={`form-control ${passwordError === "Contraseña incorrecta"
                          ? "is-invalid"
                          : ""
                        }`}
                      id=""
                      placeholder="Ingrese contraseña"
                      onChange={handleChangeInput}
                    />
                    {passwordError === "Contraseña incorrecta" ? (
                      <div className="invalid-feedback text-danger">
                        Contraseña incorrecta
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="d-grid gap-2 pt-4">
                      <motion.div
                        className="box"
                        whileHover={{ scale: [null, 1.1, 1.1] }}
                        transition={{ duration: 0.3 }}
                      >
                        <button className="btn btn-primary w-100" type="submit">
                          Ingresar
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
