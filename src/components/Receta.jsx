import React, {useContext, useState} from 'react'
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@mui/material/Modal';
// import { makeStyles } from '@mui/styles';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Receta = ({ receta }) => {

  //Configuracion del modal de material-ui

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
      setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const {informacion, setIdReceta, setReceta} = useContext(ModalContext);
  
  const {strDrink, strDrinkThumb, idDrink} = receta;
  
  const mostrarIngredientes = informacion => {
    let ingredientes = [];
    for (let i = 0; i < 16; i++) {
        if(informacion[`strIngredient${i}`]){
          ingredientes.push(
            <li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
          )
        }
      
    }

    return ingredientes;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{strDrink}</h2>
        <img src={strDrinkThumb} alt={`Imagen de ${strDrink}`} className="card-img-top" />
        <div className="card-body">
            <button type="button" onClick={() => {setIdReceta(idDrink); handleOpen();}} className="btn btn-primary btn-block">Ver receta</button>
            <Modal open={open} onClose={() => { setIdReceta(null); setReceta({});  handleClose();}}>
              <div style={modalStyle} className={classes.paper}>
                  <h2>{informacion.strDrink}</h2>  
                  <h3 className="mt-4">Instrucciones</h3>
                  <p>{informacion.strInstructions}</p>
                  <img src={informacion.strDrinkThumb} alt="" className="img-fluid my-4" />
                  <h3>Ingredientes y cantidades</h3>
                  <ul>
                    {mostrarIngredientes(informacion)}
                  </ul>
              </div>
            </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
