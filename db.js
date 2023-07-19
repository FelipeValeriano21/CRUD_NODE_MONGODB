require("dotenv").config();
const {MongoClient, ObjectId} = require("mongodb"); 

const monghost = 'mongodb://127.0.0.1:27017';
const mongdatabase = 'CRUD-MONGODB';

let singleton;


async function connect() {

    if(singleton) return singleton;

    const client = new MongoClient(monghost)
    await client.connect();

    singleton = client.db(mongdatabase); 
    return singleton;

}

async function insert(user){
    const db = await connect(); 
    return db.collection("user").insertOne(user);

}

async function find(){
    const db = await connect(); 
    return db.collection("user").find().toArray();

}

async function remove(id){

    const db = await connect(); 
    return db.collection("user").deleteOne({_id:new ObjectId(id) })

}

async function edit(id, name){

    const db = await connect(); 
    return db.collection("user").updateOne({_id:new ObjectId(id) }, {$set: {name}})

}




module.exports = {

    insert,
    find, 
    remove,
    edit

}