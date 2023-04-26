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

  useEffect(() => {
    axios.get('http://localhost:5000/battery')
      .then(res => {
        setBatteries(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [batteries]);

  function addBattery(newBattery: Battery) {
    axios.post('http://localhost:5000/battery', newBattery)
      .then(res => {
        setBatteries(prevBatteries => [...prevBatteries, res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function deleteBattery(id: number) {
    axios.delete(`http://localhost:5000/battery/${id}`)
      .then(res => {
        setBatteries(prevBatteries => prevBatteries.filter(battery => battery.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function updateBattery(updatedBattery: Battery) {
    axios.put(`http://localhost:5000/battery/${updatedBattery.id}`, updatedBattery)
      .then(res => {
        setBatteries(prevBatteries => prevBatteries.map(battery => {
          if (battery.id === updatedBattery.id) {
            return updatedBattery;
          }
          return battery;
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const name: string = (event.target[0] as HTMLInputElement).value;
    const price: number = parseFloat((event.target[1] as HTMLInputElement).value);
    const newBattery: Battery = { id: batteries.length + 1, name, price };
    addBattery(newBattery);
    event.target.reset();
  }


  function handleDelete(id: number) {
    deleteBattery(id);
  }

  function handleUpdate(updatedBattery: Battery) {
    updateBattery(updatedBattery);
  }


  return (
    <div>
    <form onSubmit={handleSubmit}>
        <label htmlFor="">add battery</label>
        <input type="text" />
        {/* allow 2 decimals */}
        <input type="number" step="0.01" />
        <button>add</button>
    </form>
    {batteries.map((battery: Battery) => (
      <div key={battery.id}>
        <h2>{battery.name}</h2>
        <p>{battery.price}</p>
        <button onClick={() => handleDelete(battery.id)}>delete battery</button>
        <button onClick={() => handleUpdate({...battery, price: 10})}>update battery</button>
      </div>
    ))}
  </div>
  );
}

export default App;
