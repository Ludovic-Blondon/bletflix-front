import React, {useState} from 'react'
import {useApiContext} from '../providers/ApiProvider.js';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default function New() {

    const [apiState, apiDispatch] = useApiContext();
    const {apiPostEntityWithProgress} = apiDispatch;
    const [progress, setProgress] = useState(null)

	// const props = {
	//   name: 'file',
	//   multiple: true,
	//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	//   onChange(info) {
	//     const { status } = info.file;
	//     if (status !== 'uploading') {
	//       console.log(info.file, info.fileList);
	//     }
	//     if (status === 'done') {
	//       message.success(`${info.file.name} file uploaded successfully.`);
	//     } else if (status === 'error') {
	//       message.error(`${info.file.name} file upload failed.`);
	//     }
	//   },
	// };

	console.log(progress)

	function upload(info) {
		console.log(info)
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
		console.log(info)
	}

	return (
		<div className="container_page">
			<Dragger
				name='file'
				multiple={false}
				customRequest={upload}
				onChange={onChange}
				style={{padding: 20}}
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
	)
}