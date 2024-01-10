// Login.js

import React, { useState } from 'react';
import AuthService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('Tiavina');
  const [password, setPassword] = useState('tiavina');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Veuillez saisir un nom d\'utilisateur et un mot de passe.');
      return;
    }

    try {
      setLoading(true);

      const result = await AuthService.connection(username, password);

      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Nom d'utilisateur:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Chargement...' : 'Se connecter'}
      </button>
    </div>
  );
};

export default Login;
