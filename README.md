# COMPSCI 732 / SOFTENG 750 project - Team Xanthic Xiphosuras

## Getting up and running
This is a project that utilizes the [MERN](https://www.mongodb.com/mern-stack) stack. Follow the instructions below to get up and running:

### [Node.js](https://nodejs.org/en)
- Download the LTS version from the link above
### Install all dependencies
- A 'package.json' folder exists in both the ``server`` and ``client`` folders inside the ``mern`` directory that specifies all dependencies that the project uses. We will use the [npm](https://www.npmjs.com/) package manager that comes bundled with the [Node.js](https://nodejs.org/en) installation. Run the following command in both folders once you have [Node.js](https://nodejs.org/en) installed (this should work for all desktop platforms):

```npm install```

### install Three and gsap, socket.io in /client
```npm i three gsap```
```npm install socket.io```

### Install TailwindCSS, PostCSS and Autoprefixer
- Run the following commands inside of the ``mern`` directory:

```npm install -D tailwindcss postcss autoprefixer```
<br/>
```npx tailwindcss init -p```

###Install Tremor
- Run the following commands inside of the ``mern`` directory:
```npm install @tremor/react```

That's it! To run the client-side part of the web application, run the following command inside of the ``client`` folder under the ``mern`` directory:


```npm run dev```

Install React Spinners
```npm install react-spinners```



To run the server-side part of the web application, run the following command inside of the ``server`` folder under the ``mern`` directory:

```node --env-file=config.env server```

## API Paths

### POST Requests
#### User login:
- API Path: ``http://localhost:5050/api/user/login`` <br/>
- Request body: ``{email: "example@gmail.com", password: "examplePassword"}``

#### User signup:
- API Path: ``http://localhost:5050/api/user/signup`` <br/>
- Request body: ``{email: "example@gmail.com", password: "examplePassword"}``
