import React from 'react'

// interface ProductProps {
// 	product: Iproduct
// }

export function Product(props: any){
	return(
		<div className='border py-2 px-4 rounded flex flex-col items-center mb-2'>
			Product name is {props.name}
		</div>
	)
}

