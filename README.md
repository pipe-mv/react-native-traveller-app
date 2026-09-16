# Traveller App

## What is this?

This is a repository that houses the base code for a React Native application. The Traveller app will allow the travellers to search for information about any city and place in the world wehere they're heading to, so they can find inforation abour most iconic places, popular hotels, attractions and restaurants to explore the best of the city and town!

## Home Page

<p align="center"><img src='./assets/MarkDown/HomePage.png' width=300 ></p>

## Explore Page

Once you click on the go button this will take you to the Explore site, in this page of the application you can interact with the different features such as: find the places or location where you want to go and its different offerings this place have to explore.

<p align="center" gap='20px'>
<img src='./assets/MarkDown/MD-Hotels.png' width=200 >
&nbsp;
<img src='./assets/MarkDown/MD-Attractions.png' width=200 > 
&nbsp;
<img src='./assets/MarkDown/MD-Restaurants.png' width=200 >
</p>

## Explore Page

Once you click any of the listing places that are loaded in the screen you can find this site with all the information that could interest you such as: name of the venue, food, prices, location and bookings if required.

<p align="center" gap='20px'>
<img src='./assets/MarkDown/ItemScreen1.png' width=200 >
&nbsp;
<img src='./assets/MarkDown/ItemScreen-2.png' width=200 > 
</p>

## Run the application on your phone

Scan this QR code to open the App Store and install Expo Go. The installed Expo client must support
the SDK version used by this project.

<p align="center" gap='20px'>
<img src='./assets/MarkDown/ExpoGoApplication-QR-Code.png' width=200 >
</p>

Install the project dependencies and start the local Expo development server:

```bash
npm ci
npx expo start
```

Scan the fresh QR code displayed by Expo. This QR code points to the current local development
server and stops working when that server is no longer available, so it should not be saved in the
repository.

To open a published version, sign in to the appropriate Expo account and select the latest
compatible Traveller update. A specific EAS Update can also be opened with **Preview** from its
update page on expo.dev. EAS preview QR codes are tied to a particular update and runtime, so they
are not permanent application links and should not be placed in this README.

### "Notes"

The application could not run very smooth due to the features of the API used for this development.

The Api is a free API that might have some delay on loading, loading only one of the three areas to explore such as: Hotels, Attraction, and restaurans or it might not even load any of this data due to the 500 limit request per month.

Also, s first version of the application it is not fully responsive to the different devices in the market.
