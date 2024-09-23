const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let targetNumber = null;

app.post('/set-target', (req, res) => {
    targetNumber = req.body.target;
    res.json({ success: true, message: 'Target number set successfully' });
});

app.get('/get-target', (req, res) => {
    res.json({ target: targetNumber });
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
