import React, { useState } from 'react';
import './App.css'; // Убедитесь, что импортируете CSS
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
  const [price, setPrice] = useState('');
  const [keywords, setKeywords] = useState('');
  const [availability, setAvailability] = useState(false);
  const [results, setResults] = useState([]);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.checked);
  };

  const handleSearch = () => {
    // Построение параметров запроса
    const params = new URLSearchParams({
      price: price,
      keywords: keywords,
      availability: availability,
    });
    fetch(`/search_llm?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <h1 className="title">Поиск нужного ИИ.</h1>
      <p className="instructions">
        Для получения данных о подходящей нейронной сети вам необходимо ввести данные по максимально допустимой цене в месяц, ключевым словам и доступности в РФ без VPN.
      </p>

      <div className="search-form">
        <TextField
          label="Цена"
          variant="outlined"
          type="number"
          value={price}
          onChange={handlePriceChange}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          label="Ключевые слова"
          variant="outlined"
          value={keywords}
          onChange={handleKeywordsChange}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={availability}
              onChange={handleAvailabilityChange}
              color="primary"
            />
          }
          label="Доступность"
          style={{ marginBottom: '10px' }}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Поиск
        </Button>
      </div>

      {/*<div className="results" style={{ marginTop: '20px' }}>*/}
      {/*  /!* Отображение результатов *!/*/}
      {/*  {results.length > 0 ? (*/}
      {/*    <ul className="results-list">*/}
      {/*      {results.map((item, index) => (*/}
      {/*        <li key={index} className="result-item">*/}
      {/*          <h3>{item.name}</h3>*/}
      {/*          <p>{item.description}</p>*/}
      {/*          <p>Цена: {item.price}</p>*/}
      {/*          <p>*/}
      {/*            Наличие: {item.status ? 'Доступен' : 'Недоступен'}*/}
      {/*          </p>*/}
      {/*        </li>*/}
      {/*      ))}*/}
      {/*    </ul>*/}
      {/*  ) : (*/}
      {/*    <p>Результаты не найдены.</p>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
}

export default App;

// только для цены
// import './App.css';
// import { useState } from "react";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
//
// function App() {
//     const [price, setPrice] = useState(0);
//     const changePriceValue = (e) => {
//         setPrice(e.target.value);
//     };
//     const handleButton = () => {
//         console.log(price);
//         // запрос в программный интерфейс
//     };
//     return (
//         <div className="App">
//             <div>
//                 <TextField
//                     id="outlined-basic"
//                     label="Введите цену"
//                     variant="outlined"
//                     onChange={changePriceValue}
//                 />
//                 <Button onClick={handleButton}>Применить</Button>
//             </div>
//         </div>
//     );
// }
//
// export default App;