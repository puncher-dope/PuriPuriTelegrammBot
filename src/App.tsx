import { Route, Routes } from "react-router";
import BodyWaiters from "./components/Waiters/BodyWaiters/BodyWaiters";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import BodyBartenders from "./components/Bartenders/BodyBartenders/BodyBartenders";
import { LoginPage } from "./components/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./context/authContext";


function App() {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
