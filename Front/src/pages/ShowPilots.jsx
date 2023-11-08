import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import "./ShowPilots.css"
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
export default function ShowPilots() {
    const auth = useAuthUser();
    const navigate = useNavigate();
    const [pilots,setPilots]=useState([])
    const [pilotoEliminado,setPilotoEliminado]=useState(false);
    const getPilots= async()=>{
        const response=await axios.get("http://localhost:3000/piloto/");
        setPilots(response.data);
    }
    useEffect(()=>{
        if(auth().nombre === "Taller"){
            navigate("/")
        }
        getPilots();
    },[])
    async function eliminarPiloto(idPiloto){
        try{
            const response = await axios.put(`http://localhost:3000/piloto/editarPiloto/${idPiloto}`,{"isActive":false});
            if(response.status===200){
                alert("Piloto eliminado con exito");
                getPilots()
                return
            }
        }
        catch(err){
            if(err.response.status==500){
                alert("No se puede eliminar piloto, está asignado a un reporte")
            }
            console.log(err)
        }
    }

  return (
    <>
    <Navbar></Navbar>
    <div className="containerPilots">
    {pilots.map((pilot) => {
        // Verificar si el nombre del piloto es "Sin asignar"
        if (pilot.nombre !== "Sin Piloto Asignado"&&pilot.isActive==true) {
            return (
                <div key={pilot.idPiloto}>
                    <h2>{pilot.nombre}</h2>
                    <button onClick={() => { eliminarPiloto(parseInt(pilot.idPiloto, 10)) }}>Eliminar</button>
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

