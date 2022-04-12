import React from 'react'

const placeholder = "https://via.placeholder.com/400"

const MovieCard = ({movie: { Title, Year, Poster, Type}}) => {
    return(
       <div className="movie">
           <div className="year">
               <p>{Year}</p>
           </div>
           <div className='poster'>
               <img src = {Poster !== "N/A" ? Poster : placeholder } alt = {Title} />
           </div>
           <div className='meta'>
                <span>{Type}</span>
                <h3>{Title}</h3>
           </div>
       </div>
    )
}

export default MovieCard;