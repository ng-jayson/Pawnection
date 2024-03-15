# Pawnection

Please read these points before getting started:

1. Please always make a separate branch if you are building or updating something
2. When updating (invoking and retrieveing) something related to the schema or database does not work with NUS Wifi (Firewall against MongoDB)
3. Please also note that if you add or change the prisma schema, always remember to do "npx prisma generate" to have it reflect on your local development, if not it will show errors
4. Before pushing it is also important for you to run "npm run format" and "npm run build"

## Getting Started

Clone the project to your designated folder with git clone

Make sure you install the dependencies when you clone the project for the first time. Use whichever command below corresponding to your favourite package manager:

```shell
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Create a `.env` file in the root directory (same location as the `package.json` file) to include the environment variables needed for the server to work properly.

```shell
# Mongo Atlas
DATABASE_URL=mongodb+srv://pawnection:jY2tnTi80cw7M0tL@cluster01.nakrytt.mongodb.net/paw

# NextAuth
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET="NEXTAUTH_SECRET"

# Github Authentication
GITHUB_ID=1da411400413bae3d5f7
GITHUB_SECRET=0d724f9306f675f451187a4a79ba78f34f497fff

# Google Authentication
GOOGLE_CLIENT_ID=573346259632-md9qdrfc8rb8u62nai5gcbai9qt2cmnf.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Cloudinary
CLOUD_NAME = duyqfuucs
CDN_API_SECRET = Ymi8GESMrZ6lLlfxNPhZqawDikU
CDN_API_KEY = 395728497944316
CLOUDINARY_POST_FOLDER = post
CLOUDINART_PROFILE_FOLDER = avatar
```

then, run the development server:

```shell
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!