import { debug } from '../../config/config.json'

export function printToConsole(s: any){
    if (debug) {
        console.log(s)
    }
}