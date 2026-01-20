import express from 'express';
import db from './data/db.js';
import route from './routers/projectrout.js';

const PORT = process.env.PORT || 3000;
const app = express();

// View engine
app.set('view-engine', 'ejs');

// Static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/',route);

app.listen(PORT, (err) => {
  if(err){
    console.log(err);    
  }else{
    console.log(`Server running at http://localhost:${PORT}`);
  }
});