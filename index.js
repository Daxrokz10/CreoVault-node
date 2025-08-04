const express = require('express');
const path = require('path');
const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sample home route
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const Project = require('./models/project');

app.post('/add-project', async (req, res) => {
  try {
    const { title, description, category, imageUrl } = req.body;

    const newProject = new Project({
      title,
      description,
      category,
      imageUrl
    });

    await newProject.save();
    res.redirect('/'); // or res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving project');
  }
});
