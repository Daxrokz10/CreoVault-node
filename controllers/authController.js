import Project from '../models/project.js';
import User from '../models/usrSchema.js';

const authCtl = {
    signuppage(req, res) {
        res.render('./pages/auth/signup.ejs');
    },
    async handleSignup(req, res) {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({
                username,
                email,
                password
            });
            await newUser.save();
            res.redirect('/login');
        } catch (error) {
            console.log(error.message);
        }
    },
    loginpage(req, res) {
        res.render('./pages/auth/login.ejs');
    }
}

export default authCtl;