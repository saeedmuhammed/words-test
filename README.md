# Word Quiz Application

This is a word quiz application developed with React.js, Express.js, and Tailwind CSS. The application presents the user with a series of words and asks them to identify the part of speech for each word. After answering all the words, the user is shown their rank based on their score.

## Features

- Presents the user with 10 random words to identify the part of speech
- Provides feedback on whether the user's answer is correct or incorrect
- Calculates the user's score and displays their rank at the end of the quiz
- Uses Toastify library for notifications

## Server Side

The server side of the application is built with Express.js. It exposes two endpoints:

1. **GET /words**: Retrieves 10 random words for the quiz.
2. **POST /ranks**: Accepts the user's score as an attribute in the request and returns their rank based on the score.

To run the server side, follow these steps:

1. Open a terminal and navigate to the server directory ***/Server Side App***.
2. Run the following command to install the dependencies:

```
npm install
```
3. Run the following command to start the server:

```
node index.js
```

## Client Side

The client side of the application is built with React.js and Tailwind CSS. It provides a user interface to interact with the quiz.

To run the client side, follow these steps:

1. Open a terminal and navigate to the client directory ***/Client Side App/client-side***.
2. Run the following command to install the dependencies:

```
npm install
```
3. Run the following command to start the client:

```
npm start
```

The application should open in your browser, and you can begin using the word quiz.

## Dependencies

The project relies on the following dependencies:

- React.js: A JavaScript library for building user interfaces.
- Express.js: A web application framework for Node.js.
- Tailwind CSS: A utility-first CSS framework.
- Toastify: A library for displaying notifications in React applications.
- axios : A library to fetch the data from the server

Make sure to install these dependencies before running the project.

