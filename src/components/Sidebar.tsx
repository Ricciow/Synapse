import "../styles/components/Sidebar.css";
import "../styles/components/Cards/card.css";
import logo from "../assets/synapse_logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BackendUrl } from "../constants/env";
import { useState } from "react";

type SidebarProps = {
    conversationsReceived: conversation[]
}

type conversation = {
    id: number;
    title: string;
}

export default function Sidebar({ conversationsReceived }: Readonly<SidebarProps>) {
    const [conversations, setConversations] = useState(conversationsReceived);

    const navigate = useNavigate();

    async function handleCreation() {
        const response = await fetch(`${BackendUrl}/conversation/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: "Nova Conversa" }),
        });

        if(!response.ok) {
            return
        }

        const json = await response.json();

        delete json.messages;

        setConversations([json, ...conversations]);

        navigate(`./${json.id}`);
    }

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
            <button 
                className="new card border hoverable"
                onClick={handleCreation}
            >
                Nova Conversa
            </button>
            <nav className="conversations">
                {conversations.map((conv) => (
                    <NavLink
                        className={({ isActive }) => isActive ? "conversation card border hoverable link selected" : "conversation card border hoverable link"}
                        key={conv.id}
                        to={`./${conv.id}`}
                    >
                        {conv.title}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
