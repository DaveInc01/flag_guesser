import { couldStartTrivia } from 'typescript';
import '../../../src/style/Modal.css'
import { Countries, ICountry } from '../../constants/countries'
import { useState, useRef } from 'react';

const clients = {}

export const RegisterModal = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [validAlert, setValidAlert] = useState(false)
    const nickname = useRef<HTMLInputElement>()
    const handleCountrySelect = (countryName: ICountry['name']) => {
        setSelectedCountry(countryName);
        setIsDropdownOpen(false); // Close dropdown after selection
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const validateCheck = () => {
        if(nickname.current != undefined && nickname.current.value && selectedCountry){
            if(nickname.current.value.trim() != '')
                createRoom()
            else
                setValidAlert(true)
        }
        else
            setValidAlert(true)
    }

    const createRoom =() => {
        setValidAlert(false)
        let clientId;
        let ws = new WebSocket("ws://localhost:9090")
        ws.onmessage = message => {
            const response = JSON.parse(message.data)
            // connect
            if(response.method === "connect"){
                const payload = {
                    "method": "create",
                    "clientId": response.clientId,
                    "nickname": nickname.current?.value,
                    "country": selectedCountry,
                    "mode": "1v1"
                }
                clientId =  response.clientId
                console.log(response)
                ws.send(JSON.stringify(payload))
            }
            // create
            else if(response.method === "create"){
                const clientId = response.clientId
                console.log("Game was succefully created, your Id - ", clientId)
            }
            else if(response.method === "wait")
            {
                
                console.log("Finding a game ...\n", response)
            }
            else if(response.method ==="play")
            {
                console.log("Game is sucssefully created", response)
            }
            else if(response.method === "fail")
            {
                console.log("Can't create a game", response)
            }
        }
    }

    return (
        <div className="modal-style" style={{top: '40%'}}>
            {validAlert && <span style={{color: 'red'}}>Pleas choose a nickname and country</span>}
            <label htmlFor="username">Username</label>
            <input autoComplete="off" type="text" name='username' className='text-input' placeholder='Username' ref={nickname as React.LegacyRef<HTMLInputElement>}/>
            <label htmlFor="country">Country</label>
            <div className="text-input">
                <div
                    className="dropdown-selected" 
                    onClick={toggleDropdown}
                >
                    {selectedCountry || "Choose your country"}
                </div>
                {isDropdownOpen && (
                    <ul className="dropdown-options">
                        {
                            Countries.map((country, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => handleCountrySelect(country.name)} 
                                    className="dropdown-item"
                                >   
                                    <span className={`fi fi-${country.code}`}></span>
                                    <span className="country-name">{country.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
            <input onClick={validateCheck} type="button" className='text-input' value="Create a game" />
        </div>
    );
};