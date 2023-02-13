import facebookIcon from '../../assets/icons/facebook-icon.svg';
import instagramIcon from '../../assets/icons/instagram-icon.svg';
import linkedinIcon from '../../assets/icons/linkedin-icon.svg';
import vkIcon from '../../assets/icons/vk-icon.svg';

import cl from './footer.module.scss';

export const Footer = () => (
  <footer className={cl.footer}>
    <p className={cl.copyright}>© 2020-2023 Cleverland. Все права защищены.</p>
    <div className={cl.social}>
      <img className={cl.socialIcon} src={facebookIcon} alt='facebook' />
      <img className={cl.socialIcon} src={instagramIcon} alt='instagram' />
      <img className={cl.socialIcon} src={vkIcon} alt='vk' />
      <img className={cl.socialIcon} src={linkedinIcon} alt='linkedin' />
    </div>
  </footer>
);
