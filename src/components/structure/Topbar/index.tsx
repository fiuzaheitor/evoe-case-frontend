import { useNavigate } from 'react-router-dom'
import t from './Topbar.module.scss'
import { isTokenValid, useAuthContext } from '../../../hoc/AuthContext'
import { Logout } from '@mui/icons-material'
import { getCookie } from '../../../utils/cookies'

export const Topbar = ({ mobile }: { mobile?: boolean }) => {
  const navigate = useNavigate()
  const auth: any = isTokenValid(getCookie('_a_tc') as string)
  const logout = useAuthContext().logout

  return (
    <div className={`${mobile ? t.mobile : ''} ${t.topbar}`}>
      <div className={t.topbar__left}>
        <img src="https://www.evoe.cc/assets/logo-DM0oKXLi.png" alt="Logo" />
      </div>
      <div className={t.topbar__right}>
        {auth && (
          <div className={`${t.topbar__right__item} ${t.topbar__logout}`}>
            <Logout
              onClick={(e: any) => {
                e.preventDefault()
                logout()
                navigate('/signin')
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
