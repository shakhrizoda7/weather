import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const MovieStyled = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    flex-direction: column;

    .movie{
        .form{
            width: 400px;
            height: 110px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-top: 80px;
            gap: 2px;
            background-color: #fff;
            border-radius: 8px;
            padding: 25px;

            @media (max-width: 420px){
                width: 260px;
                height: 90px;
                padding: 0 10px;

                h6{
                font-size: 15px;
                }
            }
            
            div{
                display: flex;
                align-items: center;
                gap: 10px;
            }

            input{
                width: 300px;
                padding: 5px 10px;
                background-color: transparent;
                border: 1px solid lightgray;
                border-radius: 6px;
            }

            button{
                display: flex;
                align-items: center;
                background-color: #00796b;
                color: white;
                padding: 8px 10px;
            }
        }

        .movie-info{
            width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 50px;

            .ratingIcon{
                font-size: 12px;
                margin-right: 5px;
            }

            p{
                display: flex;
                align-items: center;
            }

            @media (max-width: 420px){
              .movieAbout{
                font-size: 15px;
                width: 350px;
              }
            }
        }
    }
`;

export default function Movie() {
  // api
  const API_KEY_MOVIE = '38baa1c8';
  
  const [movieName, setMovieName] = useState('');
  const [movie, setMovie] = useState(null);
  
  
  const getMovie = async () => {
    if (!movieName) {
    alert("Please, enter movie name");
    return;
    }

    const movieToFetch = movieName.trim();
    
    // api url
    const url = `https://www.omdbapi.com/?s=${movieToFetch}&apikey=${API_KEY_MOVIE}`;
        
    try {
        const response = await axios.get(url);
        
        // Check if the response has Search results
        if (response.data.Search && response.data.Search.length > 0) {
            const movieId = response.data.Search[0].imdbID; 
            const detailUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY_MOVIE}`;

            const detailResponse = await axios.get(detailUrl);

            setMovie(detailResponse.data);
        } else {
            alert("Movie not found");
            setMovie(null);
        }
    } catch (error) {
        setMovie(null)
    }

    setMovieName('')
  }

  return (
    <MovieStyled>
      <div className="movie">
        <div className="form">
          <h6>Movie name:</h6>

          <div>
            <input type="text" placeholder="Enter movie name" value={movieName} onChange={(e) => setMovieName(e.target.value)}/>
            
            <button className="btn" onClick={getMovie}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </div>
        </div>

        {movie && (
          <div className="movie-info">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <p>{movie.Country}</p>
            <p>{movie.Genre}</p>
            <p><i class="bi bi-play-fill runtimeIcon"></i>{movie.Runtime}</p>
            <p className='movieAbout'>{movie.Plot}</p>
            <p>Actors: {movie.Actors}</p>
            <p><i class="bi bi-star-fill ratingIcon"></i> {movie.imdbRating}</p>
          </div>
        )}
      </div>
    </MovieStyled>
  )
}
