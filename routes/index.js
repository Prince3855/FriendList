const express = require('express');
const router = express.Router();
const User = require('../models/user');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Middlewares
const { asyncErrorHandler, isLogedIn, isAuthenticated } = require('../middleware/index');


/* GET home page. */
router.get('/', isLogedIn, asyncErrorHandler(
  async (req, res, next) => {
    let user = await User.findOne({ where: { name: req.session.user } });
    let friends = [];
    const email = user.dataValues.email;
    if (user.dataValues.friends != undefined) friends = user.dataValues.friends.split(',');
    res.render('index', { email , friends });
  }
));

/* GET login page. */
router.get('/login', isAuthenticated, async function (req, res, next) {
  res.render('login', {});
});

/* GET register page. */
router.get('/register', isAuthenticated, function (req, res, next) {
  res.render('register', {});
});

/* POST login page. */
router.post('/login', asyncErrorHandler(
  async (req, res, next) => {
    let user = await User.findOne({ where: { name: req.body.userName } });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.dataValues.password);
      if (match) {
        req.session.success = "Logged In Succesfully!";
        req.session.user = user.dataValues.name;
        res.redirect('/');
      }
      else {
        req.session.error = "Invalid Password!";
        res.redirect('/login');
      }
    } else {
      req.session.error = "Invalid Email or User not found!";
      res.redirect('/login');
    }

  }
));

/* POST register page. */
router.post('/register', asyncErrorHandler(
  async (req, res, next) => {

    if(req.body.password != req.body.confirmPassword){
      req.session.error = "Password dose not Match!";
      return res.redirect('/register');
    }
    let hashValue=await bcrypt.hash(req.body.password, 10);
    let user = await User.create({
      name: req.body.userName,
      email: req.body.email,
      password: hashValue,
    });
    req.session.success = "Account created Succesfully!";
    res.redirect('/login');
  }
));

/* GET Logout  */
router.get('/logout', asyncErrorHandler(
  async (req, res, next) => {
    delete req.session.user;
    req.session.success = "Logged out Succesfully!";
    res.redirect('/login');
  }
));


/* GET add friend page. */
router.put('/addfriend', asyncErrorHandler(
  async (req, res, next) => {

    let friend = await User.findOne({where:{name:req.body.handle}});

    if(friend===null){
      req.session.error = "User does not Exist";
      return res.redirect('/');
    }

    let user = await User.findOne({ where: { name: req.session.user } });

    if(req.session.user === friend.dataValues.name){
      req.session.error = "You can't add yourself!";
      return res.redirect('/');
    }

    let friends = [];
    console.log(friends.length)
    if (user.dataValues.friends != null) friends = user.dataValues.friends.split(',');
    
    friends.push(req.body.handle);
    let friStr = friends.join(',');
    let updatedUser = await User.update({friends:friStr},{where : {userId:user.dataValues.userId}});
    req.session.success = "Friend added into your FriendList!";
    res.redirect('/');
  }
));


// GET RemoveFriend
router.get('/removefriend/:username', isLogedIn, asyncErrorHandler(
  async (req,res,next) => {
    const user = await User.findOne({where : {name : req.session.user}});
    let friends = [];
    friends = user.dataValues.friends.split(',');
    
    let index = friends.indexOf(req.params.username);
    friends.splice(index,1);
    let friStr;
    if(friends.length>0) fristr = friends.join(',');
    else fristr=null;

    await User.update({friends:fristr},{where : {userId:user.dataValues.userId}});
    req.session.success = "Friend removed successfully from your list!";
    res.redirect('/');
  }
));


module.exports = router;
