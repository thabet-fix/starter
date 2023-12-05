<?php

namespace App\Traits;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Traits\S3UploadFile;

trait base64DecodeFile {

    use S3UploadFile;
    public function base64DecodeFile($image,$type,$storage,$id=null){
        $image_64 = $image; //your base64 encoded data
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf
        $replace = substr($image_64, 0, strpos($image_64, ',')+1);
        $image = str_replace($replace, '', $image_64);
        $image = str_replace(' ', '+', $image);
        $imageName =  Str::random(10).'-'.$type.'-'.$id.'.'.$extension;
        return $this->uploadFileToS3(base64_decode($image),$imageName,$storage);
    }
}
