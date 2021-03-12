
const session = require('express-session');

module.exports = {
    asyncErrorHandler : (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        },

    isLogedIn : (req,res,next) => {
        if(!req.session.user){
            req.session.error = "Login First!";
            return res.redirect('/login');
        }
        next();
    },

    isAuthenticated : (req,res,next) => {
        if(req.session.user){
            req.session.error = "Logout from Current Account First!";
            return res.redirect('/');
        }
        next();
    }
}