import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextGlobal } from "./service/context";
import styles from "../Components/style/Card.module.css";

const Card = ({ nome, matricula, usuario }) => {
  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;

  return (
    <div className={`card ${isDarkMode ? styles.cardDark : ""}`}>
      <img
        className="card-img-top"
        src="/images/doctor.jpg"
        alt="doctor placeholder"
      />
      <div className={`card-body ${styles.CardBody}`}>
        <Link to={`/dentist/${matricula}`}>
          <h5 className={`card-title mb-0 name-color ${styles.title}`}>{nome}</h5>
          <p className="card-text mt-0">{usuario?.username}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
