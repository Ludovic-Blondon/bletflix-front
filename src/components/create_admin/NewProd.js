import React, {useState} from 'react'
import {Form, Input, Button, Radio, DatePicker} from 'antd'
import UploadAvatar from './UploadAvatar.js'
const { TextArea } = Input;

export default function NewProd({apiPostEntity, setFirstStep, setIriForNextStep, setType}) {

	const [iri, setIri] = useState(null)

	function onFinish(value) {
		console.log(value)
		if(iri) { value.mediaObject = iri }
		apiPostEntity('productions', value, response => {
			console.log(response)
			if (response['@type'] === "hydra:Error") {
				return;
			}
			setType(value.type)
			setIriForNextStep(response['@id'])
			setFirstStep(false)
		})
	}

	function onFinishFailed(errorInfos) {
		console.log(errorInfos)
	}

	return (
		<Form 
			style={{width: 500}}
			name="new_prod"
		    initialValues={{ remember: true }}
		    onFinish={onFinish}
		    onFinishFailed={onFinishFailed}
		>
			<Form.Item
		        name="name"
		        rules={[{ required: true, message: "Tu crois pas qu'il faut un nom a ton film !!!" }]}
			>
				<Input placeholder="Nom du film/serie" />
			</Form.Item>						
			<Form.Item
				name="type"
		        rules={[{ required: true, message: "C'est quoi ???" }]}
			>
			    <Radio.Group>
			        <Radio value={'movie'}>Film</Radio>
			        <Radio value={'serie'}>Série</Radio>
			    </Radio.Group>
			</Form.Item>						
			<Form.Item
				name="year"
			>
				<DatePicker picker="year" />
			</Form.Item>
			<Form.Item
				name="description"
			>
				<TextArea placeholder="Déscription" allowClear />
		    </Form.Item>
		    <Form.Item>
				<UploadAvatar apiPostEntity={apiPostEntity} setIri={setIri} />
		    </Form.Item>
		    <Form.Item>
		        <Button type="primary" htmlType="submit">
		    	    Etapes suivantes >>
		        </Button>
		    </Form.Item>
		</Form>
	)
}