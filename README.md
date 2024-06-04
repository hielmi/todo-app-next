# Todo App

DEMO 👉 https://todo-app-hielmis-projects.vercel.app

## Prerequisites

You will need install Node JS.

## Setup

Get the code by clone this repo

```
git clone https://github.com/hielmi/todo-app-next.git
```

Get in into directory todo-app-next, and do:

```
npm install
```

After that you must create a file .env.local and fill with the Firebase API and GOOGLE OAUTH CLIENT.

```
NEXT_PUBLIC_FIREBASE_API_KEY={fillthis}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXTAUTH_SECRET=

GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=

```

Then to start the the project app with:

```
npm run dev
```

The app should now be up and running at http://localhost:3000 🚀
