import Sidebar from "../components/Sidebar";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { BackendUrl } from "../constants/env";

export async function chatLayoutLoader() {
    const response = await fetch(`${BackendUrl}/conversation/`);

    if(!response.ok) {
        return [];
    }

    const json = await response.json();

    return json
}

export default function ChatLayout() {
    const conversations = useLoaderData();

    const { id } = useParams()

    return (
    <div className="app">
        <Sidebar conversationsReceived={conversations} openId={id} />
        <Outlet />
    </div>);
}