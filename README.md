# Delivery Fee Calculator - frontend
<p align="center"><img width="900" alt="index" src="https://user-images.githubusercontent.com/104759740/214044615-da9bd859-8fb2-435b-83af-a0e9a893d423.jpg"></p>

## Setup

- Clone this repo (it's now private)
  ```
  git clone https://github.com/WHL99/delivery-fee-calculator.git
  ```
- Open the file and start:

  ```
  cd delivery-fee-calculator
  ```
- Install all npm package and run it: 
  ```
  npm install
  npm run dev
  ```


## Folder Structure

  ```
    delivery-fee-calculator
    │   README.md
    │   index.html   
    │   ...
    │   
    └───public
    │   │   calculator-icon.svg
    │   
    └───src
        │   main.tsx
        │   App.tsx
        │   App.test.tsx
        │   App.css
        │   functions.tsx
        │   package.json
        │   ...
        ...


  ```


  - ```index.html``` is the only ```.html``` file for the entire React app. React app is displayed in this HTML page, more precisely in the ```<div id="root"></div>```. The entire app content is managed dynamically and displayed on this one HTML page.
  - ```public``` folder contains a file that will be read by the browser while the app is being developing, which is ```calculator-icon.svg``` icon for head.
  - ```main.tsx``` is the one where the main render call is happening by ReactDOM.render() method. The method ReactDOM.render() injects the React application into the ```<div id="root">``` so that the app can be rendered in the browser.
  - ```App.tsx``` is a React component called “App”. This component will be the root component to all the other components. As this project is small, this is also a controlled components which control to submit a from.
  - ```App.test.tsx``` is a set of tests runs against the sample App component that I start with. In this case I use [Vitest](https://vitest.dev/) which is a simple testing library built on top of [Vite](https://vitejs.dev/) which takes everything about [Jest](https://jestjs.io/).
  - ```App.css``` stores styling targeting the App component specifically.
  - ```functions.ts``` has different functions which can be imported to ```App.tsx``` to caculate delivery fee under different conditions. 
  - ```package.json``` lists all the dependencies and scripts needed to run the React app successfully.

      

## Framework and Tool
- [Vite](https://vitejs.dev/) : This is a small project, I can just use create-react-app, but I choose Vite becasue it runs much faster than create-react-app.
- [Material UI](https://mui.com/material-ui/) : My personal preference, I like its [date and time picker](https://dev.material-ui-pickers.dev/api/DateTimePicker) UI.


## What I want to improve
- Set date and time picker to required. If the user doesn't pick a date and time, app will give a hint.
- Initial input fields are empty instead of 0.
