import React from 'react'
import profileImg from "../../../assets/profile.png"

interface Props{
    fileURL: string
    http: string
    profileImgId: number | null
}

function ProfileImage(prop: Props) {

  return (
    <div className='setting-profile-img-con'>
        <img src={!prop.fileURL? profileImg: prop.fileURL} alt="" />
    </div>
  )
}

export default ProfileImage