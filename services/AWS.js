const AWS = require('aws-sdk');
require('dotenv').config();

exports.UploadToS3  =  async function (data,filename) {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    console.log(data,filename);

    let S3bucket = new AWS.S3({
        accessKeyId : IAM_USER_KEY,
        secretAccessKey : IAM_USER_SECRET
    })

    let params = {
        Bucket : BUCKET_NAME,
        Key : filename,
        Body : data,
        ACL : "public-read"
    }

return new Promise((resolve, reject) => {
    S3bucket.upload(params , (err,S3response)=>{
        if(err){
            reject("error",err);
        }
        else{
            resolve(S3response.Location);
        }
     })
  })
}