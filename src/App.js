import React, { useEffect, useState } from 'react';

import { Route, Switch, Link, useHistory } from 'react-router-dom';
import Home from './Home'
import MoviesInfo from './MoviesInfo'
import MovieDetails from './MovieDetails'
import Favorites from './Favorites'

import classes from './App.module.css';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

// COMMENTS

const App = () => {
  let history = useHistory()

  const [inputVal, setInputVal] = useState('')
  const [inputYear, setInputYear] = useState('')
  const [apiData, setApiData] = useState()
  const [selectType, setSelectType] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [errorMsg, setErrorMsg] = useState('')
  const [favorites, setFavorites] = useState()

  const handleChangeVal = e => {
    return setInputVal(e.target.value)
  }

  const handleChangeYear = e => {
    return setInputYear(e.target.value)
  }

  const handleSelectType = e => {
    //console.log(e.target.value, 'selectType value')
    return setSelectType(e.target.value)
  }

  const handlePageNumber = e => {
    return setPageNumber(e.target.value)
  }

  const handleAddFavorites = (givenObj) => {
    let allFavorites
    allFavorites = JSON.parse(localStorage.getItem('session')) || []
    if (allFavorites.filter(p => p.imdbID === givenObj.imdbID).length) {
      return
    }
    allFavorites.push(givenObj)
    //console.log(allFavorites, 'handle Add')
    setFavorites(allFavorites)
    localStorage.setItem('session', JSON.stringify(allFavorites))
  }

  const handleRemoveFavorites = (givenObj) => {
    let allFavorites
    allFavorites = JSON.parse(localStorage.getItem('session')) || []
    if (allFavorites === []) {
      return
    }
    const findItem = allFavorites.findIndex(p => p.imdbID === givenObj.imdbID)
    //console.log(allFavorites, 'allFavorites')
    allFavorites.splice(findItem, 1)
    //console.log(allFavorites, 'allFavorites')
    setFavorites(allFavorites)
    // favorites && console.log(favorites, 'inside')
    localStorage.setItem('session', JSON.stringify(allFavorites))
    // console.log(localStorage, 'inside App Js')
  }

  const handleSubmit = e => {
    //console.log('inside handleSubmit')
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?s=${inputVal}&y=${inputYear}&type=${selectType}&page=${pageNumber}&apikey=8c854588`)
    .then(res => res.json())
    .then(data => {
      if (!data.Search) {
        setApiData()
        setErrorMsg('Please enter a valid parameter.')
      } else {
        //console.log(data.Search, 'data.Search')
        //setRedirect(true)
        //console.log(redirect, 'redirect')
        setErrorMsg('')
        setApiData(data.Search)
    }})
    .catch((error) => console.log(error))
    history.push('/info')
  }

  const handleReset = e => {
    setApiData()
  }

  const NoMatchPage = () => {
    return (
      <div>
        <h3>404 not found</h3>
        <Link to="/">Go Home</Link>
      </div>
    )
  }

  useEffect(() => {
    let allFavorites
    allFavorites = JSON.parse(localStorage.getItem('session')) || []
    setFavorites(allFavorites)
  }, [])
  
  return (
    <div className={classes.App}>
      <div className={classes.header}>
        <Link to="/"><Button color="primary">Home</Button></Link>
        <Link to="/favorites"><Button color="secondary">Favorites</Button></Link>
      </div>
      <form 
        onSubmit={handleSubmit} 
        className={`${classes.form} ${classes.root}`} 
        noValidate 
        autoComplete="off"
      >  
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          color="secondary"
          onChange={handleChangeVal}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      
        <TextField
          id="year"
          label="Year"
          variant="outlined"
          color="secondary"
          onChange={handleChangeYear}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={selectType}
            onChange={handleSelectType}
            label="Type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="episode">Episode</MenuItem>
          </Select>
        </FormControl>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="pgNo-label">Page</InputLabel>
          <Select
            labelId="pgNo-label"
            id="pgNo"
            value={pageNumber}
            onChange={handlePageNumber}
            label="Page"
          >
            <MenuItem value="">
              
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        </FormControl>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
        >
          Search
        </Button>
        &nbsp;
        <Button 
          type="reset" 
          variant="contained" 
          color="secondary" 
          onClick={handleReset}
        >
          Reset
        </Button>
      </form>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favorites" render={(props) => (
          <Favorites
            {...props}
            favorites={favorites}
            handleRemoveFavorites={handleRemoveFavorites} 
          />
        )} />
        <Route exact path="/info" render={(props) => (
          <MoviesInfo 
            {...props}
            apiData={apiData} 
            errorMsg={errorMsg} 
            handleAddFavorites={handleAddFavorites} 
            handleRemoveFavorites={handleRemoveFavorites} 
            favorites={favorites} 
            selectType={selectType}
          ></MoviesInfo>
        )} />
        <Route path="/info/:id" render={(props) => (
          <MovieDetails 
            {...props}
            apiData={apiData}
          ></MovieDetails>
        )} />
        <Route component={NoMatchPage}></Route>
      </Switch>
    </div>
  )
}

export default App;