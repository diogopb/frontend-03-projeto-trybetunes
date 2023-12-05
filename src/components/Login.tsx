import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
    <form action="form" onSubmit={ handleNewUser }>

      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="login"
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
