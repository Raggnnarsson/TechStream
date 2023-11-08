import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import "./ShowPilots.css"
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
export default function ShowCentro() {
    const navigate = useNavigate();
    const auth = useAuthUser();
    const [centros,setCentros]=useState([])
    const getCentros= async()=>{
        const response=await axios.get("http://localhost:3000/salmonera/");
        setCentros(response.data);
    }
    useEffect(()=>{
        if(auth().nombre === "Taller"){
            navigate("/")
        }
        getCentros();
    },[])
    async function eliminarCentro(idSalmonera){
        try{
            const response = await axios.put(`http://localhost:3000/salmonera/editarSalmonera/${idSalmonera}`,{"isActive":false});
            if(response.status===200){
                alert("Centro eliminado con exito");
                getCentros()
                return
            }
        }
        catch(err){
            if(err.response.status==500){
                alert("No se puede eliminar Centro, está asignado a un reporte")
            }
            console.log(err)
        }
    }

  return (
    <>
    <Navbar></Navbar>
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">

    {centros.map((centro) => {
        // Verificar si el nombre del piloto es "Sin asignar"
        if (centro.nombreSalmonera !== "Bodega Taller"&& centro.nombreSalmonera !== "Bodega Transitoria"&&centro.nombreSalmonera !== "Taller" &&centro.isActive==true) {
            return (
                <div key={centro.idSalmonera}>
                    <h2>{centro.nombreSalmonera}</h2>
                    <button className="border border-black rounded-full p-4" onClick={() => { eliminarCentro(parseInt(centro.idSalmonera, 10)) }}>Eliminar</button>
                </div>
            );
        } else {
            // Si el nombre es "Sin asignar", no mostrar nada
            return null;
        }
    })}
</div>








    </>
  );
}
