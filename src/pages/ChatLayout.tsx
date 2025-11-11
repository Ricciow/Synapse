import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function ChatLayout() {
    return (
    <div className="app">
        <Sidebar />
        <Outlet />
    </div>);
}