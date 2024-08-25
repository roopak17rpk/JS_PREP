/**
 * in REST api we simple call the server and fetch data from DB and the Data is
 * Sent to Client
 *
 * But The Data can be excessive lets say i need a todo list with title only but
 * api will return me
 *
 * {
 * 	title: "do work",
 * user: "anil",
 * userID: "234",
 * color "red",
 * ....
 * }
 *
 * now we are using lot more bandwidth for just requiring a data element
 *
 * also there may be case where we need 2 rest api and that thing can be solved in 1 graphQL request.
 * as data is not spearated on different endpoints.
 */

//server code

/**
 * title: String! , ! means that title is necessary field
 *	id: ID! , here ID! is equivalent to any
 * The type itself can be resolved. in Todo i have given user as type
 * it can be resolved in resolver
 *
 * user can self reference the object in resolver
 */

const express = requre("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typedef: `
		type User {
				id: ID!
				name: String!
				username: String!
				email: String!
				phone: String!
				website: String!
		}
			type todo {
				title: String!
				id: ID! 
				completed: Boolean
				user: User
			}

			type Query {
			getTodos: [Todo]
			getAllUsers: [Users]
			getUser(id: ID!): User
			}
		`,
    resolvers: {
      Todo: {
        user: async (todo) =>
          await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.id}`
          ).data,
      },
      Query: {
        getTodos: async () =>
          await axios.get("https://jsonplaceholder.typicode.com/").data,
        getAllUsers: async () =>
          await axios.get("https://jsonplaceholder.typicode.com/users").data,
        getUser: async (parent, { id }) =>
          await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("server started at 8000"));
}

startServer();

/**
 * on frontend query
 */

/**
 *
 * import {ApolloClient , inMemoryCache}  from "@apollo/client";
 *
 * const client = new ApolloClient({
 * 		uri: "https://localhost:8000/graphql",
 * 		cache: new InMemoryCache(),
 * })
 *
 * const query =  gql`
 * query GetAllTodos {
 * 	getTodos {
 * 		title
 * 		completed
 * 		user {
 * 			name
 * 		}
 * 	}
 * }
 * `
 *
 * inside app after wrapping with ApolloProvider and giving it client
 *
 * const {data , isLoading} = useQuery(query)
 *
 */

const response = {
  data: {
    getTodos: [
      {
        title: "lorem 30",
        completed: false,
        user: {
          name: "lehmann eros",
        },
      },
    ],
  },
};
