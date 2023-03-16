const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema ({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    password:  {
        type: String,
        unique: true,
        required: true
    },
    picture:  {
        type: String,
        unique: true,
        default: ""
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
}, { timestamps: true });



UserSchema.pre("save", function (next) {
    var user = this;
  
    if (!user.isModified("password")) return next();
  
    bcrypt.hash(user.password, null, null, function (err, hash) {
      if (err) return next(err);
  
      user.password = hash;
      next();
    });
  });

  UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  UserSchema.methods.gravatar = function (size) {
    if (!this.size) size = 200;
    if (!this.email) {
      return "https://gravatar.com/avatar/?s" + size + "&d=retro";
    } else {
      var md5 = crypto.createHash("md5").update(this.email).digest("hex");
      return "https://gravatar.com/avatar/" + md5 + "?s" + size + "&d=retro";
    }
  };


  const User = mongoose.model('User', UserSchema);

  
  module.exports = User;