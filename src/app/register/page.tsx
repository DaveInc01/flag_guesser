"use client";

import Link from "next/link";
import { useState, useRef, useEffect, Fragment } from "react";
import components from "../style/Components.module.css";
import "../style/Modal.css";
import { Countries, ICountry } from "../constants/countries";
import { socket } from "../socket";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

const validation = {
  username: /^.{4,16}$/,
  email:
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  password: /^.{6,32}$/,
  rePassword: /^.{6,32}$/,
};

const errorMessages = {
  username: "Username should be between 4 and 16 characters",
  email: "Invalid Email",
  password: "Password should be between 6 and 32 characters",
  rePassword: "Reenter the same password",
};

// const socketInstance = socket();

const clients = {};

const userData: userType = {
  username: "",
  email: "",
  password: "",
  rePassword: "",
};

type userType = {
  username: string;
  email: string;
  password: string;
  rePassword: string;
};

const handleValue = (field: keyof userType, event: any) => {
  userData[field] = event.target.value;
};

const sendRegisterRequest = (userData: userType) => {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:8889/auth/register",
    headers: { "Content-Type": "application/json" },
    data: userData,
  };
  axios(config)
    .then((res) => console.log(res))
    .catch((err) => console.log("ERROR: ", err));
};

export default function RegisterPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [validAlert, setValidAlert] = useState("");
  const [show_pass, set_show_pass] = useState(true);
  const [show_pass_second, set_show_pass_second] = useState(true);
  const socketRef = useRef(null);

  function validateCheck(e: any): void {
    e.preventDefault();
    console.log("data", userData);
    for (const [key, value] of Object.entries(userData)) {
      if (!validation[key as keyof typeof validation].test(value)) {
        setValidAlert(errorMessages[key as keyof typeof errorMessages]);
        return;
      }
    }
    if (userData.password !== userData.rePassword) {
      setValidAlert(errorMessages.rePassword);
      return;
    }
    setValidAlert("");
    sendRegisterRequest(userData);
  }

  const handleCountrySelect = (countryName: ICountry["name"]) => {
    setSelectedCountry(countryName);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const createRoom = () => {
    let clientId;
    let ws = new WebSocket("ws://localhost:9090");

    localStorage.setItem("nickname", userData.username);

    socket();

    ws.onmessage = (message) => {
      const response = JSON.parse(message.data);
      // connect
      if (response.method === "connect") {
        const payload = {
          method: "create",
          clientId: response.clientId,
          nickname: userData.username,
          country: selectedCountry,
          mode: "1v1",
        };
        clientId = response.clientId;
        console.log(response);
        ws.send(JSON.stringify(payload));
      }
      // create
      else if (response.method === "create") {
        const clientId = response.clientId;
        console.log("Game was succefully created, your Id - ", clientId);
      } else if (response.method === "wait") {
        console.log("Finding a game ...\n", response);
      } else if (response.method === "play") {
        console.log("Game is sucssefully created", response);
      } else if (response.method === "fail") {
        console.log("Can't create a game", response);
      }
    };
  };

  return (
    <Fragment>
      <div className="modal-style">
        {validAlert.length > 0 && (
          <span className="absolute left-1/2 -translate-x-1/2 top-[10px] text-sm text-rose-600 w-[400px]">
            {validAlert}
          </span>
        )}
        <input
          type="text"
          name="username"
          className={components.textInput}
          placeholder="Username"
          onChange={(e) => handleValue("username", e)}
        />
        <input
          autoComplete="off"
          type="text"
          name="Email"
          className={components.textInput}
          placeholder="Email"
          onChange={(e) => handleValue("email", e)}
        />
        <div className="relative">
          <input
            autoComplete="off"
            type={show_pass ? "password" : "text"}
            name="password"
            className={components.textInput}
            placeholder="Password"
            onChange={(e) => handleValue("password", e)}
          />
          <img
            className=" cursor-pointer absolute right-[15px] top-1/2 -translate-y-1/2"
            src="assets/images/icons/eye.png"
            alt="eye icon"
            onClick={() => set_show_pass(!show_pass)}
          />
        </div>
        <div className="relative">
          <input
            autoComplete="off"
            type={show_pass_second ? "password" : "text"}
            name="password"
            className={components.textInput}
            placeholder="Password Confirmation"
            onChange={(e) => handleValue("rePassword", e)}
          />
          <img
            className=" cursor-pointer absolute right-[15px] top-1/2 -translate-y-1/2"
            src="assets/images/icons/eye.png"
            alt="eye icon"
            onClick={() => set_show_pass_second(!show_pass_second)}
          />
        </div>
        {/* 
                '''Country selection dropdown'''
                <label htmlFor="country">Country</label>
                <div className={components.textInput}>
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
                </div> */}
        <input
          onClick={validateCheck}
          type="button"
          className={components.textInput}
          value="Register"
        />
        <span className="text-sm text-gray-300">Already have an account?</span>
        <Link href="/login" className="text-sm text-blue-500">
          {" "}
          Login
        </Link>
      </div>
    </Fragment>
  );
}
