import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:5000/')
  //     .then(res => {
  //       setMessage(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  type Battery = {
    id: number;
    name: string;
    price: number;
  };

  const [batteries, setBatteries] = useState<Battery[]>([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/battery')
      .then(res => res.json())
      .then(data => setBatteries(data))
      .catch(error => console.log(error))
  }, []);
  // const [batteries, setBatteries] = useState<Battery[]>([]);
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/battery')
  //     .then(response => response.json())
  //     .then(data => setBatteries(data))
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <div>
      <p>{message}</p>
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
