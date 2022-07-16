# Guide

The following application allows to manage users


## What is NestJS?

As described in the [Nestjs](https://nestjs.com) website, Nestjs is *a progressive Node.js framework for building efficient, reliable and scalable server-side applications.* 

Nestjs combines the best programming practice and the cutting-edge techniques  from the NodeJS communities. 

* A lot of NestJS concepts are heavily inspired by the effort of the popular frameworks in the world, esp.  [Angular](https://www.angular.io) .
* Nestjs hides the complexities of web programming in NodeJS, it provides a common abstraction of the web request handling,  you are free to choose [Expressjs](https://expressjs.com/) or  [Fastify](https://www.fastify.io) as the background engine.

 ## Defining the APIs

* POST /auth/register -  Register user
* POST /auth/login - Authenticate user
* POST /auth/logout - Logout user
* GET /transaction/ - Get all transactions
