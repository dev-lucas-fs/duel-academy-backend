import Dotenv from "dotenv"
import DotenvExpand from "dotenv-expand"

export function loadEnvironment() {
    const type = process.env.NODE_ENV ?? ''

    let path = ".env"
    if(!type)
        path += `.${type}`

    const env = Dotenv.config({ path })
    DotenvExpand.expand(env)
}

