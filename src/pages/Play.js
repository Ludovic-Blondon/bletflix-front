import React, {useEffect, useState, useRef} from 'react'
import {useParams} from "react-router-dom";
import {useApiContext} from '../providers/ApiProvider.js';

export default function Play() {

	const [apiState, apiDispatch] = useApiContext();
    const {apiFetchEntity} = apiDispatch;
    const [prod, setProd] = useState(null)
	const params = useParams()
	const [loading, setLoading] = useState(true)
	const video = useRef(null)

	useEffect(() => {
		fetchWork()
	}, [])

	useEffect(() => {
		console.log(video)
	}, [video])

	function fetchWork() {
		apiFetchEntity('productions', params.id, response => {
			console.log(response)
			if (response['@type'] === 'hydra:error') {
    			return;
    		}
    		setProd(response)
    		setLoading(false)
		})
	}

	console.log(video)
	
	if (loading) {
		return <p>chargement ...</p>
	}
	
	return (
		<div>
			<figure>
				<img
					className="jacket_play"
					src={prod.mediaObject.contentUrl}
					alt="film"
				/>	
				<figcaption className="legend_play">
					<div className="legend_title">{prod.name}</div>
					<div>{new Date(prod.year).getFullYear()}</div>
				</figcaption>
			</figure>
			<div>
				<video  
					ref={video}
					id="video" 
					width="640px"
					height="350px"	
					controls="controls"
					src={prod.work.mediaObject.contentUrl} type='video/x-matroska; codecs="theora, vorbis"'
				>
				</video>
			</div>
		</div>
	)
}

