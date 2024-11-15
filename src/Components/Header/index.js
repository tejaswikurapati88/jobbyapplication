import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-logo"
          alt="website logo"
        />
      </Link>
      <div className="mid-cont">
        <Link to="/" className="link">
          <p className="nav-para">Home</p>
        </Link>
        <Link to="jobs" className="link">
          <p className="nav-para">Jobs</p>
        </Link>
      </div>
      <ul className="sm-container">
        <li>
          <Link to="/" className="link">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            <BsBriefcaseFill className="icon" />
          </Link>
        </li>

        <li>
          <button className="button" type="button" onClick={onLogout}>
            .<FiLogOut className="icon" />
          </button>
        </li>
      </ul>
      <button onClick={onLogout} className="logout-button" type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
