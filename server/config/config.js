const SECRETKEY = 'oumayma'
const EXPIRESIN = '5h'
const AUTHSCHEME = 'jwt'

module.exports = {
    jwtSecret: SECRETKEY,
    jwtSession: {
        session: false
    },
    authScheme: AUTHSCHEME,
    expiresIn: EXPIRESIN
};
