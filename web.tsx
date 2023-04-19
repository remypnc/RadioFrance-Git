import React, { useState, useEffect } from 'react';
import axios from 'axios';


  const [message, setMessage] = useState('');
  const [maxUsers, setMaxUsers] = useState(0);

  // Utilisation de useEffect pour récupérer le nombre de personnes admises simultanément depuis le backoffice
  useEffect(() => {
    axios.get('/config.json')
      .then(response => {
        setMaxUsers(response.data.maxUsers);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);