import React from "react";
import {Routes as RoutList} from "../routers"
import { Route, Routes } from "react-router-dom";

console.log("#####", RoutList)

export const RouterComponent:React.FC = () => (
    <Routes>
        {RoutList.map(({component, url}, index) => 
             <Route path={url} Component={component} key={index}/>
        )}
    </Routes> 
)
