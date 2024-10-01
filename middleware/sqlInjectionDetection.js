const sqlInjectionPatterns = [
    /(\b(SELECT|UPDATE|DELETE|INSERT|WHERE|AND|OR|FROM|TABLE|DROP|UNION)\b)/i,
    /'/, // Single quote
    /--/, // SQL comment
    /\b(1=1)\b/i, // Common SQL injection
    /;.*\n/, // Semicolon followed by new line
];

const sqlInjectionDetector = (req, res, next) => {
    const body = JSON.stringify(req.body);
    const url = req.url;

    for (const pattern of sqlInjectionPatterns) {
        if (pattern.test(body) || pattern.test(url)) {
            return res.status(400).json({ error: 'Potential SQL injection detected' });
        }
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = sqlInjectionDetector;
