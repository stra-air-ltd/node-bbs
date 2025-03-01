import * as Hapi from '@hapi/hapi';
export const routes: Array<Hapi.ServerRoute> = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return {
                message: 'Hello, World! 这是首页 此页没有意义',
                code: 200,
                data: null
            };
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (request, h) => {
            const payload = request.payload as { name: string, age: number };
            return `Created user: ${payload.name}, Age: ${payload.age}`;
        }
    }
];