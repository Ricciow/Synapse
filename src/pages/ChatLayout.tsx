import Sidebar from "../components/Sidebar";
import { Outlet, useLoaderData } from "react-router-dom";
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

    return (
    <div className="app">
        <Sidebar conversationsReceived={conversations} />
        <Outlet />
    </div>);
}