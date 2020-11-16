import React from 'react'
import { Link } from 'react-router-dom'

// import classes from './MoviesInfo.module.css'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme)=>({
  card: {
    width: 250,
    height: 400,
  },
  button: {
    margin: 'auto',
  },
  wrapper: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: '1rem',
  }
}));

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const MoviesInfo = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {props.apiData && props.apiData.map((a) => {
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
                  {props.favorites && props.favorites.filter(p => p.imdbID === a.imdbID).length ?
                    <ColorButton variant="contained" color="primary"  className={`${classes.button} ${classes.margin}`} onClick={()=>props.handleRemoveFavorites(a)}>Remove from favorite</ColorButton> :
                    <BootstrapButton 
                      variant="contained" 
                      color="primary" 
                      disableRipple 
                      className={`${classes.button} ${classes.margin}`} 
                      onClick={()=>props.handleAddFavorites(a)}
                    >
                      Add to favorite
                    </BootstrapButton>
                    }
                  </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
      <p>{props.errorMsg}</p>
    </div>
  )
}

export default MoviesInfo