Technical assigment turned into project :)
App allows you to track drone movement on google maps

## Getting Started

## Prerequisites 
>  - Google API key with maps api activated -> 5 min youtube video with set up [https://www.youtube.com/watch?v=9e-5QHpadi0&t=15s](here)
> After setting up your key add it to you environment variables under NEXT_PUBLIC_GOOGLE_MAPS_KEY
>  - Google firebase config with activated FireStore and Authentication for Goolge and Email and Password methods


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
  <li>Create PWA App</li>
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

## Dev-log (issues)
- Next-Pwa dependencie doenst work with NextJS 13 solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1401929790
- Marker need to use ``MarkerF``components insted for React version 18
- Cant assign ref to ``MarkerF``, instead we use onLoad functinality of that component and assing it inside the function
- NextJs client side variables need ``NEXT_PUBLIC_`` prefix, required for firebase store to work
- FirebaseUi dependecies doesnt work with NextJs --> solution: https://github.com/firebase/firebaseui-web-react/pull/173#issuecomment-1215648239


Check out more [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
