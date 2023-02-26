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

<ul>
  <li>Create PWA App/li>
  <li>Create Google Map Component </li>
    <ul>
      <li>Map</li>
      <li>Marker</li>
    </ul>
  <li>Move function for Marker movement</li>
  <li>Add FireStore</li>
    <ul>
      <li>function "fake drone" sending it's location to store</li>
      <li>create connection to firestore with and listen for store updates</li>
    </ul>
  <li>Add authentication</li>
</ul>


Check out more [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
