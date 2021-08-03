// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const userSchema = new mongoose.Schema(
//     {
//         email: {
//             type: String,
//             required: [true, "Email is required"],
//             trim: true,
//             lowercase: true,
//             unique: true,
//         },
//         password: {
//             type: String,
//             required: [true, "Password is required"],
//             trim: true,
//         },
//         // name: {
//         //     type: String,
//         //     required: true,
//         //     trim: true
//         // },
//         posts: [
//             {
//                 post: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'Post'
//                 }
//             }
//         ],
//         tokens: [
//             {
//                 token: {
//                     type: String,
//                     required: true,
//                 },
//             },
//         ]
//     },
//     {
//         timestamps: true,
//     }
// );


// userSchema.pre("save", async function (next) {
//     const user = this;

//     if (user.isModified("password")) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }

//     next();
// });

// userSchema.statics.findUserbyEmailAndPassword = async (email, password) => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error("unable to login");
//     }
//     const isPassMatch = await bcrypt.compare(password, user.password);
//     if (!isPassMatch) {
//         throw new Error("unable to login");
//     }

//     return user;
// };

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign(
//         {
//             _id: user._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//             expiresIn: "6h"
//         }
//     );
//     user.tokens = user.tokens.concat({ token });
//     await user.save();
//     return token;
// };

// userSchema.methods.toJSON = function () {
//     const user = this;
//     const userObj = user.toObject();

//     delete userObj.password;
//     delete userObj.tokens;

//     return userObj;
// };

// const User = mongoose.model("User", userSchema);

// module.exports = User;