'use client';
import components from '../style/Components.module.css'
import '../style/Modal.css'
import { useState, Fragment } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const userData:userType = {
	username: '',
	password: ''
}

type userType = {
	username: string,
	password: string
}

const handleValue = (field:keyof userType, event:any)=>{

	userData[field] = event.target.value;
}


export default function LoginPage({}) {
	const [validAlert, setValidAlert] = useState('')
	const [show_pass, set_show_pass] = useState(true);
	const router = useRouter();
	const navigate = (path: string) => router.push(path);
	const sendLoginRequest = (userData:userType)=>{
		setValidAlert("")
		console.log("Sending user data: ", userData);
		const config:AxiosRequestConfig = {
			method: "post",
			url: 'http://localhost:8889/auth/login',
			headers: {"Content-Type": "application/json"},
			data: userData,
		};
		axios(config).then(res => {
			console.log(res)
			// this.props.history.push('/path')
			navigate('/');
		}).catch(err =>{
			setValidAlert("Login failed: " + err.response?.data?.message || "Login or password is incorrect");
			console.log("ERROR: ", err)
		})
	}

	return (
		<Fragment>
			<div className="modal-style">
				{validAlert.length > 0 && (
				<span className="absolute left-1/2 -translate-x-1/2 top-[10px] text-sm text-rose-600 w-[400px]">
					{validAlert}
				</span>)}
				<input 
					type="text" name='username' 
					className={components.textInput} 
					placeholder='Username' 
					onChange={(e) => handleValue('username', e)}
				/>
				<div className='relative'>
					<input 
						autoComplete="off" 
						type={show_pass ? 'password' : 'text'} 
						name='password' 
						className={components.textInput} 
						placeholder='Password' 
						onChange={(e) => handleValue('password', e)}
					/>
					<img className=' cursor-pointer absolute right-[15px] top-1/2 -translate-y-1/2' src='assets/images/icons/eye.png'alt="eye icon" onClick={() => set_show_pass(!show_pass)} />	
				</div>
				<input onClick={()=>sendLoginRequest(userData)} type="button" className={components.textInput} value="Login" />
				<span className="text-sm text-gray-300">Don't have an account?</span>
				<Link href="/register" className='text-sm text-blue-500'> Register</Link>
			</div>
		</Fragment>
		
	);
};