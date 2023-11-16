import { useState, useEffect } from 'react'
import '../../style/RegInput.css'

const validdata = /.{4,32}$/

export const RegInput = ({name}:{name:string})=>{
    let is_password:boolean = false
    if (name.search('Password') !== -1)
    is_password = true
    const [show_pass, set_show_pass]= useState(true)
    let [valid_value, set_valid_value] = useState(true)
    function valueChange(event:any){
        set_valid_value(()=>{
            console.log(validdata.test(event.target.value))
            return validdata.test(event.target.value)
        })

    }

    return (
        <div className='main-div'>
            <label htmlFor="password">{name}</label>
            <input type={(is_password && show_pass) ? 'password' : 'text'} placeholder={name} id="password" className={is_password ? 'input-password' : 'input-text'} onChange={valueChange}/>
                {
                    is_password && 
                    <img src='assets/images/icons/eye.png' style={{cursor: 'pointer'}} className='pass-eye' alt="" onClick={() => set_show_pass(!show_pass)} />
                }
                {
                    valid_value === false &&
                    <span style={{color: 'red',}} className={is_password ? 'password-span' : ''}>Minimum 4 character</span>
                }
        </div>
    )
}

function useEfffect(arg0: () => void) {
    throw new Error('Function not implemented.')
}
