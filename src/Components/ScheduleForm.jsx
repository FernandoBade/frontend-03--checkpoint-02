import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "./service/context";
import { getTokenFromStorage } from "./service/storage";
import styles from "../Components/style/ScheduleForm.module.css";

const ScheduleForm = () => {
  const [dentistList, setDentistList] = useState([]);
  const [patienceList, setPatienceList] = useState([]);

  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;

  useEffect(() => {
    async function fetchData() {
      try {
        const [dentist, patience] = await Promise.all([
          fetch(`https://dhodonto.ctdprojetos.com.br/dentista`),
          fetch(`https://dhodonto.ctdprojetos.com.br/paciente`),
        ]);
        const dentistList = await dentist.json();
        const patienceList = await patience.json();
        setDentistList(dentistList);
        setPatienceList(patienceList.body);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const token = getTokenFromStorage();
    
    try {
      fetch(`https://dhodonto.ctdprojetos.com.br/consulta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dentista: {
            matricula: data.dentist,
          },
          paciente: {
            matricula: data.patient,
          },
          dataHoraAgendamento: data.appointmentDate,
        }),
      }).then((res) => {
        if(res.ok) {
          alert("Consulta agendada com sucesso");
          window.location.href = '/';
        }
        else{
          alert("Erro ao tentar agendar a consulta. Verifique\n Está logado ao sistema; os campos e verifique a data");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`text-center container ${isDarkMode ? styles.cardDark : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <div className={`row ${styles.rowSpacing}`}>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="dentist" className="form-label">
              Dentista
            </label>
            <select className="form-select" name="dentist" id="dentist">
              {dentistList.length > 0 &&
                dentistList.map((dentist) => (
                  <option key={dentist.matricula} value={dentist.matricula}>
                    {`${dentist.nome} ${dentist.sobrenome}`}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="patient" className="form-label">
              Paciente
            </label>
            <select className="form-select" name="patient" id="patient">
              {patienceList.length > 0 &&
                patienceList.map((patience) => (
                  <option key={patience.matricula} value={patience.matricula}>
                    {`${patience.nome} ${patience.sobrenome}`}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={`row ${styles.rowSpacing}`}>
          <div className="col-12">
            <label htmlFor="appointmentDate" className="form-label">
              Data e Hora
            </label>
            <input
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              type="datetime-local"
            />
          </div>
        </div>
        <div className={`row ${styles.rowSpacing}`}>
          <button
            className={`btn btn-${isDarkMode ? "dark" : "light"} ${
              styles.button
            }`}
            type="submit"
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
