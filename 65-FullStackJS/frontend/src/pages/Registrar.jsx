import { Link } from "react-router-dom"
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

function Registrar() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const[alerta, setAlerta] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    const emptyFields = [nombre, email, password, repetirPassword].includes('');
    if(emptyFields){
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los password no son iguales', error: true});
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'El password es demasiado corto. Por favor, añade al menos 6 caracteres', error: true});
      return;
    }

    setAlerta({});

    try {
      const url = `/veterinarios`;
      await clienteAxios.post(url, {nombre, email, password});
      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error: false
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra <span className="text-black">tus pacientes</span></h1>
      </div>
      
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta}/>}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
            <input 
              type="text"     
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={event => setNombre(event.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="email"     
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input 
              type="password"     
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
            <input 
              type="password"     
              placeholder="Repite tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={event => setRepetirPassword(event.target.value)}
            />
          </div>

          <input 
            type="submit" 
            value="Crear cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
          <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar