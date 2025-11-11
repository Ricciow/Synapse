import "../styles/components/Sidebar.css";
import "../styles/components/Cards/card.css";
import logo from "../assets/synapse_logo.png";
import { Link, NavLink, useNavigate, useRevalidator } from "react-router-dom"; 
import { BackendUrl } from "../constants/env";

type SidebarProps = {
    conversationsReceived: conversation[]
    openId?: string
}

type conversation = {
    id: string;
    title: string;
}

export default function Sidebar({ conversationsReceived, openId }: Readonly<SidebarProps>) {
    const revalidator = useRevalidator();
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

        navigate(`./${json.id}`);
        
        revalidator.revalidate();
    }

    async function handleDelete(id: string) {
        const response = await fetch(`${BackendUrl}/conversation/${id}`, { method: "DELETE" });

        if(response.ok) {
            revalidator.revalidate();
        }
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
                disabled={revalidator.state === "loading"}
            >
                Nova Conversa
            </button>
            <nav className="conversations">
                {conversationsReceived.map((conv) => (
                    <NavLink
                        className={({ isActive }) => isActive ? "conversation card border hoverable link selected" : "conversation card border hoverable link"}
                        key={conv.id}
                        to={`./${conv.id}`}
                    >
                        <p>{conv.title}</p>
                        <button 
                            className="delete" 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDelete(conv.id)}
                            }
                            disabled={revalidator.state === "loading"}
                        >
                            <i className="fi fi-br-trash"></i>
                        </button>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}