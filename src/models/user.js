const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,
    },
   role: {
        type: String,
       enum: ['admin', 'user'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    },


} ,  {
    timestamps: true,
})

// userSchema.virtual('password')
//     .set(function (password) {
//     this.hash_password=bcrypt.hashSync(password, 10)
//     })



userSchema.methods.authenticate = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.hash_password);
    return isMatch;
};

userSchema.virtual('fullName')
    .get(function () {
        return ` ${this.firstName} ${this.lastName}`
})


// userSchema.methods = {
//     authenticate:  function (password) {
//         return  bcrypt.compareSync(password, this.hash_password)
//     }
// }

// console.log("UserSchema.methods", userSchema.methods);
module.exports = mongoose.model('User', userSchema)