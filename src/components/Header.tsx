// src/components/Header.tsx (alternative — connect directly to Redux)
// Not required, but good to know:

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

// userName and onLogout now come from Redux, not props!
export default function Header({ title, onMenuClick }: HeaderProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
        <h1 className={styles.logo}>{title}</h1>
      </div>
      <div className={styles.right}>
        {user?.name && <span className={styles.userName}>{user.name}</span>}
        <button className={styles.logoutBtn} onClick={() => dispatch(logout())}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}