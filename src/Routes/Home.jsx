import { useState, useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {
  const [dentist, setDentist] = useState([]);

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    try {
      fetch("https://dhodonto.ctdprojetos.com.br/dentista")
        .then((res) => res.json())
        .then((data) => setDentist(data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <h1>Home</h1>
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
