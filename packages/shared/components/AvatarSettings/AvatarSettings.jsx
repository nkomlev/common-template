'use client';
import { useState } from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Button} from "../ui/button";
import {deleteImage, uploadImage} from "../../server/functions/images";
import {setProfileImage} from "../../server/functions/profileImage";

const AvatarSettings = ({ defaultImage, customerId, onChangeImage }) => {
  const [displayedImage, setDisplayedImage] = useState(defaultImage);

  const onImageUploadClick = () => {
    document.getElementById('profile-image')?.click();
  }

  const innerHandleLoadImage = async (e) => {
    try {
      const file = e.target.files[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const newImagePath = await uploadImage(buffer, file);

      if (newImagePath) {
        setDisplayedImage(newImagePath);
        setProfileImage({ customerId: customerId, profileImage: newImagePath});
        if (typeof onChangeImage === 'function') {
          onChangeImage();
        }
      }
    } catch (e) {
      console.log('Upload profile image error:', e);
    }
  }

  const innerHandleDeleteImage = async () => {
    try {
      deleteImage(displayedImage);
      setProfileImage({ customerId: customerId, profileImage: null });
      setDisplayedImage(null);
      if (typeof onChangeImage === 'function') {
        onChangeImage();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <Avatar>
        <AvatarImage src={displayedImage} />
        <AvatarFallback
          className="text-2xl cursor-pointer"
          onClick={onImageUploadClick}
        >
          +
        </AvatarFallback>
      </Avatar>
      {
        displayedImage && <Button
          onClick={innerHandleDeleteImage}
        >
          Удалить изображение
        </Button>
      }
      <input id="profile-image" type="file" onChange={innerHandleLoadImage} hidden />
    </div>
  )
}

export default AvatarSettings