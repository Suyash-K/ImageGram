import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ImageGram API',
            version: '1.0.0',
            description: 'A platform for sharing images'
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'API Server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-auth-token',
                    description: 'Enter your bearer token'
                }
            }
        }
    },
    apis: [join(__dirname, '../routers/v1/*.js')]
};