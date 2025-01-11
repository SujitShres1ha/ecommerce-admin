import multiparty from 'multiparty'
import fs from 'fs';
import mime from 'mime-types'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { isAdmin } from './auth/[...nextauth]';
export default async function handle(req,res){
  await isAdmin(req,res);
  const form = new multiparty.Form()
  const bucketName = 'bucket-next-ecommerce'
  const {fields, files} = await new Promise((resolve, reject) => {
    form.parse(req, function(err,fields,files){
      if (err) throw err
      resolve({fields, files})
    })
  })

  const client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  })

  const links = [];

  for (const file of files.file){
    const newFileName = file.path.split('/').pop()
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
      ContentType: mime.lookup(file.path)
    }))
    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
    links.push(link)
  } 
  return res.json({links})
    
}
export const config = {
  api: {
    bodyParser: false
  }
}

