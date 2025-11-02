import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Synapse.css';
import '../styles/components/projetos/SynapseHeader.css';
import '../styles/components/projetos/SynapseFooter.css';
import AuthentifiedComponent from '../Auth/authenticatedComponent';

function Header_MainPage(){
    return (
        <header className="synapse-navbar">
        <h1 className="synapse_title">Synapse</h1> 
        {/*CHECAR!!!!!!*/ }
        <nav>
            <a href="#plans">Planos</a>
            <a href="#about">Sobre</a>
            <a href="#devs">Desenvolvedores</a>
        </nav>
        <div className = "nav-buttons">
            {/* CHECAR!!!! */}
            <AuthentifiedComponent unauthorized={<Link to = "/login" className="login-btn">Login</Link>}>
                <Link to ="/chat" className="login-btn">Entrar</Link>
            </AuthentifiedComponent>
            <button className="signup-btn">Inscreva-se</button>
        </div>
        </header>
    )
}

export default Header_MainPage;