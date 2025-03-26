'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { setProfileImage } from "@/server/actions/profileImage";
import { useStore } from "@/store/useStore";
import { deleteImage, uploadImage } from "@/server/actions/images";
const AvatarSettings = ({ defaultImage }) => {
  const [displayedImage, setDisplayedImage] = useState(defaultImage);
  const { currentCustomer } = useStore();
  const onImageUploadClick = () => {
    document.getElementById('profile-image')?.click();
  }

  const handleLoadImage = async (e) => {
    try {
      const file = e.target.files[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const newImagePath = await uploadImage(buffer, file);

      if (newImagePath) {
        setDisplayedImage(newImagePath);
        setProfileImage({ customerId: currentCustomer.id, profileImage: newImagePath })
      }
    } catch (e) {
      console.log('Upload profile image error:', e);
    }
  }

  const handleDeleteImage = async () => {
    try {
      deleteImage(displayedImage);
      setProfileImage({ customerId: currentCustomer.id, profileImage: ''})
      setDisplayedImage('');
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
          onClick={handleDeleteImage}
        >
          Удалить изображение
        </Button>
      }
      <input id="profile-image" type="file" onChange={handleLoadImage} hidden />
    </div>
  );
};

export default AvatarSettings;