# Comments

It is a full stack web application built with the technologies I am currently studying and working on.

## Project setup

<ul>
  <li>$ cd client</li>
  <li>$ yarn</li>
  <li>$ cd server</li>
  <li>$ yarn</li>
  <li>$ npx prisma migrate dev</li>
</ul>

<ul>
  <li>Create a new OAuth Github application</li>
  <li>Homepage URL should be "http://localhost:3333"</li>
  <li>Authorization callback URL should be "http://localhost:3000/"<l/i>
  <li>Generate a client secret</li>
  <li>Rename "server/.env.example" to ".env"</li>
  <li>Add the generated client secret and client id to ".env"</li>
  <li>Add a random JWT_SECRET env variable</li>
  <li>Rename "client/.env.example" to ".env.local"</li>
  <li>Add the same generated client id to ".env.local"</li>
</ul>

## Run

<ul>
  <li>$ cd server</li>
  <li>$ yarn dev</li>
</ul>

<ul>
  <li>$ cd client</li>
  <li>$ yarn dev</li>
</ul>
