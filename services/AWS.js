const AWS = require('aws-sdk');

exports.UploadToS3  =  async function (data,filename) {
    const BUCKET_NAME = "expensetracker1501";
    const IAM_USER_KEY = "AKIAW4KIXNYX3DFF64MY";
    const IAM_USER_SECRET = "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";
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