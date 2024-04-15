import { Link as RouterLink } from "react-router-dom";
import styles from "./Logo.module.css";
import { HOME_ROUTE } from "../app/Routes";

const Logo = () => {
  return (
    <RouterLink className={styles.logo} to={HOME_ROUTE}>
      <span role="img">🍿</span>
      <h1>Movie App</h1>
    </RouterLink>
  );
};

export default Logo;
