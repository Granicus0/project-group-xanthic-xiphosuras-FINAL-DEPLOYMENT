import e from "express";
import PythonProcess from "./python_runner/py_process.js"
import path from "path"

const relativePath = './../py/example_train.py';
const path_of_python = path.resolve(relativePath);



function debug_epoch(procss, key, value) {
    if (key === "epoch") {
        console.log(`[Log] The model has been trained with ${value} epoches`)
    }
}

function debug_result(process, code) {
    if (code === 0) // process complete with no error
    {
        const accuracy = process.get_value("accuracy") //get value by key
        console.log(`[Log] The model get accuracy of ${accuracy * 100}%`)
    }
}

function debug_error(process, error_text) {
    console.log(`[error Log] ${error_text}`)
}

const process = new PythonProcess(
    path_of_python, //path of python
    [10], // input args
    debug_epoch,// on get value
    debug_result,// on complete
    debug_error, // on error
    false //Whether log python print results 
)

