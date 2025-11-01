import '../styles/pages/Synapse.css';
import '../styles/components/projetos/SynapseHeader.css';
import '../styles/components/projetos/SynapseFooter.css';
import dev1 from '../assets/dev1.png';
import dev2 from '../assets/dev2.png';
import dev3 from '../assets/dev3.png';
import dev4 from '../assets/dev3.png';
import dev5 from '../assets/dev3.png';
import Header from '../components/MainPage/Header';
import Plans from '../components/MainPage/Plans';
import Hero from '../components/MainPage/Hero';
import OurMission from '../components/MainPage/OurMission';
import DevCard from '../components/MainPage/Developers/DevComponent';
import Footer from '../components/MainPage/Footer';

export default function Synapse () {
    return (
      <div className = "synapse-container">
        <Header/>

        <section className = "synapse-hero">
          <Hero/>
        </section>

        <section className = "synapse-plans">
          <Plans/>
        </section>

        <section className="synapse-mission">
          <OurMission/>
        </section>

        <section className='synapse-devs'>
          <DevCard image={dev1} title="Desenvolvedor" name="Caroline Atolini" />
          <DevCard image={dev2} title="Desenvolvedor" name="Dylan" />
          <DevCard image={dev3} title="Desenvolvedor" name="Fernando Yamamoto" />
          <DevCard image={dev4} title="Desenvolvedor" name="Lior Lerner" />
          <DevCard image={dev5} title="Desenvolvedor" name="Vinícius Fioravante" />
        </section>

        <section className='synpase-newsletter'>
          <h3>Obtenha Vantagens Exclusivas</h3>
          <p>Inscreva-se na nossa newsletter para receber atualizações e novidades.</p>
          <div className='newsleeter-form'>
            <input type="email" placeholder='Seu melhor email'/>
          </div>
        </section>

        <Footer/>

      </div>  
  )
}

export default Synapse;
