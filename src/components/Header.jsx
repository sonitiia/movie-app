import styles from "./Header.module.css";
import Liked from "./Liked";
import Logo from "./Logo";

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <Logo />
        <div className={styles.childrenWrapper}>
          {children}
          <Liked />
        </div>
      </nav>
    </header>
  );
};

export default Header;
