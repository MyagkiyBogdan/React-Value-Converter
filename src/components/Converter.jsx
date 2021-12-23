import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import styles from "./style.module.scss";

const Converter = () => {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
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

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);
 

  function convert() {
    let rate = info[to];
    setOutput(input * rate);
  }
 

  function flip() {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }


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
