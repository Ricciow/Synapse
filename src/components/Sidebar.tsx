import "../styles/components/Sidebar.css";
import "../styles/components/Cards/card.css";
import logo from "../assets/synapse_logo.png";
import { Link } from "react-router-dom";

type SidebarProps = {
    conversations: conversation[]
}

type conversation = {
    id: number;
    title: string;
}

export default function Sidebar({ conversations }: Readonly<SidebarProps>) {
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
                    <Link
                        className="conversation card border hoverable link"
                        key={conv.id}
                        to={`./${conv.id}`}
                    >
                        {conv.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
