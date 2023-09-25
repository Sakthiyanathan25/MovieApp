import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="Footer">
    <ul className="icons-container">
      <li>
        <FaGoogle size={25} />
      </li>
      <li>
        <FaTwitter size={25} />
      </li>
      <li>
        <FaInstagram size={25} />
      </li>
      <li>
        <FaYoutube size={25} />
      </li>
    </ul>
    <p className="contact-para">Contact Us</p>
  </div>
)

export default Footer
