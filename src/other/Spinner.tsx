import "../styles/components/other.css"

type SpinnerProps = {
    message?: string
    className?: string
}

export default function Spinner({ message, className }: Readonly<SpinnerProps>) {
    return (
        <div className={"spinner-container" + (className ? " " + className : "")}>
            <div className="spinner" />
            {message}
        </div>
    )
}