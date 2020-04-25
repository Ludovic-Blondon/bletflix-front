import React, {useEffect, useState} from 'react';
import {Divider} from 'antd'
import {useApiContext} from '../providers/ApiProvider.js';
import {Link} from "react-router-dom";

export default function Home() {
	
	const [apiState, apiDispatch] = useApiContext();
    const {apiFetchCollection} = apiDispatch;
    const [movies, setMovies] = useState([])
    const [loadingMovie, setLoadingMovie] = useState(true)

    useEffect(() => {
    	fetchMovies()
    }, [])

    function fetchMovies() {
    	const data = {
			filters: [{
				name: 'type',
				value: 'movie'
			}]
    	}
    	apiFetchCollection('productions', data, response => {
    		console.log(response)
    		if (response['@type'] === 'hydra:error') {
    			return;
    		}
    		setMovies(response['hydra:member'])
    	})
    }
    
    return (
    	<div>
    		<Divider orientation="left"><h2>Films</h2></Divider>
    		<div style={{display: 'flex'}}>
    			{
    				movies.map(movie => (
    					<Link key={movie.id} to={`/play/${movie.id}`}>
	    					<figure>
								<img
								    className="jacket_thumb_home"
								    src={movie.mediaObject.contentUrl}
								    alt="film"
								/>	
								<figcaption className="legend_prod_home">
									<div className="legend_title">{movie.name}</div>
									<div>{new Date(movie.year).getFullYear()}</div>
							    </figcaption>
							</figure>
						</Link>
    				))
    			}
    		</div>
    	</div>
  );
};

