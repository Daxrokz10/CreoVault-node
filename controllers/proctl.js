import Project from '../models/project.js';
import User from '../models/usrSchema.js';

const proctl = {
    homepage(req, res) {
        res.render('./index.ejs');
    },
    async addproject(req, res) {
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
    },
    
}

export default proctl;