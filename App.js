import { AuthProvider } from "./src/components/Authentication/AuthContext";
import AppNav from "./src/components/Navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
