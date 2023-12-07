/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
    serverActions: true,
    externalDir: true,
    
  },
    images: {
        domains: [
            "cdn.sanity.io"
          ,"avatars.githubusercontent.com",
          "lh3.googleusercontent.com",
          "res.cloudinary.com","utfs.io"
        ],
      },
}

module.exports = nextConfig
