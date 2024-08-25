import boto3
from rembg import remove
import os

# Initialize boto3 to use the S3 client.
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    try:
        bucket_name = os.environ['BUCKET_NAME']

        # Get the file inside the S3 Bucket
        s3_response = s3_client.get_object(
            Bucket=bucket_name,
            Key=event['s3Key']
        )

        # Get the Body object in the S3 get_object() response
        s3_object_body = s3_response.get('Body')

        # Read the data in bytes format
        content_str = s3_object_body.read()

        # Remove background with rembg
        input = content_str
        output = remove(input)

        #put object in different directory
        response = s3_client.put_object(Body=output, Bucket=bucket_name, Key='no_bg_' + event['s3Key'])

        return 'no_bg_' + event['s3Key']

    except s3_client.exceptions.NoSuchBucket as e:
        # S3 Bucket does not exist
        print('The S3 bucket does not exist.')
        print(e)

    except s3_client.exceptions.NoSuchKey as e:
        # Object does not exist in the S3 Bucket
        print('The S3 objects does not exist in the S3 bucket.')
        print(e)