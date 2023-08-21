var jwt = require("jsonwebtoken");

function createToken(data) {
    const payload = {
        id: data.id,
    }
    const secretKey = "jwtsecrect";
    const token = jwt.sign(payload, secretKey, { expiresIn: '1000h' });
    return token;
}

function authentication(req) {
    const secret = "jwtsecrect";
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);

    if (!decoded) return false;
    
    const info = {
        'userID': decoded.id,
    };
    return info;
}

async function loginVerification(token) {
    const secretKey = "jwtsecrect";

    try {
        const decoded = await jwt.verify(token, secretKey);

        if (!decoded) return "Invalid token";

        const info = {
            'userID': decoded.id,
        };
        return info;
    } catch (error) {
        return "Invalid token";
    }
}

module.exports = {
    createToken: createToken,
    loginVerification: loginVerification,
    authentication: authentication
}