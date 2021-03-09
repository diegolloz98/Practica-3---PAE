//const { MongoClient } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

let db;
let isConnecting;

dotenv.config();
const mongoURL = process.env.MONGO_URL;


class Database{

    collectionName;
    
    constructor(){
        if(isConnecting) return;

        isConnecting = true;

        MongoClient.connect(mongoURL, {useUnifiedTopology: true}, (err, client) => {
            if(err){
                console.log("Failed to connect to MongoDB");
                return;
            }
            db = client.db();
            console.log("Succesfuly connected to MongoDB");   
        });

        setTimeout(()=>{
            //console.log("Database connection timeout", db)
            console.log("Database connection timeout");
        }, 2000)
    }

    useCollection(name){
        this.collectionName = name;
    }
    find(filters, cb){
        const collection = db.collection(this.collectionName);
        return collection.find(filters).toArray(cb);
    }
    /*
    collection.find({
        username: "diego"
    }).toArray((err, results) =>{
        if(err) {
            console.log("Failed to retrive the items from the collection", err);
                return;
        }
            console.log("Users:", results);
        })
    
        collection.insertOne({
            name: "Jhon",
            lastname: "Doe",
            email: "jhon.doe@local",
            username: "johndoe"
        }).then(result =>{
            console.log("Inseted succesfuly");
        }).catch(err =>{
           console.log("Failed to insert");
        })

    */
}

module.exports = Database;