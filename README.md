# gu-port

## Before you get going
Make sure you have installed [Vagrant](https://www.vagrantup.com/docs/installation/) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads)

If you have the dependencies for this project, pop open a terminal (`ctrl-alt-t` for all you nasty neck-beards) and get ready to copy-pasta some commands.

Download the project:
```bash
git clone https://github.com/maxchehab/gu-port.git
cd gu-port
```
Using Vagrant, build the development environment (this will not work if you dont have [Vagrant](https://www.vagrantup.com/docs/installation/) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads) installed).
```bash
vagrant up
```
Some fancy text will start scrolling down matrix style. If you are in a public area with an audience, this is a great opportunity to full-screen your terminal and rollplay as 4chan, the internet's greatest hacker.

Awesome? No errors? Perfect! Just...
```bash
vagrant ssh
```
Vagrant gives you access to a virtual machine. The last command just let you ssh into it.

In the Vagrant environment move into the project folder. This is a shared directory with the GitHub repository.
```bash
cd gu-port
```
## Running the Backend and Frontend

To run both at once, you can use the start script. In your vagrant environment, run:
``` bash
sudo sh ./start.sh
```

### Backend
Once in a Vagrant environment move into the backend directory.
```bash
cd gu-port/backend/
```
Now start the REST API service.
```bash
./build.sh
```
If the project passes the unit tests the REST API service will start.

To access the API go to `localhost:8080`.

### Frontend
Once in a Vagrant environment move into the frontend directory.
```bash
cd gu-port/frontend/
```
Now start the webservice.
```bash
yarn run dev
```
To access the frontend go to `localhost:3000`.

If you want to just run using the latest production API, you can run with the production NODE_ENV environment variable set with: 

``` bash
export NODE_ENV="production" && yarn run dev
```

## React and Nextjs
This project's built with [Nextjs](https://github.com/zeit/next.js) and [React](https://reactjs.org/). React is a frontend Javascript framework that replaces tools like jQuery. It's designed to limit the amount of global scope you can use and also lets you write easy reusable web components. If you've never worked with React before, checkout [this tutorial](https://reactjs.org/docs/hello-world.html). 

Nextjs is a development environment and sever framework for React. It handles a lot of the URL routing that points things like `ourWebsite.com/foo` to a React component in the file `pages/foo.js`. The most important thing to know about Nextjs that that anything you put in the `pages` folder becomes a "route" which you can access via `<yourUrlHere>/<yourPagesFileHere>`.

So for example, right now there's a file called [`new.js`](https://github.com/Flaque/gu-port/blob/master/pages/new.js) in `pages`. If you go to `localhost:3000/new`, you'll see it's rendering the React component that's being exported from that file. 

