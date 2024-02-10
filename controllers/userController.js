const { User, Address } = require('./../models/user');
const crypto = require('crypto');
const fs = require('fs');

async function registerUser(user_data){
    try {
        const user = User.build(user_data);

        const salt = 'xngq8908r%80&84r';
        user.password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, `sha512`).toString(`hex`);
        user.is_active = true;

        // console.log()
        await user.save();
        return user;
    } catch (error) {
        return error;
    }
}

async function authUser(req, res){
    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if (!user || req.body.email === "" || req.body.password === "") {
        return false;
    }
    else{
        const salt = 'xngq8908r%80&84r';
        hash_password = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
        if(hash_password === user.password){
            user.last_login = new Date();
            user.save();
            
            return user;
        }
        else{
            return false;
        }   
    }
}

async function getUserAddress(userId, addressId = false){
    var where = { user: userId }
    
    if(addressId !== false) {
        where = {
            user: userId,
            id: addressId
        }
    }
    const address = await Address.findAll({
        where: where
    });

    return address;
}

async function setDefaultAddress(userId, addressId){
    await Address.update({is_default: 0}, {
        where: {
            user: userId
        }
    });

    await Address.update({is_default: 1}, {
        where: {
            user: userId,
            id: addressId
        }
    });

    return true;
}

async function addUserAddress(userId, formData){
    
    formData.is_default = formData.is_default == 'on'? 1: 0;
    const newAddress = await Address.build({ 
        user: userId,
        name: formData.name,
        mobile_no: formData.mobile_no,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        landmark: formData.landmark,
        city: formData.city,
        pincode: formData.pincode,
        type: formData.type,
        is_default: formData.is_default 
    });

    newAddress.save();
    if(formData.is_default == 1) await setDefaultAddress(userId, newAddress.id);
    return true;
}

async function removeUserAddress(userId, addressId){
    await Address.destroy({
        where:{
            id: addressId,
            user: userId, 
        } 
    });

    return true;
}

module.exports = { registerUser, authUser, getUserAddress, setDefaultAddress, addUserAddress, removeUserAddress }