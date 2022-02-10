const Categoria = ({categoria}) => {
    return ( 
        <option value={categoria.strCategory}>{categoria.strCategory}</option>
     );
}
 
export default Categoria;