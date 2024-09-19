import { useEffect, useState } from 'react'
import { getImageByIdRequest } from '../../../api/clientRequest'
import { Skeleton } from 'primereact/skeleton';

interface Props{
    id: number
}

function ProductImage({id}: Props) {

    const [image, setImage] = useState<string>("")
    const http = "http://localhost:3000/"+image


    async function getImage(){
        try {
            const response = await getImageByIdRequest(id as number)
            setImage(response.data) 
        } catch (error) {
            console.log(error)
        }
    }
    
    
    useEffect(() => {
        getImage()
    }, [])

    if(!image){
        return <td>
            <Skeleton size="60px" className="mr-2"></Skeleton>
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