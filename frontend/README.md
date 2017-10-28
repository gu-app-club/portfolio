# gu-port

## Before you get going
Make sure you have [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/docs/install) installed. If you've never used yarn before, it's basically a replacement/wrapper for npm that has less build problems, is faster, and overall has a nicer experience. 

## To Run

``` bash
yarn run dev
```

Then open `localhost:3000` in a browser.

## Frontend vs Backend

This is the front-end [nextjs](https://github.com/zeit/next.js) site. The backend is written in Go and [lives here](https://github.com/maxchehab/gu-port-backend). If you want to develop both, you'll need to grab the backend code and run both programs at once. 

If you want to just run using the latest production API, you can run with the production NODE_ENV environment variable set with: 

``` bash
export NODE_ENV="production" && yarn run dev
```

## React and Nextjs
This project's built with [Nextjs](https://github.com/zeit/next.js) and [React](https://reactjs.org/). React is a frontend Javascript framework that replaces tools like jQuery. It's designed to limit the amount of global scope you can use and also lets you write easy reusable web components. If you've never worked with React before, checkout [this tutorial](https://reactjs.org/docs/hello-world.html). 

Nextjs is a development environment and sever framework for React. It handles a lot of the URL routing that points things like `ourWebsite.com/foo` to a React component in the file `pages/foo.js`. The most important thing to know about Nextjs that that anything you put in the `pages` folder becomes a "route" which you can access via `<yourUrlHere>/<yourPagesFileHere>`.

So for example, right now there's a file called [`new.js`](https://github.com/Flaque/gu-port/blob/master/pages/new.js) in `pages`. If you go to `localhost:3000/new`, you'll see it's rendering the React component that's being exported from that file. 


