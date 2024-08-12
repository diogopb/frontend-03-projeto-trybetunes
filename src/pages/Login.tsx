import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Logo from '../images/logosfundo.png';

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
    <div
      className="bg-black
     min-h-screen flex items-center justify-center"
    >
      <form
        onSubmit={ handleNewUser }
        className="bg-indigo-950 px-10 py-10 rounded-xl flex flex-col
        gap-4 w-96 text-center justify-center shadow hover:shadow-indigo-950"
      >
        <div>
          <img
            src={ Logo }
            alt="Logo trybetunes"
            title="Logo trybetunes"
            className="w-42"
          />
        </div>
        <div>
          {/* <label htmlFor="name" className="text-white">Name: </label> */}
          <input
            type="text"
            id="name"
            data-testid="login-name-input"
            value={ login }
            onChange={ handleInputChange }
            required
            placeholder="Type your name!"
            className="flex items-center justify-center w-80 h-10 text-black text-center
            rounded-2xl bg-indigo-300"
          />
        </div>

        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={ handleNewUser }
          disabled={ (handleLengthName()) }
          className="bg-pink text-white flex items-center justify-center
          w-80 h-8 rounded-2xl"
        >
          Enter
        </button>

      </form>
    </div>
  );
}
