import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = async event => {
    event.preventDefault();

    const emptyFields = [nombre, propietario, email, fecha, sintomas].includes('');
    if(emptyFields){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({
      msg: 'Guardo correctamente'
    });
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('');

  }

  const {msg} = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y <span className="text-indigo-600 font-bold">administralos</span></p>

      <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre mascota</label>
          <input 
            type="text" 
            id="nombre"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={nombre}
            onChange={event => setNombre(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre propietario</label>
          <input 
            type="text" 
            id="propietario"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={propietario}
            onChange={event => setPropietario(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email propietario</label>
          <input 
            type="email" 
            id="email"
            placeholder="Email propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
          <input 
            type="date" 
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={fecha}
            onChange={event => setFecha(event.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea 
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={event => setSintomas(event.target.value)} 
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={id ? "Guardar cambios" : "Agregar paciente"}
        />
      </form>
      {msg && <Alerta alerta={alerta}/>}
    </>
  )
}

export default Formulario