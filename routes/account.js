const express = require('express');
const router = express.Router();
const{ User } = require('./../models/user');
const crypto = require('crypto');
const { getUserAddress, setDefaultAddress } = require('../controllers/userController');
const { addressType } = require('./../inc/eum');

router.get('/profile', async (req, res) => {
    const userId = 15;
    res.locals.title = 'Profile';
    const user = await User.findByPk(userId, { attributes: ['first_name', 'last_name', 'email'] });

    const status = req.query.s;
    if(status && status != ''){
        const message = req.query.m;

        res.locals.status = status == 'e'? 'error': 'success';
        res.locals.message = message;
    }
    

    res.render('profile', { 'user': user });
});

router.post('/updadeprofile', async (req, res) => {
    const userId = 15;
    const user = await User.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        },
        {
            where: { id: userId }
        }
    );

    param = '?s=s&m=Profile has been updated successfully.';

    res.redirect('/account/profile' + param);
});

router.post('/changepassword', async (req, res) => {
    const userId = 15;
    const current_password = req.body.current_password
    const new_password = req.body.new_password
    const confirm_password = req.body.confirm_password
    
    let param = '';
    if(new_password !== confirm_password){
        param = 's=e&m=New password and confirm password didn\'t matched.';
    }
    else{
        const salt = 'xngq8908r%80&84r';
        const currenthash_password = crypto.pbkdf2Sync(current_password, salt, 1000, 64, `sha512`).toString(`hex`);
        hash_password = crypto.pbkdf2Sync(new_password, salt, 1000, 64, `sha512`).toString(`hex`);
        const user = await User.findByPk(userId);
        
        try{
            if(currenthash_password === user.password){
                await User.update({ password: hash_password }, {
                    where: { id: userId }
                });

                param = 's=s&m=Password has been changed successfully.';
            }
            else{
                param = 's=e&m=Please enter correct current password.';
            }
        }
        catch(err) {
            param = `s=e&m=${err.message}`;
        }

    }
    
    res.redirect('/account/profile?' + param);
});

router.get('/orders', (req, res) => {
    res.send('profile');
});

router.get('/address', (req, res) => {
    getUserAddress(1).then((address) =>{
        res.locals.title = 'Address';
        res.render('address', {'address': address, 'addressType': addressType});
    });
    
});

router.get('/mark-default-address/:addressId', (req, res) => {
    const addressId = req.params.addressId;
    setDefaultAddress(1, addressId).then(() => {
        res.redirect('/account/address');
    });
});

router.get('/orders', (req, res) => {
    res.send('profile');
});


module.exports = router;