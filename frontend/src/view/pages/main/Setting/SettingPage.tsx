import ProfileSetting from '../../../components/SettingView/ProfileSetting'
import "../../../../css/Setting.css"

function SettingPage() {


  return (
    <div className='main-page'>
        <h3>Configuraciones</h3>

        <div className='form-con'>
            <div className="pd-title-con" style={{height:"50px"}}>
                <h4 className='subtitle'>Perfil</h4>
            </div>
            <ProfileSetting/>
        </div>
    </div>
  )
}

export default SettingPage