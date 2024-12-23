const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

module.exports.createUser = async (userInfo) => {
    try {
        let hashedPassword = await bcrypt.hash(userInfo.password, 12);

        const newUser = new UserModel({
            username: userInfo.username,
            password: hashedPassword,
            name: userInfo.name
        });

        await newUser.save();
    }catch (err){
        throw new Error('Error creating a new user, try again later buddy.');
    }
};

module.exports.doesUserExist = async (username) => {
    const existingUser = await UserModel.findOne({
        username: username
    });
    if(existingUser){
        return true;
    } else {
        return false;
    }
};

module.exports.checkCredentuals = async (username, password) =>{
    try{
        const user = await UserModel.findOne({
            username: username
        });
        let isCorrectPassword = await bcrypt.compare(password,user.password);
        if(isCorrectPassword){
            return user;
        }else{
            return null;
        }
    }catch (error){
        throw new Error('Error logging in');
    }
};

module.exports.generateJWT = (user) => {
    const jwtPayload = {
        userId: user._id,
        username: user.username
    };
    const jwtSecret = process.env.JWT_SECRET;
    try{
        let token = JWT.sign(jwtPayload, jwtSecret, {expiresIn: '1h'});
        return token;
    } catch (error){
        throw new Error('Failed to sign in');
    }
};