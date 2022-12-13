import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./GlobalVariables";
import styles from "./Card.module.css";

const Card = ({ nome, matricula, usuario }) => {
  const { theme } = useContext(Context);
  const isDarkMode = theme === "dark" || false;
// Na linha seguinte deverá ser feito um teste se a aplicação
// está em dark mode e deverá utilizar o css correto
  return (
    <div className={`card ${isDarkMode ? styles.cardDark : ""}`}>
      <img
        className="card-img-top"
        src="/images/doctor.jpg"
        alt="doctor placeholder"
      />
      <div className={`card-body ${styles.CardBody}`}>
        {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API  */}
        <Link to={`/dentist/${matricula}`}>
          <h5 className={`card-title ${styles.title}`}>{nome}</h5>
        </Link>
        <p className="card-text">{usuario?.username}</p>
      </div>
    </div>
  );
};

export default Card;