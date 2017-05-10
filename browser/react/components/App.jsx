import React from 'react';
import NavbarContainer from '../containers/NavBarContainer';
import ModalRootContainer from '../modals/ModalRootContainer';
import Footer from '../components/Footer';

export default function App ({children}) {
  return (
    <div>
      <NavbarContainer />
        { children }
      <ModalRootContainer />
      <Footer />
    </div>
  );
}
