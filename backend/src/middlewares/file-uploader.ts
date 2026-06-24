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

    if (!request.files) {
        return next()
    }

    const buckets = config.get('aws.buckets');
    // const bucketKey: string = request.originalUrl.replace(new RegExp(`^.*/(.*)/$`), "$1");
    // // const bucketKey: string = request.originalUrl.replace(new RegExp('^.*/([^/?]+)/?(?:\\?.*)?$'), "$1");
    const bucketKey: string = request.originalUrl.replace(new RegExp('^/[^/]+/[^/]+/([^/?]+).*$'), "$1");
    const image = request.files.imageUrl as UploadedFile

    console.log(request.originalUrl)
    console.log(bucketKey)
    console.log('---bk---')

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: buckets[bucketKey],
            Key: `${randomUUID()}${path.extname(image.name)}`,
            Body: image.data,
            ContentType: image.mimetype
        }
    })

    const awsResponse = await upload.done()

    request.imageUrl = awsResponse.Location

    next()
}