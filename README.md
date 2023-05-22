# Books managment - CRUD React Application

This is a simple web application for managing a list of books. The project consists of two pages:

1. Books List Page: Displays a list of books with the ability to filter by activated status. You can also edit the activated status or delete a book from DB. Clicking on the edit button will redirect you to another page with the data of the selected book for editing.

2. Add/Edit Book Page: Allows creating new books. The form contains fields for entering the title, author, category, and ISBN. Book data is stored on the server and can be obtained through a REST API.

## Steps to run the project:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the application by running `npm start`.
4. Open your web browser and navigate to http://localhost:3000/ to access the application.
5. On another terminal run data base `json-server db.json -p 4000 -w`

Technologies:
 - React
 - TypeScript
 - React Router
 - moment library
 - Context API

