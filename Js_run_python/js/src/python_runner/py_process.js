import { spawn } from "child_process";

const value_start = '<params_start>'
const value_end = '<params_end>'

    /**
     * Create a python child process
     */
export default class PythonProcess {
/**
 * @param {string} python_file - the path of .py file you want to execute
 * @param {any} args - the value you want to pass to python, the data is converted to json
 * @param {(process: PythonProcess, key: string, value: any)=>void} onReceiveValue The callback function when receive the parameters from python
 * @param {(process: PythonProcess, exit_code: number)=>void} onComplete The callback function when process is complete
 * @param {(process: PythonProcess, error: string)=>void} onError The callback function when an error occur
 * @param {boolean} receive_debug Whether to display the print() in the terminal
 */
    constructor(python_file, args = undefined, onReceiveValue=undefined, onComplete=undefined,onError=undefined, receive_debug=true) {
        this._params = {}
        this._is_complete = false
        const input = ['-u', python_file]
        if (args != undefined){
            input.push(JSON.stringify(args))
        }
        var process = spawn('python', input);

        process.stdout.on('data', (res) => {
            let raw_text = res.toString();
            let log_str = ""
            let json_datas = []

            // TODO: child_process.spawn cannot guarantee that the results of a single print will be returned, 
            // which means sometimes the results of multiple prints will be combined and received
            while (true) 
            {
                const start_index = raw_text.indexOf(value_start)
                if (start_index == -1) {
                    log_str += raw_text
                    break;
                }
                else 
                {
                    const end_index = raw_text.indexOf(value_end)
                    log_str += raw_text.substring(0, start_index);
                    json_datas.push(raw_text.substring(start_index + value_start.length, end_index));
                    raw_text = raw_text.substring(end_index + value_end.length)
                }
            }

            if (receive_debug)
            {
                console.log(log_str)
            }
            
            json_datas.forEach(element => {
                const new_datas = JSON.parse(element)
                for (var key in new_datas) {
                    const value = new_datas[key]
                    this._params[key] = value;
                    if (onReceiveValue != undefined) 
                    {
                        onReceiveValue(this, key, value)
                    }
                }
            });

        });

        process.stderr.on('data', (data) => { 
            const error_debug = data.toString()
            console.error("error: ", error_debug) 
            if (onError!= undefined){
                onError(process, error_debug);
            }

        });

        process.on('close', (code) => {
            this._is_complete = true;
            if (onComplete != undefined) {
                onComplete(this, code);
            }
        });
    }

/**
 *  If key is exist
 * @returns {boolean}
 */
    has_Key(key) {
        return key in this._params;
    }


/**
 *  Input key and get the 
 * @param {string} key
 * @param {any} default_value - Returns if key does not exist, then return this value
 * @returns {any}
 */
    get_value(key, default_value = undefined) {
        if (this.has_Key(key)) {
            return this._params[key]
        } else {
            return default_value
        }
    }

/**
 *  Return if this process is complete or not
 * @returns {boolean}
 */
    is_complete() {
        return this._is_complete
    }


/**
 *  Calls a defined callback function on each element of an array
 * @param {(key:string, value: any)=>void} callback - A function that accepts two arguments: key and value
 */

      forEach(callback){
        for (const key in this._params) {
            callback(key, this._params[key])
        }
      }

      

}
