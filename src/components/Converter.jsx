import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
//Axios для запросов на сервер, в нашем случае - на бесплатный API c текущим курсом валют
import Dropdown from "react-dropdown";
// Dropdown это библиотека для выпадающих списков
import { HiSwitchHorizontal } from "react-icons/hi";
//Для того, чтобы использовать функцию Flip , тем самым меняя валюты вверх ногами(была гривна к долларам, стало доллары к гривнам)
import "react-dropdown/style.css";
import styles from "./style.module.scss";

const Converter = () => {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  //   В нижних двух const мы можем изменить изначальную валюту, отображаемую на странице, а через setFrom и setTo назначить нашу новую валюту для обмена
  const [from, setFrom] = useState("uah");
  const [to, setTo] = useState("usd");

  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);
  //Используем это для того, чтобы вызывать наш API каждый раз когда меняются зависимости

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);
  //Используем для того, вызвать функцию конвертации, когда мы(или любой юзер) меняет валюту

  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }
  //Вот собственно и функция, которую вызываем мы(или юзер) чтобы конвертировать валюту

  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
  //А это функция для изменения между двумя валютами

  return (
    <div className={styles.converterBody}>
      <div className={styles.converterWrapper}>
        <div className={styles.header}>
          <h1>Конвертер Валют</h1>
        </div>
        <div>
          <div className={styles.quantity}>
            <h4>Введите количество валюты для обмена</h4>
            <input
              type="text"
              placeholder="Количество"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <h3>С этой валюты:</h3>
            <Dropdown
              options={options}
              onChange={(e) => {
                setFrom(e.value);
              }}
              value={from}
              placeholder="From"
            />
          </div>
          <div>
            <HiSwitchHorizontal
              size="30px"
              onClick={() => {
                flip();
              }}
            />
          </div>
          <div>
            <h3>Меняем на эту:</h3>
            <Dropdown
              options={options}
              onChange={(e) => {
                setTo(e.value);
              }}
              value={to}
              placeholder="To"
            />
          </div>
        </div>
        <div>
          <div className={styles.convertButtonWrapper}>
            <button
              className={styles.button}
              onClick={() => {
                convert();
              }}
            >
              Конверировать
            </button>
          </div>
          <div className={styles.result}>
            <h2>Итоговый результат:</h2>
            <p className={styles.resultNumbers}>
              {input + " " + from + " = " + output.toFixed(2) + " " + to}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
