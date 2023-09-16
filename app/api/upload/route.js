import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(request) {

  const { path } = await request.json();

  function isBase64DataURL(value) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }


  


  if (!path) {
    return NextResponse.json({ message: "Image path is required" }, { status: 400 });
  }

  try {
    const options = {
     
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, crop: "scale",quality: "auto",fetch_format: "auto" }],
    };

    const result = await cloudinary.uploader.upload(path.toString(), options );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to upload image on Cloudinary",error }, { status: 500 });
  }
}