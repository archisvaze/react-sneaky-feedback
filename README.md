# Anonymous feedback website

Link: https://bejewelled-malasada-a4a4bc.netlify.app/

You have been asked to create an anonymous feedback website. In this website users can signup and register for their custom feedback page.
Other users can visit this page and provide constructive anonymous feedback to the user.

### NOTE: Focus on getting the functionality right and then work on the UI if you have time left.

## User Story
Sanjay signed up on this website to see what his friends think of him behind his back. He choose the username `SanjayKp` and signed up by providing his email and selecting a password as well. Now he can share his username with others to visit his profile page to post anonymous feedback, so he gave the link to another user `Danny22`. 

Danny visits the page `/SanjayKp` and sees a form where he posts what he thinks of `SanjayKp`. 
Now when `SanjayKp` logs in again he is able to see a new feedback but he can't see who posted it. If he wants he can delete any feedback.

## Deliverable Screens
- SignUp (will need username, email and password)
- Login (If you want to combine them in single page, you can do so, be creative about it)
- Profile page (with list of feedbacks loggedin user has received)
- Feedback form page (to provide feedback to another user)

# Part 1
## Signup page design
- You will need a username field too so that each user can be assigned with a unique feedback page from where they can collect feedbacks.
You need to ensure that username is unique. Two users can't have the same username.

![Screenshot 2022-08-14 071904](https://user-images.githubusercontent.com/92965519/184519289-fafd9f1f-61a4-43b4-9c29-69e29633ef6e.png)

##  Login page design
- Login through email and password.

# Part 2
## Profile page design

![Screenshot 2022-08-14 072231](https://user-images.githubusercontent.com/92965519/184519292-7c11a666-dc31-4526-8f96-ce1160741e02.png)

## Feedback page design
Anyone can give the feedback if they have the link

![Screenshot 2022-08-14 072532](https://user-images.githubusercontent.com/92965519/184519329-277d5f46-a132-4f97-b60a-22fab4b2baa6.png)

## Tech stack
- React (frontend)
- Firebase (backend)
- Redux or Context API (optional)

You can use any third party UI Library if you want to.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
