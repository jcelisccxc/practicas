const express = require('express');
const app = express();
app.use(express.json());

app.get('/producto/:slug?', (req, res) => {
    const slug = req.
}) 