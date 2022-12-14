import { useState, useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {
  const [dentist, setDentist] = useState([]);

  useEffect(() => {
    try {
      fetch("https://dhodonto.ctdprojetos.com.br/dentista")
        .then((res) => res.json())
        .then((data) => setDentist(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      
      <h1>Checkpoint</h1>
      <div className="card-grid container">
        {dentist.length
          ? dentist.map((dentist) => (
              <Card {...dentist} key={dentist.matricula} />
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
