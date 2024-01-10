// App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import AuthService from './services/authService';
import CategorieService from './services/categorieService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    element={
      AuthService.estConnecte() ? (
        <Component />
      ) : (
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      )
    }
  />
);

const Home = () => <h2>Accueil</h2>;
const About = () => {
  const [nom, setNom] = useState('');
  const [categories, setCategories] = useState([]);
  const handleChange = (event)=> {
    setNom(event.target.value);
  }
  const handleAdd = async ()=>{
    const result = await CategorieService.ajouter(nom);
    if (result.success) {
      fetchData();
      setNom('');
    }
  }
  const fetchData = async () => {
    const result = await CategorieService.tous();
    if (result.success) {
      setCategories(result.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    
    <h2>Ajouter une categorie</h2>
      <input type="text" name='nom' onChange={handleChange} value={nom}/>
      <button onClick={()=>handleAdd()}>Ajouter</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>

        {categories.map((categorie, index)=>(
          <tr key={index}>
            <td>{categorie.id}</td>
            <td>{categorie.nom}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
};

const handleLogout=()=> AuthService.deconnection();

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Déconnection</button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
