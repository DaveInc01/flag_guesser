import { toLower } from "lodash";
import { ICountry, Countries } from "../../constants/countries";
import { Fragment } from "react";
import { RegisterModal } from "../modals/Register";

export const MultiPlayerPage = ()=>{
    return(
        <Fragment>
            <RegisterModal /> 
        </Fragment>
    )
}