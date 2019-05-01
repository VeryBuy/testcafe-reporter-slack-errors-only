const AWS = require('aws-sdk');
const fs = require('fs');

const env = process.env;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: env['AWS_IDENTITY_POOL_ID'] || '',
});
AWS.config.region = env['AWS_REGION'] || 'ap-northeast-1';

const folderName = env['FOLDER_NAME'] || '';
const awsConfig = {
  s3: new AWS.S3(),
  // bucket name
  bucket: env['AWS_S3_BUCKET'] || 'bucket',
  // 上傳的資料夾名稱
  keyBase: env['AWS_S3_KEY'] || '',
};

const getTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}-${minutes}-${seconds}`;
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
      const key = `${awsConfig.keyBase + folderName + getTime()}.png`;
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
