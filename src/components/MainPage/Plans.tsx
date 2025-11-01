import React from   'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Synapse.css';
import '../styles/components/projetos/SynapseHeader.css';
import '../styles/components/projetos/SynapseFooter.css';

function Plans () {
    return (
        <>
            <h3>Planos Flexíveis para Todos</h3>
            <div className="plans-grid">
                <div className="plan-card">
                    <h4>Iniciante</h4>
                    <p className="price">Grátis</p>
                    <ul>
                    <li>Comparação lado a lado de até 3 IAs</li>
                    <li>Acesso a modelos gratuitos</li>
                    <li>20 perguntas por dia</li>
                    </ul>
                    <button className="plan-btn">Comece Agora</button>
                </div>

                <div className="plan-card">
                    <h4>Pro <span className='badge'>Mais Popular</span></h4>
                    <p className="price">R$ 99/mês</p>
                    <ul>
                    <li>Acesso a modelos avançados</li>
                    <li>100 perguntas por dia</li>
                    <li>Geração de imagens e códigos assertivos</li>
                    <li>Exportação de resultados</li>
                    </ul>
                    <button className="plan-btn">Ir para o Pagamento</button>
                </div>
            
                <div className="plan-card">
                    <h4>Empresarial</h4>
                    <p className="price">Customizado</p>
                    <ul>
                    <li>Tudo do plano Pro</li>
                    <li>Workspaces colaborativos (até 10 usuários)</li>
                    <li>Integração com API externa</li>
                    <li>Privacidade Corporativa - dados não usados para treino</li>
                    </ul>
                    <button className="plan-btn">Entre em contato</button>
                </div>
            </div>
        </>
    )
}

export default Plans;
