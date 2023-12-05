<?php

namespace App\Traits;
use Aws\S3\S3Client;

trait S3UploadFile {

    public function uploadFileToS3($file,$fileName,$folder){
        $client = $this->clientCredentials();
        $result = $client->putObject([
            'Bucket' =>  env('AWS_BUCKET'),
            'Key' => $folder.'/'.$fileName,
            'Body' => $file,
            'ACL' => 'public-read',
        ]);
        return $result['ObjectURL'];
    }

    public function deleteFileFromS3($fileUrl){
        $client = $this->clientCredentials();
        $pathToFile = str_replace(env('AWS_ENDPOINT').'/'.env('AWS_BUCKET').'/', "",$fileUrl);
        $client->deleteObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $pathToFile,
        ]);
    }

    private function clientCredentials (){
        $client = new S3Client([
            'version' => 'latest',
            'region' => env('AWS_DEFAULT_REGION'),
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => true,
        ]);
        return $client;
    }

}
