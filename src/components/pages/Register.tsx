import React, { ComponentType, useState } from 'react'
import '../../style/Login.css'
import { Link } from 'react-router-dom';
import { RegInput } from '../ui-elements/RegInput';

export enum fields {
	'username',
	'password',
	'rePassword'
}

const passworWalidation = (username:string, password:string, rePassword:string) =>{

}

interface IUserinputData{
	username:string
	password:string,
	rePassword:string
}
const validdata = /.{4,32}$/

export const RegisterPage:ComponentType<{}> = () => {
	const userinputData:IUserinputData = {
		username: '',
		password: '',
		rePassword: ''
	}
	const handleValue = (field:number, event:any)=>{
		if(field === fields.username)
			userinputData.username = event.target.value
		else if(field === fields.password)
			userinputData.password = event.target.value
		else if(field === fields.rePassword)
			userinputData.rePassword = event.target.value
		console.log(userinputData)
	}
	return(
		<div>
			<form style={{height: 610}}>
				<h3>Register Now</h3>
				<span className='errorLog'>Error message</span>			
				<RegInput inputName='Username' handleValue={handleValue} />
				<RegInput inputName='Password' handleValue={handleValue}/>
				<RegInput inputName='RePassword' handleValue={handleValue} />
				<br />
				<Link to="./Login"  className='underline'>Login</Link>
				<button formMethod='post'>Register</button>
			</form>
		</div>
	
	)
}