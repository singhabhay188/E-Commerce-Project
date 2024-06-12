const jwt = require('jsonwebtoken');

const generateTokenFromUser = (user) => {
    return jwt.sign({ id: user._id , name:user.name, email: user.email }, process.env.JWT_KEY);
}

module.exports = generateTokenFromUser;