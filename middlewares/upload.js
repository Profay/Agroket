const {
  S3
} = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'eu-west-3'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'agroketbucket',
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

function uploadFile(fieldname) {
  return function(req, res, next) {
    upload.single(fieldname)(req, res, function(err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error uploading file to S3 bucket',
          error: err.message
        });
      } else {
        next();
      }
    });
  };
}


module.exports = uploadFile;
