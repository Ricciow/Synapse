import { useAuth } from "./authProvider";

type AuthentifiedComponentProps = { 
    children: React.ReactNode 
    unauthorized?: React.ReactNode
};

export default function AuthentifiedComponent({ children, unauthorized }: AuthentifiedComponentProps) {
    const { authToken } = useAuth();

    if(authToken) {
        return children;
    }

    return unauthorized ?? <></>;
}