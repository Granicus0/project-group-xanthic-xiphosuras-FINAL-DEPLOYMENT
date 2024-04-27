import PythonExecute from "./python_runner/py_execute.js";
import path from "path"

const relativePath = './../py/example_fast.py';
const path_of_python = path.resolve(relativePath);

// PythonExecute us a function to execute some python code that do not require process for a long
const result = await PythonExecute(path_of_python, [1], true)
console.log(JSON.stringify(result))
