import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";
import Categoria from "./Categoria";
import Error from "./Error";

const Formulario = () => {

  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, setConsultas } = useContext(RecetasContext);
  const [busqueda, setBusqueda] = useState({
      nombre: '',
      categoria: ''
  });
  const [error, setError] = useState(false)

  const {nombre, categoria} = busqueda;

  const obtenerDatosRecetas = e => {
      setBusqueda({
          ...busqueda,
          [e.target.name]: e.target.value
      })
  }

  const handleSubmit = e => {
      e.preventDefault();

      if(nombre.trim() === '' || categoria.trim() === ''){
          setError(true);
          return;
      }

      setError(false);
      buscarRecetas(busqueda);
      setConsultas(true);

  }

  return (
    <form onSubmit={handleSubmit} className="col-12">
    {
        error
        ? <Error mensaje="Todos los campos son obligatorios"/>
        :null
    }
      <fieldset className="text-center">
        <legend>Busca bebidas por Categoría o Ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            placeholder="Buscar por Ingrediente"
            className="form-control"
            onChange={obtenerDatosRecetas}
          />
        </div>
        <div className="col-md-4">
          <select className="form-control" name="categoria" onChange={obtenerDatosRecetas}>
            <option value="">-- Selecciona Categoria ---</option>
            {categorias.map((categoria) => (
              <Categoria key={categoria.strCategory} categoria={categoria} />
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Bebidas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
