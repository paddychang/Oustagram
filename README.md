# Oustagram v1.2

## This is the final project for GA React development online course. The project is going to clone Instergram.

## Website

> https://oustagram.web.app/

## Quick View

![Screen Shot 1](/ScreenShot-1.png?raw=true)
![Screen Shot 2](/ScreenShot-2.png?raw=true)

### Key Features

- Only use React Hook, no Class compoents.
- Authentication
- Express for creating API
- Redux for global states
- UI and Error handle
- Sing up, sing in and sign out
- Follow and unfollow users
- Create and delete posts with an image
- Comment post
- Like post
- Update user profile
- NodeJS Back-end

## Platform

- Firebase Hosting
- Firebase Database
- Firebase Functional API
- Firebase Storage

## Bugs

- When PostDialog componet opened with wrong image or the image may be changed druing opening.
- If someone deleted a post, the other user has to reload the page.
- fetch data in different page could cause inconsisteny data in Redux.
- When more and more posts have been created, open the home page and click the function button immediately cause page crashed because large images data loading have not finished.

## Dependencies

### front-end

- Material-UI
- Axios
- React-Router-Dom V6
- Redux
- Redux-Thunk

### back-end

- Express
- NodeJS
- busboy
- uuidv4
- joy

### Share experience

- Data structure and follow is very very important.
- Very very careful to pass useState from a root component to children compoents because once state has been changed, React will re-render all children components.
- Data updating setps must be planed before creating front-end, otherwise it will cause unpredictable actions when React render pages.
- UI and error control can tell React when should render next pages.
- Great user experience satisfy customers but it is a nightmare for developer.
