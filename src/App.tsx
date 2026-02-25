import { Route, Routes } from "react-router";
import BodyWaiters from "./components/Waiters/BodyWaiters/BodyWaiters";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import BodyBartenders from "./components/Bartenders/BodyBartenders/BodyBartenders";
import { AuthProvider } from "./context/authContext";
import { LoginPage } from "./components/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={
              <ProtectedRoute>
                <BodyWaiters />
              </ProtectedRoute>
            } />

            <Route path="/bartenders" element={
              <ProtectedRoute>
                <BodyBartenders />
              </ProtectedRoute>
            } />

          </Routes>

          <Footer />

        </AuthProvider>
    </>
  );
}

export default App;
