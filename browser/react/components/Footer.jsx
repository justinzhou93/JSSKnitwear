import React from 'react';
import { Link } from 'react-router';

export default function Footer (){
  return (
    <footer>
      <li><Link to={'/home'}>© 2017 JSS KNITWEAR</Link></li>
      <li><Link to={'/home'}>Privacy Policy</Link></li>
      <li><Link to={'/home'}>Terms & Conditions</Link></li>
    </footer>
  )
}
