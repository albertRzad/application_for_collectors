const jwt = require('jsonwebtoken')

function tokenVerification(req, res, next) {
let token = req.headers["x-access-token"];
let password = req.body.password;

if (!token) {
return res.status(403).send({ message: "No token provided!" });
}

jwt.verify(token, password, (err, decodeduser) => {
if (err) {
return res.status(401).send({ message: "Invalid token!" });
}
req.user = decodeduser
next()
})
}
module.exports = tokenVerification;