import { spawnSync } from "child_process";
const value_start = '<params_start>'
const value_end = '<params_end>'

/**
* Execute python code and return the result
* @param {string} python_file - the path of .py file you want to execute
* @param {any} args - the value you want to pass to python, the data is converted to json
* @param {boolean} receive_debug Whether to display the print() in the terminal
*/
export default async function PythonExecute(python_file, args = undefined, receive_debug = true) {
    const input = ['-u', python_file]
    if (args != undefined) {
        input.push(JSON.stringify(args))
    }
    const result = await spawnSync('python', input);

    var params = {}
    if (result.stdout != undefined) {
        let raw_text = result.stdout.toString();
        let log_str = ""
        let json_datas = []
        while (true) {
            const start_index = raw_text.indexOf(value_start)
            if (start_index == -1) {
                log_str += raw_text
                break;
            }
            else {
                const end_index = raw_text.indexOf(value_end)
                log_str += raw_text.substring(0, start_index);
                json_datas.push(raw_text.substring(start_index + value_start.length, end_index));
                raw_text = raw_text.substring(end_index + value_end.length)
            }
        }
        json_datas.forEach(element => {
            const new_datas = JSON.parse(element)
            for (var key in new_datas) {
                params[key] = new_datas[key];
            }
        });
        if (receive_debug) {
            console.log(log_str)
        }

    }
    if (result.stderr != undefined) {
        console.error(result.stderr.toString())
        return {
            params: params,
            error_log: result.stderr.toString(),
            exit_code: result.status
        }
    }
    else {
        return {
            params: params,
            exit_code: result.status
        }
    }


}