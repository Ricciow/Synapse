import "../styles/components/Sidebar.css";
import "../styles/components/Cards/card.css";
import logo from "../assets/synapse_logo.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const conversations = [
        { id: 1, title: "Conversa 1" },
        { id: 2, title: "Conversa 2" },
        { id: 3, title: "Conversa 3" },
    ];
    
    return (
        <div className="sidebar">
            <div className="logo_area">
                <Link
                    className="logo"
                    to={"/"}
                >
                    Synapse
                </Link>
                <img className="logo_small" src={logo} alt="Synapse Logo" />
            </div>
            <button className="new card border hoverable">Nova Conversa</button>
            <nav className="conversations">
                {conversations.map((conv) => (
                    <div
                        className="conversation card border hoverable"
                        key={conv.id}
                    >
                        {conv.title}
                    </div>
                ))}
            </nav>
        </div>
    );
}
