import React, {useState} from 'react'
import {useApiContext} from '../providers/ApiProvider.js';
import { Upload, message, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default function New() {

    const [apiState, apiDispatch] = useApiContext();
    const {apiPostEntityWithProgress} = apiDispatch;
    const [progress, setProgress] = useState(null)

	console.log(progress)

	function upload(info) {
		//console.log('upload')
		let formData = new FormData();
        formData.append('file', info.file);

        apiPostEntityWithProgress("media_objects", formData, setProgress, (response) => {
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
		//console.log(info)
		if (!(/video/).test(info.type)) {
			message.error('format non valide')
			return false;
		}
		if (info.size > 2000000000) {
			message.error('Video trop lourde')
			return false;
		}

		message.success("c'est partie mon kiki")
	}

	return (
		<div className="container_page">
			<div className="flex-center">
				<Dragger
					name='file'
					multiple={false}
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
			{
				progress
				?
					<div className="flex-center">
					    <Progress
					        type="circle"
					        strokeColor={{
					        	'0%': '#108ee9',
					        	'100%': '#87d068',
					      	}}
					      percent={Math.round(progress.loaded * 100 / progress.total)}
					    />
					</div>				
				:
					null
			}

		</div>
	)
}