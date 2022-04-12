import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import Search from './search.svg'
import './App.css'

// api key = fb47f634
const API_URL = `http://www.omdbapi.com/?apikey=fb47f634`

const App = () => {

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('batman')
    }, [])

    return(
        <div className='app'>
            <h1>Movie Finder</h1>
            <div className="search">
                <input 
                    placeholder = 'Search'
                    value = {search}
                    onChange = { (e) => {setSearch(e.target.value)} }
                />
                <img src = {Search} onClick = { () => searchMovies(search)} alt="Search" />
            </div>
            {
                movies.length > 0 
                ? (
                    <div className='container'>
                        {movies.map( movie => <MovieCard key={movie.imdbID} movie = {movie} />)}
                    </div>
                )
                : <div className='empty'>'No movie found'</div>
            }
        </div>
    )
}

export default App