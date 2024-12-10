const AuthService = require('../services/authservices');

module.exports.postUser = async (req, res) => {
    try{
        const userInfo = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
        };

        const userExists = await AuthService.doesUserExist(userInfo.username);
        if (userExists) {
            return res.status(422).send({
                error: 'Username already taken.'
            });
        }
        await AuthService.createUser(userInfo);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

module.exports.postLogin = async (req, res) => {
    const{username, password} = req.body;
    try{
        const user = await AuthService.checkCredential(username, password);

        if(!user){
            return res.status(401).send({
                error:
                'invalid credentials.'
            });
        }
        const jwt = await AuthService.generateJWT(user);
        res.send({
            jwt: jwt,
            message: 'Logged in successfully'
        });
    } catch (err) {
        res.status(500).send({
            error: error.message
        });
    }
};