const jwt = require('jsonwebtoken');

// user defined middleware
function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' }); // Ensure to return here
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next(); // Call next() to proceed to the next middleware
    } catch (err) {
        return res.status(401).json({ message: 'unauthorized' }); // Ensure to return here
    }
}

module.exports = auth;