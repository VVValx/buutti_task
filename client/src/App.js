import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/notFound/NotFound";
import Books from "./pages/books/Books";
import "./styles/index.scss";

function App() {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
