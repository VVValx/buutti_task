import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import Books from "./pages/books/Books";
import Book from "./pages/Book/Book";
import "./styles/index.scss";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Books />} />
      <Route path="/book/:id" element={<Book />} />
    </Routes>
  );
}

export default App;
