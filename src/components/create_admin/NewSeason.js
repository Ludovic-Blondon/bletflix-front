import React, {useState} from 'react'
import {Form, Button, Input, InputNumber, DatePicker} from 'antd'
import UploadAvatar from './UploadAvatar.js'
import UploadVideo from './UploadVideo.js'

export default function NewSeason({apiPostEntity, apiPostEntityWithProgress, apiDeleteEntity, iriProd}) {
	
	const [iriJacket, setIriJacket] = useState(null)
	const [iriForNextStep, setIriForNextStep] = useState(null)
	const [firstStep, setFirstStep] = useState(true)

	function onFinish(value) {
		console.log(value)
		value.production = iriProd;
		if(iriJacket) { value.mediaObject = iriJacket; }
		apiPostEntity('seasons', value, response => {
			console.log(response)
			if (response['@type'] === "hydra:Error") {
				return;
			}
			setIriForNextStep(response['@id'])
			setFirstStep(false)
		})
	}

	function onFinishFailed(errorInfos) {
		console.log(errorInfos)
	}

	return (
		firstStep
		?
			<Form 
				style={{width: 500}}
				name="new_prod"
			    initialValues={{ remember: true }}
			    onFinish={onFinish}
			    onFinishFailed={onFinishFailed}
			>
				<Form.Item
			        name="number"
			        rules={[{ required: true, message: "Le numero de la saison" }]}
				>
					<InputNumber style={{width: 250}} min={1} max={50} placeholder={'numero de la saison'} />
				</Form.Item>
				<Form.Item
			        name="nbEpisode"
				>
					<InputNumber style={{width: 250}} min={1} max={50} placeholder={"nombre d'épisode si possible"} />
				</Form.Item>
				<Form.Item
					name="year"
				>
					<DatePicker picker="year" />
				</Form.Item>						
			    <Form.Item>
					<UploadAvatar apiPostEntity={apiPostEntity} setIri={setIriJacket} />
			    </Form.Item>
			    <Form.Item>
			        <Button type="primary" htmlType="submit">
			    	    Etapes suivantes >>
			        </Button>
			    </Form.Item>
			</Form>
		:
			<UploadVideo 
				apiPostEntityWithProgress={apiPostEntityWithProgress}
				apiPostEntity={apiPostEntity}
				apiDeleteEntity={apiDeleteEntity}
				iri={iriForNextStep}
				multiple={true}
				nextSeason={() => setFirstStep(true)}
			/>
	)
}