//express is a framework which is used to make servers(popular framework)
//other frameworks-hapi.js,sails.js
// const express = require('express');
import express from 'express';
import { Db, MongoClient } from 'mongodb';
import dotenv from "dotenv";
const app = express()
dotenv.config();
const PORT=process.env.PORT;
const users=[
    {
    "createdAt": "2021-10-01T00:49:47.780Z",
    "name": "Bennie Aufderhar",
    "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
    "age": 59,
    "color": "silver",
    "id": "5"
    },
    {
    "createdAt": "2021-09-30T14:22:51.638Z",
    "name": "Lana Witting",
    "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
    "age": 77,
    "color": "olive",
    "id": "6"
    },
    {
    "createdAt": "2021-09-30T18:01:06.642Z",
    "name": "Vickie Brekke",
    "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
    "age": 80,
    "color": "tan",
    "id": "7"
    },
    {
    "createdAt": "2021-09-30T09:39:22.586Z",
    "name": "Al Runolfsdottir",
    "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
    "age": 28,
    "color": "orange",
    "id": "8"
    },
    {
    "createdAt": "2021-09-30T18:22:41.955Z",
    "name": "Sam Orn",
    "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
    "age": 49,
    "color": "indigo",
    "id": "9"
    },
    {
    "createdAt": "2021-09-30T18:30:05.224Z",
    "name": "Grace Grimes",
    "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
    "age": 72,
    "color": "yellow",
    "id": "10"
    },
    {
    "createdAt": "2021-09-30T11:26:57.667Z",
    "name": "Cindy Reinger",
    "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
    "age": 30,
    "color": "yellow",
    "id": "11"
    },
    {
    "createdAt": "2021-10-01T06:26:55.203Z",
    "name": "Beth Koelpin",
    "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
    "age": 0,
    "color": "purple",
    "id": "12"
    },
    {
    "createdAt": "2021-09-30T12:28:17.426Z",
    "name": "Doug Mayer",
    "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
    "age": 25,
    "color": "cyan",
    "id": "13"
    },
    {
    "createdAt": "2021-10-01T01:09:41.654Z",
    "name": "Mrs. Garrett Becker",
    "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
    "age": 20,
    "color": "yellow",
    "id": "14"
    }
    ];

app.use(express.json());//middleware function
console.log(process.env);
 async function createConnection(){
  // const MONGO_URL = "mongodb://localhost/users";
  const MONGO_URL=process.env.MONGO_URL;
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const insetdata= await client.db("users").collection("people").insertMany(users);
  console.log("successfully Connected");
  return client;
  // const user = await client.db("users").collection("people").findOne({id :"5"});
  // console.log(user);
  // db.people.find({})
 }  
//  createConnection();

app.get('/', function (req, res) {
  res.send('Hello world :! :)')
})
app.get('/users/:id', async function (req, res) {
    console.log(req.params);
    //const id= req.params.id(normal)
    const {id}=req.params;//(destructuring)
    const client=await createConnection();
    const user = await client.db("users").collection("people").findOne({id :id});
   console.log(user);
   res.send(user);
    // res.send(users.filter(user => user.id == id));
  });
  app.get('/users/:id', async function (req, res) {
    
    const client=await createConnection();
    const user = await client.db("users").collection("people").find({}).toArray();
   console.log(user);
   res.send(user);
    // res.send(users.filter(user => user.id == id));
  });
// app.get('/users', function (req, res) {
//     const {color}=req.query;
//      console.log(req.query);
//     res.send(users.filter((user)=>user.color==color));
//   })

  //query start with question mark(?)
  //localhost:3000/users?color=yellow
  //?key=value&key1=value1&key2=value2


  //CRUD 
  // create-post,read-get,update-post/patch,delete-delete
  //  create user:
  app.get('/users/:id', async function (req, res) {
    
    const client=await createConnection();
    console.log(req.body);//have to tell express what type of data is create like json,xml,text
    //for that we can use middleware-gatekeeper (only after this func the request(post) is allowed) 
    

  //   const user = await client.db("users").collection("people");
  //  console.log(user);
  //  res.send(user);

    // res.send(users.filter(user => user.id == id));
  });
  
app.listen(PORT,()=>console.log(`Example app listening at http://localhost:${PORT}`));
// Task
  // if no query - return all users
  app.post('/users', function (req, res) {
    const {color,age}=req.query;
     console.log(req.query , color,age);
     if(!color && !age){
       res.send(users);
     }
   
  // color - only given - filter color
  else if(color && !age)
 { 
   res.send(users.filter((user)=>user.color==color));
  }

  // age - only given - filter all people more than that age
 else if(!color && age ){
   res.send(users.filter((user)=>user.age >= age));
 }else{
  res.send(users.filter((user)=>user.color==color &&user.age >=age));
 }

})
  // color & age - filter both by color & all people more than that age
  //(sending in json data)