import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ScheduleFormModal from "./ScheduleFormModal";
import { ContextGlobal } from "./service/context";
import styles from "../Components/style/DetailCard.module.css";

const DetailCard = () => {
  const { id } = useParams();
  const [dentist, setDentist] = useState(undefined);
  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;

  useEffect(() => {
    async function fetchData() {
      fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDentist(data);
        });
    }
    fetchData();
  }, [id]);
  return (
    <>
      {dentist ? (
        <>
          <h1>Mostrando detalhes de {dentist?.nome + " " + dentist?.sobrenome } </h1>
          <section className="card col-sm-12 col-lg-6 container">
            <div
              className={`card-body row ${isDarkMode ? styles.cardDark : ""}`}
            >
              <div className="col-sm-12 col-lg-6">
                <img
                  className="card-img-top"
                  src="/images/doctor.jpg"
                  alt="doctor placeholder"
                />
              </div>
              <div className="col-sm-12 col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    Nome: {dentist.nome}</li>
                  <li className="list-group-item">
                    Sobrenome: {dentist.sobrenome}
                  </li>
                  <li className="list-group-item">
                    Usuário: {dentist.usuario.username}
                  </li>
                </ul>
                <div className="text-center">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className={`btn btn-${isDarkMode ? "dark" : "light"} ${
                      styles.button
                    }`}
                  >
                    Agendar Consulta
                  </button>
                  <Link className="nav-link" to="/home">
                  ← voltar
                </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
