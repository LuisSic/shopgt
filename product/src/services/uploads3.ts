import * as AWS from 'aws-sdk';

interface ImageFile {
  name: string;
  data: string;
}

const s3bucket = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID!,
  secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  region: 'us-east-2',
});

export const uploadToS3 = (file: ImageFile): Promise<any> => {
  const base64Data = Buffer.from(
    file.data.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const type = file.data.split(';')[0].split('/')[1];

  const params = {
    Bucket: process.env.BUCKET_NAME!,
    Key: `${file.name}.${type}`,
    ContentEncoding: 'base64',
    Body: base64Data,
    ACL: 'public-read',
    ContentType: `image/${type}`,
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function (err: any, data: any) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};
