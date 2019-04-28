const AWS = require('aws-sdk');
const fs = require('fs');
const shortid = require('shortid');

const env = process.env;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: env['AWS_IDENTITY_POOL_ID'] || '',
});
AWS.config.region = env['AWS_REGION'] || 'ap-northeast-1';

const awsConfig = {
  s3: new AWS.S3(),
  // bucket name
  bucket: env['AWS_S3_BUCKET'] || 'bucket',
  // 上傳的資料夾名稱
  keyBase: env['AWS_S3_KEY'] || '',
};

const UploadFile = filePath => {
  let file;
  try {
    file = fs.readFileSync(filePath);
  } catch (error) {
    return Promise.reject(error);
  }

  try {
    (() => {
      const key = `${awsConfig.keyBase + shortid()}.png`;
      const params = {
        Bucket: awsConfig.bucket,
        Key: key,
        Body: file,
        ACL: 'public-read',
        ContentType: 'image/png',
      };

      awsConfig.s3.upload(params, (error, data) => {
        if (error) {
          console.log('Upload Error:', error);
        }
      });
    })();
  } catch (error) {
    console.log(error);
  }
};

module.exports = UploadFile;
