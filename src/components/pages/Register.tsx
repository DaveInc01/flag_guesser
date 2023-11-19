import React, { ComponentType, useState } from 'react'
import '../../style/Login.css'
import { Link } from 'react-router-dom';
import { RegInput } from '../ui-elements/RegInput';


const usernameValid = /^[0-9A-Za-z]{4,16}$/
const passwordValid = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/
const emailValid = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
let errorInput: number = -1 

export enum fields {
	'username',
	'email',
	'password',
	'rePassword'
}

const userinputData:IUserinputData = {
	username: '',
	email: '',
	password: '',
	rePassword: ''
}

interface IUserinputData{
	username:string,
	email: string,
	password:string,
	rePassword:string
}
const handleValue = (field:number, event:any)=>{
	if(field === fields.username)
		userinputData.username = event.target.value
	else if(field === fields.email)
		userinputData.email = event.target.value
	else if(field === fields.password)
		userinputData.password = event.target.value
	else if(field === fields.rePassword)
		userinputData.rePassword = event.target.value
}

function validateInputs(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, setErrorLog:React.Dispatch<React.SetStateAction<string>>): void {
	e.preventDefault();
	if (!usernameValid.test(userinputData.username))
	{
		errorInput = fields.username
		setErrorLog('Username: between 6 and 16 characters, alphanumeric only')

	}
	else if (!emailValid.test(userinputData.email))
	{
		errorInput = fields.username
		setErrorLog('Inavalid Email')
	}
	else if (!passwordValid.test(userinputData.password))
	{
		setErrorLog('Password: between 8 and 32 characters, at least one letter and one number')		
		errorInput = fields.username

	}
	else if (userinputData.password != userinputData.rePassword)
	{
		setErrorLog('Reenter the same password')
		errorInput = fields.username
	}
	else{
		setErrorLog('')
		console.log("All is OK")
	}
}
export const RegisterPage:ComponentType<{}> = () => {
	const [errorLog, setErrorLog] = useState('')

	return(
		<div>
			<form>
				<h3>Register Now</h3>
				<span className='errorLog'>{errorLog}</span>			
				<RegInput inputName='Username' handleValue={handleValue} />
				<RegInput inputName='E-mail' handleValue={handleValue} />
				<RegInput inputName='Password' handleValue={handleValue}/>
				<RegInput inputName='RePassword' handleValue={handleValue} />
				<br />
				<Link to="./Login"  className='underline'>Login</Link>
				<button className='auth-button' onClick={(e)=> validateInputs(e, setErrorLog)}>Register</button>
			</form>
		</div>
	
	)
}