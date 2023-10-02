import 'dotenv/config'
import env from 'env-var'

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    URI_DB: env.get('URI_DB').required().asString()
}

