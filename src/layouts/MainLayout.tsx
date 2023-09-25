import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/main.css';

function MainLayout() {
  return (
    <>
        <Header />
        <article className="content">

            <Outlet />

        </article>
        <Footer />
    </>
  );
}


export default MainLayout;
