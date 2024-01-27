const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('./../controllers/userController');

router.get('/signup', (req, res) => {
    res.locals.title = 'Signup';
    res.render('signup');
});

router.post('/signup', (req, res) => {
    const user_data = req.body;
    registerUser(user_data).then( function(user){
        if(user.id){
            res.locals.status = 'success';
            res.locals.message = 'Your accound has been created successfully. You can now <a href="/user/signin">login</a>';
        }
        else if(user.errors){
            res.locals.status = 'error';
            res.locals.message = user.errors[0].message
        }

        res.locals.title = 'Signup';
        res.render('signup');
    });
});

router.get('/signin', (req, res) => {
    res.locals.title = 'Signin';
    res.render('signin');
});

router.post('/signin', (req, res) => {
    res.locals.title = 'Signin';

    authUser(req, res).then( function(user){
        if(user){
            res.redirect('/');
        }
        else if(!user){
            // to be done
            res.locals.status = 'error';
            res.locals.message = `Please enter valid credientials.`
        }
        
        res.render('signin');
    });
});

module.exports = router;