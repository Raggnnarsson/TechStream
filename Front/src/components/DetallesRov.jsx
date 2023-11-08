import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useMyContext } from "../context/reportesContext";
import "./DetallesRov.css";
import { saveAs } from "file-saver";
export default function DetallesRov() {
  const { idReporte, idRov } = useMyContext();
  const [reporteSeleccionado, setReporteSeleccionado] = useState({});
  const [reportesRelacionados, setReportesRelacionados] = useState([]);
  function agregarSaltosDeLinea(texto) {
    const palabras = texto.split(" "); // Dividir el texto en palabras
    const palabrasConSaltos = [];

    // Iterar a través de las palabras y agregar saltos de línea después de cada 8 palabras
    for (let i = 0; i < palabras.length; i++) {
      palabrasConSaltos.push(palabras[i]);
      if ((i + 1) % 8 === 0) {
        palabrasConSaltos.push("\n"); // Agregar salto de línea después de cada 8 palabras
      }
    }

    // Unir las palabras con saltos de línea de nuevo en un solo string
    return palabrasConSaltos.join(" ");
  }

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:3000/reportes/datosreporte/${idReporte}`
    );
    setReporteSeleccionado(response.data[0]);
    console.log("reporte");
    console.log(reportesRelacionados)
  };
  const getReportesRelacionados = async () => {
    console.log(idRov);
    const response = await axios.get(
      `http://localhost:3000/reportes/datosreportes/${idRov}`
    );
    console.log(response);
    setReportesRelacionados(response.data);
  };
  function formatearFecha(fechaOriginal) {
    return new Date(fechaOriginal).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  useEffect(() => {
    getData();
    getReportesRelacionados();
  }, []);
  const convertToCSV = () => {
    const header = Object.keys(reportesRelacionados[0]).join(","); // Obtener las cabeceras del CSV
    const csv = reportesRelacionados
      .map((item) => Object.values(item).join(","))
      .join("\n"); // Convertir datos a formato CSV
    return `${header}\n${csv}`; // Unir cabeceras y datos
  };
  const downloadCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv"); // Descargar el archivo CSV como 'data.csv'
  };
  return (
    <>
      <Navbar></Navbar>
      <h1 className="tituloVerMas">EstadoActual</h1>
      <table className="table table-dark table-bordered mx-auto">
        <thead>
          <tr>
            <th scope="col">Id ROV</th>
            <th scope="col">Estado del rov</th>
            <th scope="col">Ubicación</th>
            <th scope="col">Piloto</th>
            <th scope="col">Fecha de modificación</th>
            <th scope="col">Comentario Piloto</th>
            <th scope="col">Comentario Taller</th>
          </tr>
        </thead>
        <tbody>
          {reporteSeleccionado ? (
            <>
              <tr>
                <td>{reporteSeleccionado.serialRov} </td>
                <td>{reporteSeleccionado.tipoEstado} </td>
                <td>{reporteSeleccionado.nombreSalmonera} </td>
                <td>{reporteSeleccionado.nombre} </td>
                <td>{formatearFecha(reporteSeleccionado.fechaIngreso)} </td>
                <td>{reporteSeleccionado.comentarioPiloto} </td>
                <td>{reporteSeleccionado.comentarioTaller} </td>
              </tr>
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <h1 className="tituloVerMas">Historial del rov</h1>
      <table className="table table-dark table-bordered mx-auto">
        <thead>
          <tr>
            <th scope="col">Id ROV</th>
            <th scope="col">Estado del rov</th>
            <th scope="col">Ubicación</th>
            <th scope="col">Piloto</th>
            <th scope="col">Fecha de modificación</th>
            <th scope="col">Comentario Piloto</th>
            <th scope="col">Comentario Taller</th>
          </tr>
        </thead>
        <tbody>
          {reportesRelacionados &&
            reportesRelacionados.map((reporte) => (
              <>
                <tr>
                  <td scope="col">{reporte.serialRov}</td>
                  <td scope="col">{reporte.tipoEstado}</td>
                  <td scope="col">{reporte.nombreSalmonera}</td>
                  <td scope="col">{reporte.nombre}</td>
                  <td scope="col">{formatearFecha(reporte.fechaIngreso)}</td>
                  <td>{reporte.comentarioPiloto} </td>
                  <td>{reporte.comentarioTaller} </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      <button onClick={downloadCSV}>Descargar Excel</button>
    </>
  );
}
