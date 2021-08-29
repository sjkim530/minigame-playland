# Minigame Playland

Play your favorite classic 2D games

Heroku: https://minigame-playland.herokuapp.com/

## Technology Stack

- React
- Javascript
- CSS
- HTML

## TETRIS

The most iconic tile-matching game

### Controls

\*\*To Start Game, click on screen then hit your Spacebar

- Move Left - Left Arrow Key
- Move Right - Right Arrow Key
- Move Down - Down Arrow Key
- Rotate - Up Arrow Key

### ...and more games to come

# Development

After you have cloned the repo onto your local machine, run `npm install` to install the packages

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment to Heroku

In order to deploy on Heroku, you MUST have a Heroku account and Heroku's CLI installed on your machine.

\*\*Replace `$APP_NAME` with the name for your unique app.

```bash
heroku create $APP_NAME --buildpack mars/create-react-app
git push heroku master
```
