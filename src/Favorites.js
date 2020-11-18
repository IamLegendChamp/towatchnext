import React from 'react'

// import classes from './Favorites.module.css'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  card: {
    width: 250,
    height: 425,
  },
  button: {
    margin: 'auto',
  },
  title: {
    fontSize: '1rem',
    height: '50px',
  }
}));


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
  const classes = useStyles()
  return (
    <div>
      {/* {props.favorites && props.favorites.map((p)=>{
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
      )})} */}
      <Grid container spacing={1}>
        {props.favorites && props.favorites.map((a) => {
          return (
            <Grid item xs key={a.imdbID}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Link to={`/info/${a.Title}`}>
                    <CardMedia
                      component="img"
                      alt=""
                      title={a.Title}
                      image={a.Poster}
                      className={classes.imag}
                      height="250"
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h6" className={classes.title}>
                      {a.Title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {a.Year}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                <ColorButton 
                  variant="contained" 
                  color="primary"  
                  className={`${classes.button}`} 
                  onClick={()=>props.handleRemoveFavorites(a)}
                >
                  Remove from favorite
                </ColorButton>
                  </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Favorites