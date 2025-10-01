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
            <h1 className="logo">Synapse</h1>
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