import React from 'react';
import { Layout, Avatar, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuthContext } from '../providers/AuthProvider.js';
const { Header } = Layout;

const MyHeader = () => {

    const [authState, authDispatch] = useAuthContext();
    const { auth } = authState;
    const { authLogin, authIsLogged } = authDispatch;

	 const menu = (
		<Menu>
			<Menu.Item key="0">
			    <a href="">Votre profil</a>
			</Menu.Item>
			<Menu.Divider />
		    <Menu.Item key="1">
			    <a href="/logout">Logout</a>
			</Menu.Item>
		</Menu>
	);

	 console.log(auth)

	return (
	    <Header className="header">
	    	{
	    		authIsLogged()
	    		?
	    			<div className="header_action">
	    				{
			    			auth.roles.includes('ROLE_ADMIN')
			    			?
			    			    <Button type="link" icon={<PlusOutlined />} onClick={() => window.location.href = "/admin/new"} />
			    			:
			    				null
			    		}
		    			<Dropdown overlay={menu} trigger={['click']} placement="bottomRight" className="dropdown_avatar">
		    				{
				    			auth.Avatar?
				    				<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" onClick={e => e.preventDefault()}/>
				    			: 
				    				<Avatar icon={<UserOutlined />} onClick={e => e.preventDefault()}/>
				    		}
		    			</Dropdown>
		    		</div>
	    		: 	
	    			null
	    	}
	    </Header>
	);
};

export default MyHeader;
