import React from 'react';
import '../styles/pages/Synapse.css';
import '../styles/components/projetos/SynapseHeader.css';
import '../styles/components/projetos/SynapseFooter.css';

function DevCard ({image, title, name} : {image: string; title: string; name: string}) {
    return (
        <div className="devs-grid">
            <div className='dev-card'>
                    <img src={image} alt={title}/>
                    <h4>{title}</h4>
                    <p>{name}i</p>
            </div>
        </div>
    )

}

export default DevCard;