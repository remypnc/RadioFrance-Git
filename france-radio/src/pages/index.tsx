import Image from 'next/image'
import { Inter } from 'next/font/google';
import React, { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function UserInterface() {
  const [showCameras, setShowCameras] = useState(false);
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState(false);

  const handleToggleSound = () => {
    setSound(!sound);
  };

// Active/Désactive l'affichage des caméras
const handleToggleCameras = () => {
  setShowCameras(!showCameras);
};

const handleSendMessage = () => {
  if (message) {
    const speech = require("./ressources/SpeechSynthesis.js");
    speech.speakText(message);
  }
};

  return (
    <div className="mx-auto px-20 py-6 bg-gray-800 text-white">
    <a rel="icon" href="radio-france.ico" type="image/x-icon"></a>

    <div className="px-4 py-6 bg-gray-800 text-white flex items-center">
      <img src="radio-france.png" alt="Logo Radio France" className="left-0 w-24" />
      <h1 className="mx-auto text-4xl font-medium mb-4 text-center">Technologie de Distanciation Sociale</h1>
    </div>

    <div className="flex flex-col md:flex-row">
      <div className="md:w-3/4 md:pr-4">
        <label htmlFor="message" className="block font-medium mb-2 mt-20">Message :</label>
        <input id="message" className="w-full border-gray-300 rounded-md shadow-sm mb-4 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"/>
      
        <div className="flex justify-end">
          <button className="px-4 py-2 text-white ml-4" onClick={handleToggleSound}>{sound ? "ON" : "OFF"}</button>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleSendMessage}>Envoyer</button>
        </div>
      </div>

      <div className="md:w-1/4 md:pl-4">
        <label htmlFor="maxUsers" className="block font-medium mb-2 mt-20">Nombre de personnes admises :</label>
        <input type="number" id="maxUsers" className="w-full border-gray-300 rounded-md shadow-sm mb-4 bg-gray-700 text-white" min="0" max="20"/>
      </div>
    </div>

    <div className="bg-gray-900 rounded-md shadow-md mt-28 p-4 mb-40">
      <h2 className="text-xl font-medium mb-4">Caméras</h2>
      <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 mb-4" onClick={handleToggleCameras}>{showCameras ? "Masquer" : "Afficher"}</button>
      {showCameras && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "30%", backgroundColor: "black" }}>
            <img src="https://via.placeholder.com/100" alt="Camera 1" style={{ width: "100%" }} />
          </div>
          <div style={{ width: "30%", backgroundColor: "black" }}>
            <img src="https://via.placeholder.com/100" alt="Camera 2" style={{ width: "100%" }} />
          </div>
          <div style={{ width: "30%", backgroundColor: "black" }}>
            <img src="https://via.placeholder.com/100" alt="Camera 3" style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </div>
  </div>
  );
}