const express = require('express');
const app = express();
const PORT = 8080;


app.use(express.json());

app.use('/account', require('./routes/Account'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});