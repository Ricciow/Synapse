import React from "react";
import { Link } from "react-router-dom";
import '../styles/pages/Synapse.css';
import '../styles/components/projetos/SynapseHeader.css';
import '../styles/components/projetos/SynapseFooter.css';


function Hero() {
    return (
        <>
            <h2>
                Obtenha resposta de diferentes modelos de IA com apenas uma pergunta
            </h2>
            <p>Nossa plataforma reune diferentes algoritmos de inteligências artificiais
                de ponta para auxiliar em todo o processo de pesquisa, otimizando seu tempo
                e expandindo suas possibilidades.
            </p>
            <div className="hero-buttons">
                <Link className="primary-btn" to="/chat">
                    Acessar
                </Link>
            </div>
        </>
    )
}

export default Hero;