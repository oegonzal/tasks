## Tasks React and Node project

###### Server:
-   cd server
-   npm install
-   npm run dev
-   Should run on port 3000

###### Client:
-   cd client
-   npm install
-   npm start
-   Should run on port 3001

###### NOTE:
-   Client is configured to make queries to port 3000 for api so make sure api server is running on port 3000

###### To view API Docs:
-   http://localhost:3000/api-docs



## Backend design decisions
-   **Swagger documentation:** It is important to support a well documented and visual graphical interface that describes how to use the RESTful API. Building software is more than building robust applications, it is also about servicing the application's users.

-   **bcrypt & jwt security:** encryption libary for password hashing & secret key for cookie authentication and sessions that will be stored in server
    
-   **Middleware:** To require authenication and protect certain routes. Middleware make it very easy to "wrap" or decorate an api call without adding more logic to implementation which is considered bad practice

-   **Seperation of Concerns:** To keep logic functionality seperate and encapsulated


## Frontend design decisions

-   **React local storage:** I decided to use reacts built in state managment because this was a very simple app with only 3 pages. I didn't see any complicated state management or async flow processes. I also didn't see a need to store any information in localstorage. All operation could be stored in the API after they have been submitted.

-   **React hooks:** For colocating logic and making resuable logic and components

-   **Styled Components & global theming:** To prevent css name collision and produce reusable designs. I also used it because it provides functionaly for global theming, which is important to build from the start in case we want to produce an app that is highly customizable.

-   **Seperation of concerns:** I seperated components, services, navigation, types, and actions into their own folders for easy reference and search. Seperation of concerns helps keep code organized and development efficient.

-   **Presentation and Container components:** I identified components that are generic enough to be resuable and I wrapped them with a container to apply for certain cases like in the app the example would be the field box for logging in.

-   **Abstraction of repetivive user interface:** I abstracted the header out of both the tasks and configure page since it is a common component and I didn't want to pollute codebase with rebuilding a common feature. I also built a common layout, the PrivateRoute, for protected pages to check authentication.

## Project wide

-   **Typescript:** In order to build a central and transparent source of data representation. Typescript is a good option to prevent dataflow that loses it's identity down a logic process as is the case in typeless languages and that can lead to many bugs when a project increases in complexity.




## Improvements

-   **Data normalization:** I did not normalize the data because there is technically only one type of data which is the task. The user is only used to check if a session exists. I normalize data when multiple parts of the app share common data so that if a shared model is updated it updates all parts of the app.

-   **Session timeout:** Currently on an expired session the user interface will not redirect a user to the login page if the req gets an unauthorized return due to session expiration. An improvement could include a timer that check every set interval using a /me call OR I can check if the session is still good after an unauthorized call is made by sending a /me call.

-   **Testing:** With more time I would make more tests to test the server API with user sessions and CRUD operations. I would also add tests to make sure the UI displays the task list correctly after making operations to individual taks or adding new tasks.

