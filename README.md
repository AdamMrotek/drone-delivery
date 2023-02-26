This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Prerequisites 
>  - Google API key with maps api activated -> 5 min youtube video with set up [https://www.youtube.com/watch?v=9e-5QHpadi0&t=15s](here)
> After setting up your key add it to you environment variables under NEXT_PUBLIC_GOOGLE_MAPS_KEY


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Developments Epics

- Create PWA App
- Create Google Map Component 
 - Map
 - Marker
- Move function for Marker movement 
- Add FireStore
 - function "fake drone" sending it's location to store
 - create connection to firestore with and listen for store updates
- Add authentication 


Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
