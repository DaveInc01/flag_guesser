import { toLower } from "lodash";
import { ICountry, Countries } from "../../constants/countries";

export const MultiPlayerPage = ()=>{
    // const iconClassname = `fi fi-`
    const flipImageFolder = `${process.env.PUBLIC_URL}/assets/images/each_country/`;
    
    return(
        <>
        {Countries.map((country:ICountry, index:number)=>(
            <div style={{display: "flex"}}>
                <div style={{fontSize: "200px"}} className={`fi fi-${country.code}`}></div>
                <img style={{width: "200px"}} src={`${flipImageFolder}${country.name.toLowerCase().replace(/ /g, '')}.1.jpg`} alt="" />
                <div>{index} {country.name} | {country.name.toLowerCase().replace(/ /g, '')}</div>
            </div>
        ))}
        </>
    )
}