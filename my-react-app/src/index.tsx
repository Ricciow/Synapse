import Sidebar from "./sidebar";
import Prompter from "./prompter";
import "./index.css";

export default function Index() {
    return (
        <div className="app">
            <Sidebar />
            <Prompter />
        </div>
    )
}