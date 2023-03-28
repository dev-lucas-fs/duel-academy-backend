import Dotenv from "dotenv"
import DotenvExpand from "dotenv-expand"


export default class Environment {

    private type: string

    constructor() {
        this.type = process.env.NODE_ENV
        this.Load()
    }


    private Load() : void {
        let path = ".env"
        if(!this.type)
            path += `.${this.type}`

        const env = Dotenv.config({ path })
        DotenvExpand.expand(env)
    }

}

