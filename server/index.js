const express = require("express");
const users = require("./sample.json");//importing the dummy data we created from sample.json 
const cors = require('cors');
const fs = require('fs') //inbuild package used for automatically change the sample data file after delete operation is done

const app = express();   //creating instance in our app
app.use(express.json())  //this allows data in json format
const port = 8000;

app.use(cors());

//display all users
app.get("/users", (req, res) => {
    return res.json(users);                  //to check if the data is coming go to postman and in get paste this ....http://localhost:8000/users
})

//delete user detail
app.delete("/users/:id", (req, res) => {
    let id = Number(req.params.id); //converts the id to number
    let filteredUsers = users.filter((user) => user.id !== id); //gives all the data expect the deleted ones
    fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
        return res.json(filteredUsers); //then the filtered data is given to filteredUsers to reflect it in our frontend
    })
})

//add new user

app.post("/users",(req,res)=>{
    let{name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({message: "All fields Required"})
    }
    let id=Date.now();
    users.push({id,name,age,city});

    fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
        return res.json({ message: "User details added successfully"})});
    })


//update user

app.patch("/users/:id",(req,res)=>{
    let id=Number(req.params.id)
    let{name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({message: "All fields Required"})
    }
    
    let index=users.findIndex((user)=> user.id ==id)

    

    users.splice(index,1,{...req.body})

    fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
        return res.json({ message: "User details updated successfully"})});
    })



//to start our server
app.listen(port, (err) => {
    console.log(`app is running in ${port}`);
})

