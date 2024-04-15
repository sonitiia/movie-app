import { Link as RouterLink } from "react-router-dom";
import styles from "./Liked.module.css";
import { LIKED_ROUTE } from "../app/Routes";

const Liked = () => {
  return (
    <RouterLink className={styles.liked} to={LIKED_ROUTE}>
      <span role="img">♡</span>
    </RouterLink>
  );
};

export default Liked;
