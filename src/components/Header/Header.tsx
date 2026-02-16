import { Link } from 'react-router'
import './header.scss'


const Header = () => {
  return (
    <div className="header">
        <h1>Admin Panel</h1>
        <Link to={'/'}>Официанты</Link>
        <Link to={'/waiters'}>Бармены</Link>
    </div>
  )
}

export default Header