
import React, { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {


  const api='https://api.escuelajs.co/api/v1/products';

  const [productos, setProductos] = useState();
  const [filtro, setFiltro] = useState();
  const [respufiltro, setRespfiltro] = useState();

  


  const loadProduct= async () => {
    const response =  await fetch(api);
    const responseJSON= await response.json();
    setProductos (responseJSON);
    setRespfiltro(responseJSON);
  };


  const hanldlenChange=e=>{ 
    setFiltro(e.target.value);
    filtrar(e.target.value);

  }

  const filtrar=(entrada)=>{
var listaResultados=productos.filter((elemento)=>{
  if(elemento.title.toString().toLowerCase().includes(entrada.toLowerCase())
  || elemento.description.toString().toLowerCase().includes(entrada.toLowerCase()))
  {
    return elemento
  }
  
})
setRespfiltro(listaResultados);
  }
  useEffect(()=>{
      loadProduct();
  }, [])


  return (
    <div className="App">

      
      <h1>LISTA DE PRODUCTOS</h1>
      <hr></hr>
      <div class="input-group mb-3 col-sm-3">
  <span class="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faSearch}/></span>
  <input
        className='form-control'
        value={filtro}
        placeholder="Ingresa Nombre o descripción"
        onChange={hanldlenChange}
        />
</div>
      
      <div className='table-responsive'>
      <table className='table table-hover'>
        <thead>
        <tr>
        <td>NOMBRE</td>
        <td>DESCRPCION</td>
        <td>IMAGEN</td>
        </tr>
        </thead>
        <tbody>
        {!respufiltro ? 'No resultados..': respufiltro.map((producto, i)=>{
          return  <tr key={i}>
              <td >{producto.title}</td>
              <td>{producto.description}</td>
              <td > <img src={producto.images[0]} class="rounded img-fluid" /></td>
              </tr>
          })
        }
        </tbody>
         
      </table>
      </div>
    </div>
  );
}

export default App;
