import React, { useEffect, useState } from 'react'
import { Props } from '../../../interfaces/autInterface'
import { getImageByIdRequest } from '../../../api/clientRequest'

function ProductImage({id}: Props) {

    const [image, setImage] = useState<string>("")
    async function getImage(){
        try {
            const response = await getImageByIdRequest(id as number)
            setImage(response.data) 
        } catch (error) {
            console.log(error)
        }
    }
    const http = "http://localhost:3000/"+image
    useEffect(() => {
        getImage()
    }, [])

    if(!image){
        return <td>
            <div className='box-img-loading'></div>
        </td>
    }else{
        return (
            <td className='td-img'>
                <img src={http} />
            </td>
        )
    }
}

export default ProductImage