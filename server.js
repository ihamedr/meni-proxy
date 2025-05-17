const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwoAey850e577mnXzsWvryXt3m6qtBjW3H874LPGUiBvJ895EEg16pd7SxlFACK2GNOsQ/exec'; // لینک درستت رو جایگزین کن

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });
    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Error forwarding request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});