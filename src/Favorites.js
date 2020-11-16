import React from 'react'

import classes from './Favorites.module.css'
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const Favorites = (props) => {
  //console.log(props.favorites, 'inside Favorites')
  return (
    <div className={classes.cards}>
      {props.favorites && props.favorites.map((p)=>{
        //console.log(p, 'inside favorites')
        return (
          <div key={p.imdbID}>
            <img src={p.Poster} alt="" className={classes.image} />
            <h5>{p.Title}</h5>
            <p>{p.Year}</p>
            <ColorButton 
              variant="contained" 
              color="primary"
              className={`${classes.btn} ${classes.margin}`} 
              onClick={()=>props.handleRemoveFavorites(p)}
            >
              Remove from favorite
            </ColorButton>
          </div>
      )})}
    </div>
  )
}

export default Favorites