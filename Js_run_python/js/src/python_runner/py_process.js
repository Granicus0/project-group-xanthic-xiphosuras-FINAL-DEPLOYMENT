import { spawn } from "child_process";
import e from "express";

const value_start = '<params_start>'
const value_end = '<params_end>'
export default class PythonProcess {
    constructor(python_file, args=[], onReceiveValue=undefined, onComplete=undefined,onError=undefined, receive_debug=true) {
        this._params = {}
        this._is_complete = false
        const input = ['-u', python_file, ...args]
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

    has_Key(key) {
        return key in this._params;
    }

    get_value(key, default_value = undefined) {
        if (this.has_Key(key)) {
            return this._params[key]
        } else {
            return default_value
        }
    }

    is_complete() {
        return this._is_complete
    }
}

