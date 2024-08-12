import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Logo from '../images/logosfundo.png';

export default function Header() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const handleUser = await getUser();
      setUser(handleUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (location.pathname === '/') {
    return null;
  }

  if (loading) return <Loading />;
  return (
    <header
      data-testid="header-component"
      className="bg-black text-white grid grid-cols-3 items-center h-10
      w-full min-h-10 px-3 py-0 gap-3"
    >
      <img src={ Logo } alt="Logo trybetunes" className="w-1/4 relative top-5 right-1" />
      <p
        data-testid="header-user-name"
        className="relative left-20"
      >
        {`Hello, ${user?.name}!`}
      </p>

      <div
        className="grid-cols-5 justify-center text-center flex items-center gap-5
        relative left-10"
      >
        <NavLink
          to="/search"
          data-testid="link-to-search"
          className="text-center hovershadow-indigo-950 "
        >
          Search
        </NavLink>

        <p>|</p>

        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          className="text-center "
        >
          Favorites
        </NavLink>

        <p>|</p>

        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          className="text-center "
        >
          My Profile
        </NavLink>
      </div>
    </header>
  );
}
