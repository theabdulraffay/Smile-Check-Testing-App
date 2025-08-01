// import mongoose, { Schema, model } from "mongoose";
// import bcrypt from "bcrypt";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     passwordChangedAt:Date,
//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     verified: {
//       type: Boolean,
//       default: false,
//     },
//     blocked: {
//       type: Boolean,
//       default: false,
//     },

//     wishlist:[{type:Schema.ObjectId,ref : 'product'}],
//     addresses:[{
//       city:String,
//       street:String,
//       phone:String
//     }]
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", function () {
//   this.password = bcrypt.hashSync(this.password, 8);
// });

// userSchema.pre("findOneAndUpdate", function () {
//     if(this._update.password){
//         this._update.password = bcrypt.hashSync(this._update.password, 8);
//     }

// });

// export const userModel = model("user", userSchema);

import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
    },
    age: {
      type: Number,
      required: true, // if age is mandatory
      min: 0,
    },
    googleId: {
      type: String,
      default: null,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    wishlist: [{ type: Schema.ObjectId, ref: "product" }],
    addresses: [
      {
        city: String,
        street: String,
        phone: String,
      },
    ],
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isGoogleUser) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.password && !update.isGoogleUser) {
    update.password = bcrypt.hashSync(update.password, 8);
  }
  next();
});

export const userModel = model("user", userSchema);
