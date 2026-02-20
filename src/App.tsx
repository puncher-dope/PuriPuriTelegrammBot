import { Route, Routes } from "react-router";
import BodyWaiters from "./components/Waiters/BodyWaiters/BodyWaiters";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import BodyBartenders from "./components/Bartenders/BodyBartenders/BodyBartenders";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BodyWaiters />} />
        <Route path="/bartenders" element={<BodyBartenders/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
