import LoginContent from "../components/login/LoginContent";
import AuthContextProvider from "../context/AuthContextProvider";

/**
 * The main Login page.
 * It wraps the LoginContent with the AuthContextProvider to provide
 * all necessary authentication state and logic.
 */
export default function Login() {
    return (
        <AuthContextProvider>
            <LoginContent />
        </AuthContextProvider>
    )
}
