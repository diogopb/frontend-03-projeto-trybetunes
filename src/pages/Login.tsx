import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default function Login() {
  const [login, setLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLengthName = () => login.length <= 2;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleNewUser = async () => {
    setLoading(true);
    await createUser({ name: login });
    setLoading(false);
    navigate('/search');
  };

  if (loading) return <Loading />;
  return (
    <form onSubmit={ handleNewUser }>

      <div>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          data-testid="login-name-input"
          value={ login }
          onChange={ handleInputChange }
          required
        />
      </div>

      <button
        type="submit"
        data-testid="login-submit-button"
        onClick={ handleNewUser }
        disabled={ (handleLengthName()) }
      >
        Entrar
      </button>

    </form>
  );
}
