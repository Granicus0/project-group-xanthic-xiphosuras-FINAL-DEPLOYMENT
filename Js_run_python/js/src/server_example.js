import express from "express"
import PythonProcess from "./python_runner/py_process.js";
import path from "path"

const relativePath = './../py/example_train.py';
const path_of_python = path.resolve(relativePath);

const app = express()
const port =process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

let py_process = undefined;

app.post("/train",(req, res)=>{
    if (py_process==undefined){
        const epoch = parseInt(req.body.epoch);
        py_process = new PythonProcess(path_of_python, [epoch], undefined, undefined, undefined, false);
        res.json(`start training the model, epoch=${epoch}`)
    }
    else
    {
        res.json("Model already exists")
    }
})

app.get("/progress",(req, res)=>{
    if(py_process == undefined){
        res.json("train not start") 
    }else
    {
        var current_epoch =  py_process.get_value("epoch", 0);
        res.json(`epoch is ${current_epoch}`)
    }
})

app.get("/result",(req, res)=>{
    if(py_process == undefined){
        res.json("train not start") 
    }else if (py_process.is_complete())
    { 
        var accuracy =  py_process.get_value("accuracy", 0);
        res.json(`model accuracy is ${accuracy*100}%`)
    }
    else
    {
        res.json(`model is still training`)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    });