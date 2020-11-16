import React from 'react'
import { Link } from 'react-router-dom'

import classes from './MovieDetails.module.css'

const MovieDetails = (props) => {
  //console.log(props, 'props inside Movie Details')
  
  return (
    <div className={classes.anotherSetOfCards}>
      {props.apiData && props.apiData.filter(p => p.Title === props.match.params.id).map(c => (
        <div key={c.imdbID}>
          <Link to="/info">Back</Link>
          <div key={c.imdbID} className={classes.container}>
            <span>
              <img src={c.Poster} alt="" className={classes.image} />
            </span>
            <span>
              <p>{c.Title}</p>
              <p>{c.Year}</p>
              <p style={{textTransform: 'capitalize'}}>{c.Type}</p>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieDetails