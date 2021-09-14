const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}));

require('./registros/registro')(app);



app.listen(3001);

