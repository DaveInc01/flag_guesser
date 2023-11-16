import React, { ComponentType } from 'react'
import '../../style/Login.css'
import { Link } from 'react-router-dom';
import { RegInput } from '../ui-elements/RegInput';


const passworWalidation = (username:string, password:string, rePassword:string) =>{

}

export const RegisterPage:ComponentType<{}> = () => (
	<div>
		<form style={{height: 610}}>
			<h3>Register Now</h3>

			
			<RegInput name='Username'/>
			<RegInput name='Password'/>
			<RegInput name='Reenter Password'/>
			<br />
			<Link to="./Login"  className='underline'>Login</Link>
			<button formMethod='post'>Register</button>
		</form>
	</div>
)