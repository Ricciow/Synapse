import "./sidebar.css"
import "./card.css"
import logo from "./assets/synapse_logo.png"

export default function Sidebar() {
    const conversations = [
        { id: 1, title: "Conversa 1" },
        { id: 2, title: "Conversa 2" },
        { id: 3, title: "Conversa 3" },
    ]

    return (
        <div className="sidebar">
            <div className="logo_area">
                <h1 className="logo">Synapse</h1>
                <img className="logo_small" src={logo} alt="Synapse Logo"/>
            </div>
            <button className="new card border hoverable">Nova Conversa</button>
            <nav className="conversations">
                {conversations.map((conv) => (
                    <div className="conversation card border hoverable" key={conv.id}>
                        {conv.title}
                    </div>
                ))}
            </nav>
        </div>
    )
}