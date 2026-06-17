import { Upload } from "@aws-sdk/lib-storage";
import type { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import path from "path";
import config from "config";


declare global {
    namespace Express {
        interface Request {
            imageUrl: string
        }
    }
}

export default async function fileUploader(request: Request, response: Response, next: NextFunction) {
    console.log('Target bucket:', request.baseUrl)
    console.log('---------- END OF fileUploaderrequest ----------')

    if (!request.files) {
        return next()
    }

    const buckets = config.get('aws.buckets');
    const bucketKey: string = request.baseUrl.replace(new RegExp(`^/+|/+$`, 'g'), "");
    const image = request.files.image as UploadedFile

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: buckets[bucketKey], //config.get('aws.bucket'),
            Key: `${randomUUID()}${path.extname(image.name)}`,
            Body: image.data,
            ContentType: image.mimetype
        }
    })

    const awsResponse = await upload.done()
    console.log(awsResponse)

    request.imageUrl = awsResponse.Location

    next()
}