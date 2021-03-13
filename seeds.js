const User = require('./models/user');
const bcrypt = require('bcrypt');
const { asyncErrorHandler } = require('./middleware/index');

const users = [
    {
        userId : 1,
        userName : "prince3855",
        email : "prince123@gmail.com",
        password : "prince123"
    },
    {
        userId : 2,
        userName : "henil_1718",
        email : "henil3855@gmail.com",
        password : "henil@1718"
    },
    {
        userId : 3,
        userName : "krunal9220",
        email : "krunalmathukiya@gmail.com",
        password : "33035#krunal"
    },
    {
        userId : 4,
        userName : "jaydeep_13",
        email : "jd4@gmail.com",
        password : "jd@1991"
    },
    {
        userId : 5,
        userName : "krenil1511",
        email : "krenilbh@gmail.com",
        password : "krebh@3855"
    },
    {
        userId : 6,
        userName : "meet",
        email : "180110107021@gmail.com",
        password : "codechef@pass"
    },
    {
        userId : 7,
        userName : "admin",
        email : "admin@gmail.com",
        password : "admin"
    },
    {
        userId : 8,
        userName : "jaygodhani",
        email : "godhani@gmail.com",
        password : "gjay_2208"
    },
    {
        userId : 9,
        userName : "arjun123",
        email : "myemail@gmail.com",
        password : "password"
    },
    {
        userId : 10,
        userName : "abdul386",
        email : "abdul386@gmail.com",
        password : "abdul@password"
    }
];

const createUser = async () => {
    for(let i=0 ; i<10; i++){
        let hashValue = await bcrypt.hash(users[i].password, 10);
        await User.create({
          name: users[i].userName,
          email: users[i].email,
          password: hashValue,
        });
    };
}

module.exports = createUser;