<h1 align="center">Welcome to Clients App 👋</h1>

## Used Technologies

- Node.js
- TypeScript
- MongoDB Atlas

## How to run locally?

Clone Clients App to any IDE, such as VS Code.

> \*Note: .env file is provided by email.

### To run the application:

Install backend dependencies:

```sh
npm install
```

In the root directory you need to create a file called ".env" in which you
can save database credentials. File content could be as
the following (replace username, password, cluster-name, and database-name with your own):

```sh
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.6avck.mongodb.net/<database-name>?retryWrites=true&w=majority

PORT=3001
BASE_URI=http://localhost:3001
NODE_ENV=development

TEST_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.6avck.mongodb.net/<database-name>?retryWrites=true&w=majority
```

Then run the server using:

```sh
npm run dev
```

You can also run the integration tests using:

```sh
npm run test
```

## Author

👤 **Abdullah Hinnawi**

- [Portfolio](https://abdullahhinnawi.com/)
- [Linkedin](https://www.linkedin.com/in/abdullah-hinnawi-426465198/)
- [GitHub](https://github.com/abdullahHinnawi)
