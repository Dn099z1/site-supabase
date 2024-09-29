import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [name, setName] = useState('');
  const [validUntil, setValidUntil] = useState(''); // Usar string para input de data
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add-license', { 
        name,
        valid_until: new Date(validUntil).toISOString(), // Converte para string ISO
      });
      setMessage('Licença adicionada com sucesso!');
    } catch (error) {
      setMessage('Erro ao adicionar licença: ' + (error.response?.data?.error || 'Erro desconhecido'));
    }
  };

  return (
    <div className="container">
      <h1>Adicionar Licença</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome da Licença:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Data de Validade:</label>
          <input
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Adicionar Licença</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Home;
