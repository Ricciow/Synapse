import "./sidebar.css"
import "./card.css"

export default function Sidebar() {
    const conversations = [
        { id: 1, title: "Conversação 1" },
        { id: 2, title: "Conversação 2" },
        { id: 3, title: "Conversação 3" },
    ]

    return (
        <div className="sidebar">
            <div className="logo_area">
                <h1 className="logo">Synapse</h1>
                <h1 className="logo_small">S</h1>
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