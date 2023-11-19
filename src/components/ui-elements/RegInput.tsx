import { useState } from 'react'
import '../../style/RegInput.css'
import axios from 'axios'

interface IRegInput{
    name:string,
    retValue: string 
}

export const RegInput = ({inputName,handleValue}:{inputName:string, handleValue(field:number, event: React.ChangeEvent<HTMLInputElement>):any}) =>{
    const [show_pass, set_show_pass]= useState(true)

    let field:number = 0
    switch(inputName)
    {
        case 'Username':
            field = 0   
            break;
        case 'E-mail':
            field = 1   
            break;
        case 'Password':
            field = 2 
            break  
        case 'RePassword':
            field = 3  
            break 
    }

    return (
        <div className='main-div'>
            <label htmlFor="password">{inputName}</label>
            <input type={(field > 1 && show_pass) ? 'password' : 'text'} placeholder={inputName} className={field > 0 ? 'input-password' : 'input-text'} onChange={(e) => handleValue(field, e)}/>
            {
                field > 1 && 
                <img src='assets/images/icons/eye.png' style={{cursor: 'pointer'}} className='pass-eye' alt="" onClick={() => set_show_pass(!show_pass)} />
            }
        </div>
    )
        
}
