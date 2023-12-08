import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
    <header data-testid="header-component">
      <p data-testid="header-user-name">{`Hello, ${user?.name}!`}</p>

      <NavLink to="/search" data-testid="link-to-search">
        Search Artist
      </NavLink>

      <NavLink to="/favorites" data-testid="link-to-favorites">
        Favorite Artists:
      </NavLink>

      <NavLink to="/profile" data-testid="link-to-profile">
        My Profile
      </NavLink>
    </header>
  );
}
