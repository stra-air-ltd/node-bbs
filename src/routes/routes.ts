import * as Hapi from '@hapi/hapi';

export const routes = (server: Hapi.Server): Array<Hapi.ServerRoute> => [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return {
                message: 'Hello, World! 这是首页 此页没有意义',
                code: 200,
                data: {
                    time: Date
                }
            };
        }
    },
    {
        method: 'GET',
        path: '/randomImage',
        handler: (request, h) => {
            return server.methods.randomImage(request.query.requestType, h);
        }
    },
    {
        method: 'POST',
        path: '/user/login',
        handler: async (request, h) => {
            
            interface LoginPayload {
                loginWay: string;
                userInput: string;
                userPassword: string;
            }
            const { loginWay, userInput, userPassword } = request.payload as LoginPayload;
            const result = await server.methods.loginResult(loginWay, userInput, userPassword);
            return h.response(result).code(result.code);
        }
    },
    {
        method: 'POST',
        path: '/user/token/verify',
        handler: async (request, h) => {
            interface LoginPayload {
                userId: string;
                userToken: string;
            }
            const { userId, userToken } = request.payload as LoginPayload;
            const result = await server.methods.verifyUserToken(userId, userToken);
            return h.response(result).code(result.code);
        }
    },
    {
        method: 'GET',
        path: '/health',
        handler: async (request, h) => {
          return h.response({ status: 'ok' }).code(200);
        },
        options: {
          description: '健康检查接口',
          tags: ['api', 'health']
        }
    },
];