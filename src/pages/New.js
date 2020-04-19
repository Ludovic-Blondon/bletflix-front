import React, {useState} from 'react'
import {useApiContext} from '../providers/ApiProvider.js';
import NewProd from '../components/create_admin/NewProd.js'
import UploadVideo from '../components/create_admin/UploadVideo.js'
import NewSeason from '../components/create_admin/NewSeason.js'

export default function New() {

	const [apiState, apiDispatch] = useApiContext();
    const {apiPostEntity, apiPostEntityWithProgress, apiDeleteEntity} = apiDispatch;
	const [firstStep, setFirstStep] = useState(true)
	const [iriForNextStep, setIriForNextStep] = useState(null)
	const [type, setType] = useState(null)

	return (
		<div className="container_page">
			<div className="flex-center">
				<div>
					{
						firstStep
						?
							<NewProd 
								apiPostEntity={apiPostEntity} 
								setFirstStep={setFirstStep} 
								setIriForNextStep={setIriForNextStep} 
								setType={setType}
							/>
						:
							type === 'movie'
							?
								<UploadVideo 
									apiPostEntityWithProgress={apiPostEntityWithProgress}
									apiPostEntity={apiPostEntity}
									apiDeleteEntity={apiDeleteEntity}
									iri={iriForNextStep}
									multiple={false}
								/>
							:
								<NewSeason 
									apiPostEntityWithProgress={apiPostEntityWithProgress}
									apiPostEntity={apiPostEntity}
									apiDeleteEntity={apiDeleteEntity}
									iriProd={iriForNextStep}
								/>
					}
				</div>
			</div>
		</div>
	)
}