import { useNavigate } from 'react-router-dom';
import '../styles/pages/Synapse.css';
import '../styles/components/projetos/SynapseHeader.css';
import '../styles/components/projetos/SynapseFooter.css';
import '../styles/components/Button.css';
import dev1 from '../assets/dev1.png';
import dev2 from '../assets/dev2.png';
import dev3 from '../assets/dev3.png';
import dev4 from '../assets/dev4.png';
import dev5 from '../assets/dev5.png';

export default function Synapse() {
  const navigate = useNavigate();

  const handleAccessSystem = (): void => {
    navigate('/chat');
  };

  return (
    <div className="synapse-container">
      {/* <!-- Navbar --> */}
      <header className="synapse-navbar">
        <h1 className="logo">Synapse</h1>
        <nav>
          <a href="#plans">Planos</a>
          <a href="#about">Sobre</a>
          <a href="#devs">Desenvolvedores</a>
        </nav>
        <div className="nav-buttons">
          <button className="secondary-btn">Login</button>
          <button className="primary-btn">Inscreva-se</button>
        </div>
      </header>

      {/* <!-- Hero Section --> */}
      <section className="synapse-hero">
        <h2>
          Obtenha Resposta de <span>Diferentes Modelos de IA</span> com{' '}
          <span>Apenas Uma Pergunta</span>
        </h2>
        <p>
          Nossa plataforma reune diferentes algoritmos de inteligências
          artificiais de ponta para auxiliar em todo o processo de pesquisa,
          otimizando seu tempo e expandindo suas possibilidades.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={handleAccessSystem}>
            Acessar o Sistema
          </button>
        </div>
      </section>

      {/* <!-- Plans Section --> */}
      <section id="plans" className="synapse-plans">
        <h3>Planos Flexíveis para Todos</h3>
        <div className="plans-grid">
          {/* <!-- Beginner Plan --> */}
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

          {/* <!-- Pro Plan --> */}
          <div className="plan-card">
            <h4>
              Pro <span className="badge">Mais Popular</span>
            </h4>
            <p className="price">R$ 99/mês</p>
            <ul>
              <li>Acesso a modelos avançados</li>
              <li>100 perguntas por dia</li>
              <li>Geração de imagens e códigos assertivos</li>
              <li>Exportação de resultados</li>
            </ul>
            <button className="plan-btn">Ir para Pagamento</button>
          </div>

          {/* <!-- Business Plan --> */}
          <div className="plan-card">
            <h4>Empresarial</h4>
            <p className="price">Customizado</p>
            <ul>
              <li>Tudo do plano Pro</li>
              <li>Workspaces colaborativos (até 10 usuários)</li>
              <li>Integração com API externa</li>
              <li>
                Privacidade Corporativa - dados não usados para treino
              </li>
            </ul>
            <button className="plan-btn">Entre em Contato</button>
          </div>
        </div>
      </section>

      {/* <!-- Our Mission --> */}
      <section id="about" className="synapse-mission">
        <h3>Nossa Missão</h3>
        <p>
          A Synapse nasceu da curiosidade quanto à operação de modelos de IA e
          suas capacidades. Acreditamos que a inteligência artificial pode ser
          uma poderosa aliada para pesquisa, buscando de forma rápida e
          eficiente informações relevantes e democratizando o acesso à
          informação.
        </p>
      </section>

      {/* <!-- Developers --> */}
      <section id="devs" className="synapse-devs">
        <h3>Conheça os Desenvolvedores</h3>
        <div className="devs-grid">
          <div className="dev-card">
            <img src={dev1} alt="Dev1" />
            <h4>Dev1</h4>
            <p>Caroline Atolini</p>
          </div>
          <div className="dev-card">
            <img src={dev2} alt="Dev2" />
            <h4>Dev2</h4>
            <p>Dylan</p>
          </div>
          <div className="dev-card">
            <img src={dev3} alt="Dev3" />
            <h4>Dev3</h4>
            <p>Fernando</p>
          </div>
          <div className="dev-card">
            <img src={dev4} alt="Dev4" />
            <h4>Dev4</h4>
            <p>Lior</p>
          </div>
          <div className="dev-card">
            <img src={dev5} alt="Dev5" />
            <h4>Dev5</h4>
            <p>Vinícius</p>
          </div>
        </div>
      </section>

      {/* <!-- Newsletter --> */}
      <section className="synapse-newsletter">
        <h3>Obtenha Vantagens Exclusivas</h3>
        <p>
          Inscreva-se na nossa newsletter para receber atualizações e
          novidades.
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Seu melhor e-mail"/>
          <button className="primary-btn">Inscrever-se</button>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="synapse-footer">
        <p>© 2024 Synapse. Todos os direitos reservados.</p>
        <div className="social-icons">
          <i className="fa fa-twitter"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-github"></i>
        </div>
      </footer>
    </div>
  );
};