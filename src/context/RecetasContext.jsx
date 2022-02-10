import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react'

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultas, setConsultas] = useState(false)
    const {nombre, categoria} = busqueda;

    useEffect(() => {
        if(consultas){
            const obtenerRecetas = async () => {
              const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
              const resultado = await axios.get(url);
              guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [busqueda])
    
    return ( 
        <RecetasContext.Provider value={{recetas, buscarRecetas, setConsultas}}>
            {props.children}
        </RecetasContext.Provider>
     );
}

export default RecetasProvider;