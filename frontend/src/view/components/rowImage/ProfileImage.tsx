
interface Props{
    fileURL: string
    image: string
}

function ProfileImage(prop: Props) {


  return (
    <div className='setting-profile-img-con'>
        <img src={!prop.fileURL? prop.image: prop.fileURL} alt="" />
    </div>
  )
}

export default ProfileImage