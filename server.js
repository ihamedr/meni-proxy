const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// آدرس‌های جدا برای هر Google Apps Script
const NON_REF_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVtOq8vLhEh_rkH8vsZ7-TugpHQGHffNOyZM3HtB8VkmXtAw3kxuETgwMbxt3WC24yvg/exec';
const REF_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby11q80RS8PFy-g6eOiz6e0OeKtL0kkk_HAa-b0d3hRPuA1P3_rak2VFMoqq2kptji85Q/exec';

app.post('/proxy', async (req, res) => {
  try {
    const data = req.body;

    let targetUrl;
    if (data.referrer_id) {
      // اگر referrer_id داریم → یعنی درخواست مربوط به referral است
      targetUrl = REF_SCRIPT_URL;
    } else {
      // در غیر اینصورت → non ref
      targetUrl = NON_REF_SCRIPT_URL;
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      body: JSON.stringify(data),
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