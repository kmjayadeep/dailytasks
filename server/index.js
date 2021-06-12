const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (_req,res)=>{
  res.send('Dailytasks')
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log('listening')
});
