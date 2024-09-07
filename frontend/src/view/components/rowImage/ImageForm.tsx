interface Props{
    fileURL: string
    http: string
    isEntityMode: boolean
}

function ImageForm({fileURL, http, isEntityMode}:Props) {

    if (!fileURL && !isEntityMode) {
        return(
            <div className="image-background">
                <div></div>
            </div>
        )
    }else{
        return(
            <div className="image-background">
                <img src={!fileURL? http : fileURL} width={100} height={100} />
            </div>
        )
    }
}

export default ImageForm