import React, {useState} from 'react'
import {Upload, message} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function UploadAvatar({apiPostEntity, setIri}) {

	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState(null)

	function beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
		    message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
		    message.error('Image must smaller than 2MB!');
		}
		if (isJpgOrPng && isLt2M) { setLoading(true) }
		return isJpgOrPng && isLt2M;
	}

	function handleChange (info) {
		//console.log('change')
	}

	function upload(info) {
		//console.log('up')
		let formData = new FormData();
        formData.append('file', info.file);

        apiPostEntity("media_objects", formData, response => {
        	console.log(response)
	        if (response['@type'] === "hydra:Error") {

	        } else {
				setIri(response['@id'])
				setImageUrl('http://localhost:8000' + response.contentUrl)
				setLoading(false)
	        }
	    });
	}

	const uploadButton = (
        <div>
      		{loading ? <LoadingOutlined /> : <PlusOutlined />}
         	<div className="ant-upload-text">Upload</div>
        </div>
    );

	return (
		<Upload
	        listType="picture-card"
	        className="avatar-uploader"
	        showUploadList={false}
	        beforeUpload={beforeUpload}
	        onChange={handleChange}
	        customRequest={upload}
	    >
	        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
	    </Upload>
	)
}