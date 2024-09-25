import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios"; // Импортируем AxiosResponse для типизации

export const Registration = () => {
  const navigate = useNavigate();
  
  // Состояния для данных формы
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companies, setCompanies] = useState<string[]>([]); // Для хранения списка компаний
  
  // Состояние для переключения между формами
  const [isWithCompany, setIsWithCompany] = useState(false); 

  // Получаем список компаний при переключении на форму с полем компании
  useEffect(() => {
    if (isWithCompany) {
      axios.get("http://95.163.229.161:8080/api/v1/companies?page=0&size=1000&sort=name%2CASC")
        .then((response: AxiosResponse) => {  // Добавляем тип AxiosResponse
          const companyNames = response.data.data.content.map((company: { name: string }) => company.name); // Указываем тип объекта компании
          setCompanies(companyNames); // Устанавливаем список компаний
        })
        .catch((error: unknown) => { // Указываем тип для ошибки
          console.error("Ошибка при получении компаний", error);
        });
    }
  }, [isWithCompany]); // Запрос отправляется только при переключении на форму с компанией

  // Обработчик отправки формы
  const handleRegistration = () => {
    if (fullName && email && password && (isWithCompany ? companyId : true)) {
      navigate("/main");  // Переход на основную страницу
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className={styles.middleWrapper}>
      <div className={`${styles.formBlock} ${styles.rounded}`}>
        {/* Поле для полного имени */}
        <div className={styles.rowObject}>
          <div className={styles.typography}>Полное имя</div>
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className={styles.inputStyle}
            placeholder="Введите ваше полное имя"
          />
        </div>
        
        {/* Поле для email */}
        <div className={styles.rowObject}>
          <div className={styles.typography}>Email</div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={styles.inputStyle}
            placeholder="Введите ваш email"
          />
        </div>

        {/* Поле для пароля */}
        <div className={styles.rowObject}>
          <div className={styles.typography}>Пароль</div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={styles.inputStyle}
            placeholder="Введите ваш пароль"
          />
        </div>

        {/* Поле для выбора компании (показывается, если форма с полем компании) */}
        {isWithCompany && (
          <div className={styles.rowObject}>
            <div className={styles.typography}>Компания</div>
            <select
              onChange={(e) => setCompanyId(e.target.value)}
              className={styles.inputStyle}
              defaultValue=""
            >
              <option value="" disabled>Выберите компанию</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>{company}</option>
              ))}
            </select>
          </div>
        )}

        {/* Кнопка отправки формы */}
        <div className={styles.rowObject}>
          <div className={styles.button} onClick={handleRegistration}>
            Отправить
          </div>
        </div>

        {/* Кнопка переключения между формами */}
        <div className={styles.rowObject}>
          <div className={styles.switchButton} onClick={() => setIsWithCompany(!isWithCompany)}>
            {isWithCompany ? "Регистрация без компании" : "Регистрация с компанией"}
          </div>
        </div>

        <div className={styles.textLink}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
};
