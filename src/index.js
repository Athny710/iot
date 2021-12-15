const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,'public')));
app.set('port', port);

const server = app.listen(app.get('port'), ()=>{
    console.log('App running on port ', app.get('port'));
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'/html/inicio.html'));
});
