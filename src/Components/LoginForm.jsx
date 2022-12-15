import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextGlobal } from "./service/context";
import { setTokenInStorage } from "./service/storage";
import styles from "../Components/style/Form.module.css";

const LoginForm = () => {
  const { theme, setLogin } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      fetch(`https://dhodonto.ctdprojetos.com.br/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.login,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTokenInStorage(data.token);
          setLogin();
          navigate("/home");
          alert("Usuário logado com sucesso. Redirecionando...")
        })
    } catch (e) {
      console.log(e.message);
      alert("Erro ao tentar conectar. /n Erro:" + e.message)
    }
  };

  return (
    <div
      className={`text-center card container ${styles.card} ${
        isDarkMode ? styles.cardDark : ""
      }`}
    >
      <div className={`card-body ${styles.CardBody}`}>
        <form onSubmit={handleSubmit}>
          <input
            className={`form-control ${styles.inputSpacing}`}
            placeholder="Login"
            name="login"
            required
          />
          <input
            className={`form-control ${styles.inputSpacing}`}
            placeholder="Password"
            name="password"
            type="password"
            required
          />
          <button className="btn btn-primary" type="submit">
            Acessar sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
