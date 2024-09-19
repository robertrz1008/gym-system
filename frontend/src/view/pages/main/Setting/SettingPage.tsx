import ProfileSetting from '../../../components/SettingView/ProfileSetting'
import "../../../../css/Setting.css"

function SettingPage() {


  return (
    <div className='main-page'>

        <div className='form-con' style={{marginTop:"20px"}}>
            <div className="pd-title-con" style={{height:"50px"}}>
                <h4 className='subtitle'>Perfil</h4>
            </div>
            <ProfileSetting/>
        </div>
    </div>
  )
}

export default SettingPage