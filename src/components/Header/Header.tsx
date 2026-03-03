import { Link, useNavigate } from 'react-router'
import './header.scss'
import { useAuth } from '@/context/authContext'


const Header = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()
  const onLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className="header">
        <h1>Admin Panel</h1>
        <Link to={'/'}>Официанты</Link>
        <Link to={'/bartenders'}>Бармены</Link>
        <button onClick={onLogout}>Выход</button>
    </div>
  )
}

export default Header