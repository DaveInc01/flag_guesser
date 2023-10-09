import React, { ComponentType } from 'react'
import '../../style/Login.css'
import { Link } from 'react-router-dom';

export const RegisterPage:ComponentType<{}> = () => (
	<div>
		<form style={{height: 610}}>
			<h3>Register Now</h3>

			<label htmlFor="username">Username</label>
			<input type="text" placeholder="Username" id="username" />

			<label htmlFor="password">Password</label>
			<input type="password" placeholder="Password" id="password" />
			<label htmlFor="password">Reenter Password</label>
			<input type="password" placeholder="Reenter same password" id="password" />
			<br />
			<Link to="./Login"  className='underline'>Login</Link>
			<button>Register</button>
		</form>
	</div>
)