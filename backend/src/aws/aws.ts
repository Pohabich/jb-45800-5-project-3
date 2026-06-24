import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import config from 'config'


// Cloning an object deeply
const s3Config = JSON.parse(JSON.stringify(config.get('aws.connection')))
const s3Client = new S3Client(s3Config)

export async function createAppBucketsIfNotExist() {

    const buckets = config.get('aws.buckets');

    Object.values(buckets).forEach(async (bucketName: string) => {
        try {
            const response = await s3Client.send(new CreateBucketCommand({
                Bucket: bucketName //config.get('aws.bucket')
            }))
            console.log(`Created bucket ${bucketName}`, response)
        } catch (e) {
            console.log(`ERROR: bucket ${bucketName} during creation`, e)
        }
    });
}

export default s3Client