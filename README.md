# Relive Spotify

Relive Spotify is a web app that lets users analyse their Spotify history. It shows the top artists and tracks of all time, the last 6 months and the last month. It also allows for a comparison of the track features from these three periods.

## Setting up the app

First clone the app and run `npm install` in the root directory of the project.

In order to run the app you need to create a Spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). 

On the application page you also need to configure the Redirect URIs under "Edit Settings". The redirect URIs will be the domain where the app is running + "/callback" at the end. For the developement environment, the default redirect URI will be `http://localhost:4200/callback`

Under the directory `src/environments` there will be two files for configuring the app, `environment.ts` for the development environment and `environment.prod.ts`. In these you will need the Client ID for the Spotify app (which you can find in the developer dashboard) and the redirect URI that you added before to the developer dashboard.

## Running the app

There are two options for running the app.

For development purposes, you can run the command `npm run start`. This will build the tailwind CSS and watch for changes, as well as serve the Angular app. This will use the `environment.ts` file.

For building the app, you can run the command `npm run build`. This will build the tailwind CSS and build the Angular app using production settings. This will use the `environment.prod.ts` file.

When running the app, ngtw will generate the file `src/generated-tailwind.css` which will contain the used Tailwind CSS classes

## What's left to do

The main thing to be worked on now will be testing.
Eventually, the design and the stats shown could be improved.