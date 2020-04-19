import React, {useState} from 'react'
import { Upload, message, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default function UploadVideo({apiPostEntityWithProgress, apiPostEntity, apiDeleteEntity, iri, multiple}) {

    const [progress, setProgress] = useState([])
    const [names, setNames] = useState([])

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
        formData.append('production', iri);

        apiPostEntityWithProgress("media_objects", formData, implementsProgress, (response1) => {
        	console.log(response1)
	        if (response1['@type'] === "hydra:Error") {

	        } else {
				let data = {
					production: iri,
					mediaObject: response1['@id']
				}
				apiPostEntity('works', data, response2 => {
					console.log(response2)
					console.log(response1)
					if (response2['@type'] === "hydra:Error") {
						apiDeleteEntity('media_objects', response1.id)
					}
				})
	        }
	    });
	}

	function beforeUpload(info) {
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
					multiple={multiple}
					customRequest={upload}
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