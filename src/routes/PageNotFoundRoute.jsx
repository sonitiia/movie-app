import { useNavigate } from "react-router-dom";
import styles from "./PageNotFoundRoute.module.css";

const PageNotFoundRoute = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <h1>Помилка</h1>
      <p>
        Щось пішло не так. Схоже, що ваш запит не знайдено. Ймовірно посилання
        не працює або сторінку видалено.
      </p>
      <div className={styles.buttonWrapper}>
        <button onClick={handleBackClick}>
          <p>Назад</p>
        </button>
        <button onClick={handleBackClick}>
          <p>На головну</p>
        </button>
      </div>
    </div>
  );
};

export default PageNotFoundRoute;
