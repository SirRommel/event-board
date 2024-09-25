import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Добавляем Link для навигации
import axios from "axios";
import styles from "./styles.module.scss";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (email && password) {
      axios
        .post("http://95.163.229.161:8080/api/v1/auth/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          const { accessToken } = response.data.data;
          localStorage.setItem("accessToken", accessToken);
          navigate("/main");
        })
        .catch((error) => {
          setError("Ошибка авторизации. Проверьте email и пароль.");
        });
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formBlock}>
        <h2 className={styles.title}>Вход</h2>

        <div className={styles.rowObject}>
          <div className={styles.label}>Email</div>
          <input
            type="email"
            className={styles.inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
        </div>

        <div className={styles.rowObject}>
          <div className={styles.label}>Пароль</div>
          <input
            type="password"
            className={styles.inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.rowObject}>
          <div className={styles.button} onClick={handleLogin}>
            Войти
          </div>
        </div>

        {/* Текст для перехода на страницу регистрации */}
        <div className={styles.textLink}>
          Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};
