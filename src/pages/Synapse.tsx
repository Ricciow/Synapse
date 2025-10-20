import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/pages/Synapse.css';
import '/src/styles/components/projetos/SynapseHeader.css';
import '/src/styles/components/projetos/SynapseFooter.css';
import '/src/styles/components/Button.css';
import dev1 from '/src/components/assets/dev1.png';
import dev2 from '/src/components/assets/dev2.png';
import dev3 from '/src/components/assets/dev3.png';
import dev4 from '/src/components/assets/dev4.png';
import dev5 from '/src/components/assets/dev5.png';


const Synapse: FC = () => {
  const navigate = useNavigate();

  const handleAccessSystem = (): void => {
    navigate('/chat');
  };

  return React.createElement(
    'div',
    { className: 'synapse-container' },

    // Navbar
    React.createElement(
      'header',
      { className: 'synapse-navbar' },
      React.createElement('h1', { className: 'logo' }, 'Synapse'),
      React.createElement(
        'nav',
        null,
        React.createElement('a', { href: '#plans' }, 'Planos'),
        React.createElement('a', { href: '#about' }, 'Sobre'),
        React.createElement('a', { href: '#devs' }, 'Desenvolvedores')
      ),
      React.createElement(
        'div',
        { className: 'nav-buttons' },
        React.createElement('button', { className: 'secondary-btn' }, 'Login'),
        React.createElement(
          'button',
          { className: 'primary-btn' },
          'Inscreva-se'
        )
      )
    ),

    // Hero Section
    React.createElement(
      'section',
      { className: 'synapse-hero' },
      React.createElement(
        'h2',
        null,
        'Obtenha Resposta de ',
        React.createElement('span', null, 'Diferentes Modelos de IA'),
        ' com ',
        React.createElement('span', null, 'Apenas Uma Pergunta')
      ),
      React.createElement(
        'p',
        null,
        'Nossa plataforma reune diferentes algoritmos de inteligências artificiais de ponta para auxiliar em todo o processo de pesquisa, otimizando seu tempo e expandindo suas possibilidades.'
      ),

      React.createElement(
        'div',
        { className: 'hero-buttons' },
        React.createElement(
          'button',
          {
            className: 'primary-btn',
            onClick: handleAccessSystem,
          },
          'Acessar o Sistema'
        )
      )
    ),

    React.createElement(
      'section',
      { id: 'plans', className: 'synapse-plans' },
      React.createElement('h3', null, 'Planos Flexíveis para Todos'),
      React.createElement(
        'div',
        { className: 'plans-grid' },

        // Beginner Plan
        React.createElement(
          'div',
          { className: 'plan-card' },
          React.createElement('h4', null, 'Iniciante'),
          React.createElement('p', { className: 'price' }, 'Grátis'),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Comparação lado a lado de até 3 IAs'
            ),
            React.createElement('li', null, 'Acesso a modelos gratuitos'),
            React.createElement('li', null, '20 perguntas por dia')
          ),
          React.createElement(
            'button',
            { className: 'plan-btn' },
            'Comece Agora'
          )
        ),

        // Pro Plan
        React.createElement(
          'div',
          { className: 'plan-card' },
          React.createElement(
            'h4',
            null,
            'Pro ',
            React.createElement('span', { className: 'badge' }, 'Mais Popular')
          ),
          React.createElement('p', { className: 'price' }, 'R$ 99/mês'),
          React.createElement(
            'ul',
            null,
            React.createElement('li', null, 'Acesso a modelos avançados'),
            React.createElement('li', null, '100 perguntas por dia'),
            React.createElement(
              'li',
              null,
              'Geração de imagens e códigos assertivos'
            ),
            React.createElement('li', null, 'Exportação de resultados')
          ),
          React.createElement(
            'button',
            { className: 'plan-btn' },
            'Ir para Pagamento'
          )
        ),

        // Business Plan
        React.createElement(
          'div',
          { className: 'plan-card' },
          React.createElement('h4', null, 'Empresarial'),
          React.createElement('p', { className: 'price' }, 'Customizado'),
          React.createElement(
            'ul',
            null,
            React.createElement('li', null, 'Tudo do plano Pro'),
            React.createElement(
              'li',
              null,
              'Workspaces colaborativos (até 10 usuários)'
            ),
            React.createElement('li', null, 'Integração com API externa'),
            React.createElement(
              'li',
              null,
              'Privacidade Corporativa - dados não usados para treino'
            )
          ),
          React.createElement(
            'button',
            { className: 'plan-btn' },
            'Entre em Contato'
          )
        )
      )
    ),

    // Our Mission
    React.createElement(
      'section',
      { id: 'about', className: 'synapse-mission' },
      React.createElement('h3', null, 'Nossa Missão'),
      React.createElement(
        'p',
        null,
        'A Synapse nasceu da curiosidade quanto à operação de modelos de IA e suas capacidades. Acreditamos que a inteligência artificial pode ser uma poderosa aliada para pesquisa, buscando de forma rápida e eficiente informações relevantes e democratizando o acesso à informação.'
      )
    ),

    // Developers
    React.createElement(
      'section',
      { id: 'devs', className: 'synapse-devs' },
      React.createElement('h3', null, 'Conheça os Desenvolvedores'),
      React.createElement(
        'div',
        { className: 'devs-grid' },
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev1, alt: 'Dev1' }),
          React.createElement('h4', null, 'Dev1'),
          React.createElement('p', null, 'Caroline Atolini')
        ),
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev2, alt: 'Dev2' }),
          React.createElement('h4', null, 'Dev2'),
          React.createElement('p', null, 'Dylan')
        ),
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev3, alt: 'Dev3' }),
          React.createElement('h4', null, 'Dev3'),
          React.createElement('p', null, 'Fernando')
        ),
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev4, alt: 'Dev4' }),
          React.createElement('h4', null, 'Dev4'),
          React.createElement('p', null, 'Lior')
        ),
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev5, alt: 'Dev5' }),
          React.createElement('h4', null, 'Dev5'),
          React.createElement('p', null, 'Vinícius')
        )
      )
    ),

    // Newsletter
    React.createElement(
      'section',
      { className: 'synapse-newsletter' },
      React.createElement('h3', null, 'Obtenha Vantagens Exclusivas'),
      React.createElement(
        'p',
        null,
        'Inscreva-se na nossa newsletter para receber atualizações e novidades.'
      ),
      React.createElement(
        'div',
        { className: 'newsletter-form' },
        React.createElement('input', {
          type: 'email',
          placeholder: 'Seu melhor e-mail',
        }),
        React.createElement(
          'button',
          { className: 'primary-btn' },
          'Inscrever-se'
        )
      )
    ),

    // Footer
    React.createElement(
      'footer',
      { className: 'synapse-footer' },
      React.createElement(
        'p',
        null,
        '© 2024 Synapse. Todos os direitos reservados.'
      ),
      React.createElement(
        'div',
        { className: 'social-icons' },
        React.createElement('i', { className: 'fa fa-twitter' }),
        React.createElement('i', { className: 'fa fa-instagram' }),
        React.createElement('i', { className: 'fa fa-github' })
      )
    )
  );
};

export default Synapse;
