import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

// import classes from './MovieDetails.module.css'

const useStyles = makeStyles((theme)=>({
  card: {
    width: '250px',
    height: '425px',
    margin: '50px auto',
  },
  button: {
    margin: 'auto',
  },
  title: {
    fontSize: '1rem',
    height: '50px',
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

const MovieDetails = (props) => {
  const classes = useStyles()
  
  return (
    <div className={classes.anotherSetOfCards}>
      {props.session && props.session.filter(p => p.Title === props.match.params.id).map(c => (
        <React.Fragment key={c.imdbID}>
          <Link to="/info">Back</Link>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt=""
                title={c.Title}
                image={c.Poster}
                height="250"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6" className={classes.title}>
                  {c.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {c.Year}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            {props.favorites && props.favorites.filter(p => p.imdbID === c.imdbID).length ?
              <ColorButton 
                variant="contained" 
                color="primary" 
                className={classes.button} 
                onClick={()=>props.handleRemoveFavorites(c)}
                >
                  Remove from favorite
              </ColorButton> :
              <BootstrapButton 
                variant="contained" 
                color="primary" 
                disableRipple 
                className={classes.button} 
                onClick={()=>props.handleAddFavorites(c)}
              >
                Add to favorite
              </BootstrapButton>
              }
            </CardActions>
          </Card>
          </React.Fragment>
      ))}
    </div>
  )
}

export default MovieDetails