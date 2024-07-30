
import { Props } from '../../../interfaces/autInterface'
import { getImageByIdRequest } from '../../../api/clientRequest'
import { useEffect, useState } from 'react'

function ProductTargetImg({id}: Props) {
  
  
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
        return <div>
            <div className='box-img-loading'></div> 
        </div>
    }else{
        return (
            <div className='product-target-img-con'>
                <img src={http}/>
            </div>
        )
    }
}

export default ProductTargetImg