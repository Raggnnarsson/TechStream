import  { createContext, useContext, useState } from 'react';

// Crear el contexto
const MyContext = createContext();

// Proveedor del contexto que envuelve tu aplicación
export function MyContextProvider({ children }) {
  const [reporte, setReporte] = useState({});
  const [idReporte,setidReporte]=useState(null);
  const [clickReporte,setClickReporte]=useState(false);
  const [reportes,setReportes]=useState([])
  const [tablaReportes,setTablaReportes]=useState([]);
  const [reportesActivos,setReportesActivos]=useState([]);
  const [tablaReportesActivos,setTablaReportesActivos]=useState([]);
  const [clickVerMas,setClickVerMas]=useState(false);
  const [idRov,setIdRov]=useState(null);
  const [serialRov,setSerialRov]=useState(null);

  return (
    <MyContext.Provider value={{ idRov,setIdRov,serialRov,setSerialRov,clickVerMas,setClickVerMas,reporte, setReporte,reportesActivos,setReportesActivos,tablaReportesActivos,setTablaReportesActivos,idReporte,setidReporte,clickReporte,setClickReporte,reportes,setReportes,tablaReportes,setTablaReportes }}>
      {children}
    </MyContext.Provider>
  );
}

// Función personalizada para usar el contexto más fácilmente
export function useMyContext() {
  return useContext(MyContext);
}
