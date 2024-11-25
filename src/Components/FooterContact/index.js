import './index.css'
import {MdEmail} from 'react-icons/md'
import {FaTwitter, FaLinkedin, FaGithub} from 'react-icons/fa'

const FooterContact = () => (
  <div className="footer-bg-cont">
    <div>
      <a
        rel="noreferrer"
        href="mailto:tejaswikurapati88@gmail.com"
        target="_blank"
      >
        <MdEmail className="iconsfooter" />
      </a>
      <FaTwitter className="iconsfooter" />
      <a rel="noreferrer" href="https://www.linkedin.com/in/1tejaswi1/">
        <FaLinkedin className="iconsfooter" />
      </a>
      <a rel="noreferrer" href="https://github.com/tejaswikurapati88">
        <FaGithub className="iconsfooter" />
      </a>
    </div>
    <p className="dev">
      Developed by <span className="myname">@Tejaswi Kurpati</span>
    </p>
  </div>
)

export default FooterContact
