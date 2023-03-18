const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config();

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "Agroket_data",
      metadata: function (req, file, cb) {
        cb(null, {
          fieldName: file.fieldname
        });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    }),
  });


  module.exports = upload;