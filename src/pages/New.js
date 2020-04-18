import React, {useState} from 'react'
import {useApiContext} from '../providers/ApiProvider.js';
import { Upload, message, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default function New({multiple}) {

    const [apiState, apiDispatch] = useApiContext();
    const {apiPostEntityWithProgress} = apiDispatch;
    const [progress, setProgress] = useState([])
    const [names, setNames] = useState([])
    const [index, setIndex] = useState(0)

	function implementsProgress(pro) {
			let newArr = progress
			const pos = newArr.map(function(e) { return e.total; }).indexOf(pro.total);

			if (pos >= 0) {
				newArr[pos] = pro
			} else {
				newArr.push(pro)
			}
			
			setProgress([...newArr])
	}

	function upload(info) {
		let formData = new FormData();
        formData.append('file', info.file);

        apiPostEntityWithProgress("media_objects", formData, implementsProgress, (response) => {
        	console.log(response)
	        if (response['@type'] === "hydra:Error") {

	        } else {

	        }
	    });
	}

	function onChange(info) {
		//console.log('change')
	}

	function beforeUpload(info) {
		//console.log('before')
		if (!(/video/).test(info.type)) {
			message.error('format non valide')
			return false;
		}
		if (info.size > 2000000000) {
			message.error('Video trop lourde')
			return false;
		}

		setNames(names => [...names, info.name])
	}

	return (
		<div className="container_page">
			<div className="flex-center">
				<Dragger
					name='file'
					multiple={true}
					customRequest={upload}
					onChange={onChange}
					style={{padding: 20}}
					beforeUpload={beforeUpload}
					showUploadList={false}
				 >
				    <p className="ant-upload-drag-icon">
				        <InboxOutlined />
				    </p>
				    <p className="ant-upload-text">Cliquez ou déposez votre fichier ici</p>
				    <p className="ant-upload-hint">
				      Supporte un seul fichier, n'essayez pas d'en deposer plusieur
				    </p>
				</Dragger>
			</div>
			<div className="flex-center">
			{
				progress
				?
					<div>
					{
						progress.map((elem, id) => (
							<div key={id}>
								<span>{names[id]}</span>
							    <Progress
							    	style={{minWidth: 300}}
							        strokeColor={{
							        	'0%': '#108ee9',
							        	'100%': '#87d068',
							      	}}
							        percent={Math.round(progress[id].loaded * 100 / progress[id].total)}
							    />
							</div>
						))
					}
					</div>		
				:
					null
			}
			</div>		
		</div>
	)
}