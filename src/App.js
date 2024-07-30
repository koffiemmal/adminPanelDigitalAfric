import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Userlist from "./components/pages/Userlist";
import ArticlesList from "./components/pages/Articleslist";
import AddArticlesList from "./components/pages/AddArticles";
import EditionArticles from "./components/pages/EditiionArticles";
import Inscription from "./components/pages/Inscription";
import Connexion from "./components/pages/Connexion";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/" element={<Connexion />} />
        <Route path="/acceuil" element={<Header />}>
          <Route index element={<Userlist />} />
          <Route path="/acceuil/magazin" element={<ArticlesList />} />
          <Route path="/acceuil/addArticle" element={<EditionArticles />} />
          <Route path="/acceuil/articles/:id" element={<EditionArticles />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
