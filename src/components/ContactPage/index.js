import { FaLinkedin, FaInstagramSquare } from 'react-icons/fa';
import './style.scss';

function ContactPage() {
  return (
    <div className="contactPage">
      <div className="contactPage__person">
        <div className="contactPage__person-image" style={{ backgroundImage: "url(https://drive.google.com/uc?export=view&id=1AVc9isdCZXmvahxUTdiR0V1bZ7pt0Gci)" }} />
        <h2 className="contactPage__person-name">Hadrien Rudich</h2>
        <div className="contactPage__person-roles">
          <h3 className="contactPage__person-title">Roles</h3>
          <ul className="contactPage__person-roles-list">
            <li className="contactPage__person-roles-list-item">Dev Back</li>
            <li className="contactPage__person-roles-list-item">Product owner</li>
            <li className="contactPage__person-roles-list-item">Scrum Master</li>
          </ul>
        </div>
        <div className="contactPage__person-socials">
          <h3 className="contactPage__person-title">Socials</h3>
          <div className="contactPage__person-socials-list">
            <a className="contactPage__person-socials-social" href='https://www.linkedin.com/in/hadrien-rudich/' target="_blank" rel='noreferrer'>
              LinkedIn
              <span className="contactPage__person-socials-social-icon">
                <FaLinkedin />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="contactPage__person">
        <div className="contactPage__person-image" style={{ backgroundImage: "url(https://www.photofunky.net/output/image/c/d/5/c/cd5c56/photofunky.gif)" }} />
        <h2 className="contactPage__person-name">Arnaud Jallut</h2>
        <div className="contactPage__person-roles">
          <h3 className="contactPage__person-title">Roles</h3>
          <ul className="contactPage__person-roles-list">
            <li className="contactPage__person-roles-list-item">Lead dev Back</li>
          </ul>
        </div>
        <div className="contactPage__person-socials">
          <h3 className="contactPage__person-title">Socials</h3>
          <div className="contactPage__person-socials-list">
            <a className="contactPage__person-socials-social"  href='https://www.linkedin.com/in/arnaud-jallut/' target="_blank" rel='noreferrer'>
              LinkedIn 
              <span className="contactPage__person-socials-social-icon">
                <FaLinkedin />
              </span>
            </a>            
          </div>
        </div>
      </div>
      <div className="contactPage__person">
        <div className="contactPage__person-image" style={{ backgroundImage: "url(https://media1.giphy.com/media/tsRqkQCs972nTvtojc/giphy.gif?cid=790b761120ac6a02969703e432164e1e5aad1baed551a0c1&rid=giphy.gif&ct=g)" }} />
        <h2 className="contactPage__person-name">Louis-Cyrus Sanjabi</h2>
        <div className="contactPage__person-roles">
          <h3 className="contactPage__person-title">Roles</h3>
          <ul className="contactPage__person-roles-list">
            <li className="contactPage__person-roles-list-item">Lead dev Front</li>
          </ul>
        </div>
        <div className="contactPage__person-socials">
          <h3 className="contactPage__person-title">Socials</h3>
          <div className="contactPage__person-socials-list">
            <a className="contactPage__person-socials-social" href='https://www.linkedin.com/in/louis-cyrus-sanjabi/' target="_blank" rel='noreferrer'>
              LinkedIn
              <span className="contactPage__person-socials-social-icon">
                <FaLinkedin />
              </span>
            </a>
            <a className="contactPage__person-socials-social" href='https://www.instagram.com/lcsanjabi/' target="_blank" rel='noreferrer'>
              Instagram
              <span className="contactPage__person-socials-social-icon">
                <FaInstagramSquare />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="contactPage__person">
        <div className="contactPage__person-image" style={{ backgroundImage: "url(https://media4.giphy.com/media/cNeuWYGCJfRdS9j89F/giphy-downsized-large.gif)" }} />
        <h2 className="contactPage__person-name">Léo Chenot</h2>
        <div className="contactPage__person-roles">
          <h3 className="contactPage__person-title">Roles</h3>
          <ul className="contactPage__person-roles-list">
            <li className="contactPage__person-roles-list-item">Dev Front</li>
            <li className="contactPage__person-roles-list-item">Git Master</li>
          </ul>
        </div>
        <div className="contactPage__person-socials">
          <h3 className="contactPage__person-title">Socials</h3>
          <div className="contactPage__person-socials-list">
            <a className="contactPage__person-socials-social" href='https://www.linkedin.com/in/leo-chenot/' target="_blank" rel='noreferrer'>
              LinkedIn
              <span className="contactPage__person-socials-social-icon">
                <FaLinkedin />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
