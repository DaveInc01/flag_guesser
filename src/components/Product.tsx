import React from 'react'
import { useState } from "react";
import { products } from '../data/products';
import { Iproduct } from "../model"

interface ProductProps {
	product: Iproduct
}

export function Product({product}: ProductProps){
	const title = product.title;
	const price = product.price;
	const image = product.image;
	const desc = product.description;
	const [desc_toggle, set_desc_toggle] = useState(false);
	// console.log(desc_toggle);
	// set_desc_toggle(true);
	const descrip = document.getElementsByClassName('descrip')
 	return(
		<div className='border py-2 px-4 rounded flex flex-col items-center mb-2'>
			{title}<br/>
			<img src={image} className="w-1/4 py-5"/><br/>
			price : {price}
			<button></button>
			{desc_toggle && <span>{desc}</span>}
			

			<button onClick={() => {set_desc_toggle(!desc_toggle)}} type="button" className="p-4 m-5 bg-cyan-500 rounded-lg">
				read more
			</button>
		</div>
	)
}

