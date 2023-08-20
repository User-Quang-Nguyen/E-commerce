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

    if (!decoded) {
        return false;
    } else {
        const info = {
            'userID': decoded.id,
        };
        return info;
    }
}

async function loginVerification(token) {
    const secretKey = "jwtsecrect";
    try {
        const result = await jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return "Invalid token";
            } else {
                const info = {
                    'userID': decode.id,
                };
                return info;
            }
        }
        )
        return result;
    }
    catch (error) {
        return "Invalid token";
    }
}

module.exports = {
    createToken: createToken,
    loginVerification: loginVerification,
    authentication: authentication
}