import { couldStartTrivia } from 'typescript';
import '../../../src/style/Modal.css'
import { Countries, ICountry } from '../../constants/countries'
import { useState, useRef } from 'react';
import  WaitModal from './WaitModal';
import { set } from 'lodash';

export function leaveGame () {
    if(client.ws)
    { 
        defaultPayload.method = "leave";
        client.ws.send(JSON.stringify(defaultPayload))
    }
}

interface Ipayload {
    method: string,
    clientId: string,
    gameId: string | undefined,
    nickname: string | undefined,
    country: string,
    mode: string
}

interface Iclient {
    clientId: string;
    nickname: string;
    country: string;
    ws: WebSocket;
}

let client: Partial<Iclient> = {}
let defaultPayload: Partial<Ipayload> = {}
const game = {}

export const RegisterModal = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [validAlert, setValidAlert] = useState(false)
    const [showWait, setShowWait] = useState(false);
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

    

    const createRoom = () => {
        setValidAlert(false)
        let clientId;
        let ws = new WebSocket("ws://localhost:9090")
        ws.onmessage = message => {
            const response = JSON.parse(message.data)
            clientId =  response.clientId
            // connect
            if(response.method === "connect"){
                const payload: Ipayload = {
                    "method": "create",
                    "clientId": response.clientId,
                    "gameId": undefined,
                    "nickname": nickname.current?.value,
                    "country": selectedCountry,
                    "mode": "1v1"
                }
                //set default payload above parameters for first
                defaultPayload = payload;
                //set global client 
                client.clientId = payload.clientId
                client.nickname = payload.nickname
                client.country = payload.country
                client.ws = ws
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
                setShowWait(true)
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
            {showWait &&
            <WaitModal cancelButton={true} setShowWait={setShowWait}/>}
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
