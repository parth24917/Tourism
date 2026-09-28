import React, { useState, useEffect } from 'react';

import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import AppButton from './AppButton';

function Navbar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TRVL
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/travbud'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                TravBud
              </Link>
            </li>
          </ul>
          {button &&  <AppButton
                    variant="outlined"
                    onDark
                    size="large"
                    onClick={() => navigate('/contact-us')}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Contact Us
                  </AppButton>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
