import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="Footer">
    <div className="icons-container">
      <FaGoogle size={25} />
      <FaTwitter size={25} />
      <FaInstagram size={25} />
      <FaYoutube size={25} />
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer
