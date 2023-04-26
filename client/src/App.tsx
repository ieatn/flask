import React, { useState, useEffect } from 'react';
// npm i axios
import axios from 'axios';

function App() {

  type Battery = {
    id: number;
    name: string;
    price: number;
  };
  const [batteries, setBatteries] = useState<Battery[]>([]);

  // AXIOS
  useEffect(() => {
    axios.get('http://localhost:5000/battery')
      .then(res => {
        setBatteries(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // REST API
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/battery')
  //     .then(res => res.json())
  //     .then(data => setBatteries(data))
  //     .catch(error => console.log(error))
  // }, []);

 

  return (
    <div>
      {batteries.map((battery: Battery) => (
        <div key={battery.id}>
          <h2>{battery.name}</h2>
          <p>{battery.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
