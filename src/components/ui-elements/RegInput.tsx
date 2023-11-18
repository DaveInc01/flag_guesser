import { useState } from 'react'
import '../../style/RegInput.css'


interface IRegInput{
    name:string,
    retValue: string 
}

export const RegInput = ({inputName,handleValue}:{inputName:string, handleValue(field:number, event: any):any}) =>{
    const [show_pass, set_show_pass]= useState(true)

    let field:number = 0
    switch(inputName)
    {
        case 'Username':
            field = 0   
            break;
        case 'Password':
            field = 1 
            break  
        case 'RePassword':
            field = 2  
            break 
    }

    return (
        <div className='main-div'>
            <label htmlFor="password">{inputName}</label>
            <input type={(field > 0 && show_pass) ? 'password' : 'text'} placeholder={inputName} className={field > 0 ? 'input-password' : 'input-text'} onChange={(e) => handleValue(field, e)}/>
            {
                field > 0 && 
                <img src='assets/images/icons/eye.png' style={{cursor: 'pointer'}} className='pass-eye' alt="" onClick={() => set_show_pass(!show_pass)} />
            }
        </div>
    )
        
}
