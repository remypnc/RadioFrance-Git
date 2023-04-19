function App() {
  const [message, setMessage] = useState('');
  const [showCameras, setShowCameras] = useState(false);

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

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const SpeechConfig = sdk.SpeechConfig;
const axios = require("axios");
const fs = require("fs");

const subscriptionKey = "c72231709fe84b9e893a4aaa4e371928";
const region = "France-Centre";

const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, region);

const MAX_USERS_FILE_PATH = "maxUsers.js";

// Charge une image depuis l'URL spécifiée et renvoie un tableau de coordonnées des personnes détectées
async function detectPeople(url) {
  const response = await axios({
    method: "post",
    url: "https://francecentral.api.cognitive.microsoft.com/vision/v3.2/detect",
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-Type": "application/json",
    },
    data: {
      url,
    },
  });
  const people = response.data.objects.persons.map((person) => person.rectangle);
  return people;
}

// Vérifie si le nombre de personnes actuellement présentes dépasse la limite de distanciation sociale
function checkLimit(currentUsers, maxUsers) {
  const extraUsers = currentUsers - maxUsers;
  if (extraUsers > 0) {
    console.log(`La limite de distanciation sociale est dépassée de ${extraUsers} personnes`);
    return false;
  }
  return true;
}

// Lit le nombre de personnes maximum à partir du fichier MAX_USERS_FILE_PATH
function readMaxUsers() {
  let maxUsers = 0;
  if (fs.existsSync(MAX_USERS_FILE_PATH)) {
    maxUsers = require("./" + MAX_USERS_FILE_PATH);
  }
  return maxUsers;
}

// Sauvegarde le nombre de personnes maximum dans le fichier MAX_USERS_FILE_PATH
function writeMaxUsers(maxUsers) {
  fs.writeFileSync(MAX_USERS_FILE_PATH, "module.exports = " + maxUsers + ";");
}

// Fonction à appeler pour sauvegarder un message
function handleSendMessage(message) {
  fs.writeFileSync("message.js", "module.exports = '" + message + "';");
}

// Fonction à appeler pour sauvegarder le nombre de personnes maximum
function handleSetMaxUsers(maxUsers) {
  writeMaxUsers(maxUsers);
}

// Lit le message sauvegardé dans le fichier "message.js"
function readMessage() {
  let message = "";
  if (fs.existsSync("message.js")) {
    message = require("./message.js");
  }
  return message;
}

module.exports = {
  detectPeople,
  checkLimit,
  readMaxUsers,
  writeMaxUsers,
  handleSendMessage,
  handleSetMaxUsers,
  readMessage,
  speechConfig,
};

  // Diffuse un message vocal
  function handleBroadcastVoiceMessage() {
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(message, (result) => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("Audio file generated");
      } else {
        console.error(result.errorDetails);
      }
    });
  };

  // Charge le fichier audio en français
  const loadFrenchAudioFile = () => {
    // Code pour charger le fichier audio en français
  };

  // Charge le fichier audio en anglais
  const loadEnglishAudioFile = () => {
    // Code pour charger le fichier audio en anglais
  };

  // Exécute le script principal
  function startScript() {
    if (!checkLimit()) {
      // Diffuse le message vocal
      handleBroadcastVoiceMessage();
      return;
    }
  };

  useEffect(() => {
    // Charge l'image de la caméra
    loadCameraImage();

    // Charge les fichiers audio
    loadFrenchAudioFile();
    loadEnglishAudioFile();

    // Exécute le script principal
    startScript();
  }, []);
}

export default App;
