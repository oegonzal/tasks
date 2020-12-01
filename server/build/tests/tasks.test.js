"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const users_model_1 = __importDefault(require("../models/users.model"));
const tasks_route_1 = __importDefault(require("../routes/tasks.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
//  Save the cookie session
// https://stackoverflow.com/questions/49308214/unable-to-send-authenticated-request-in-tests-using-jest-supertest-passport-k
let fakePerson = {
    id: 1,
    email: 'oegonbar@gmail.com',
    password: 'q1w2e3r4',
};
const authRoute = new auth_route_1.default();
const tasksRoute = new tasks_route_1.default();
const app = new app_1.default([authRoute, tasksRoute]);
let agent = supertest_1.default(app.getServer());
let session = null;
beforeEach(() => {
    const userData = {
        email: fakePerson.email,
        password: fakePerson.password,
    };
    process.env.JWT_SECRET = 'jwt_secret';
    return agent
        .post(`${authRoute}/login`)
        .send(userData)
        .then((res) => {
        session = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';');
        console.log("SESSION: ", session);
        expect(res.status).toEqual(200);
    });
});
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(null), 500));
});
describe('Testing Tasks', () => {
    describe('[GET] /user/:userId/tasks', () => {
        it('response statusCode 200 / findAll', () => {
            const findTask = users_model_1.default[0].tasks;
            return agent.get(`/user/${fakePerson.id}/tasks`)
                .set('Cookie', session)
                .expect(200, { data: findTask, message: 'findAll' });
        });
    });
    //   describe('[GET] /users/:id', () => {
    //     it('response statusCode 200 / findOne', () => {
    //       const userId = 1;
    //       const findUser: User = userModel.find(user => user.id === userId);
    //       const usersRoute = new UserRoute();
    //       const app = new App([usersRoute]);
    //       return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200, { data: findUser, message: 'findOne' });
    //     });
    //   });
    //   describe('[POST] /users', () => {
    //     it('response statusCode 201 / created', async () => {
    //       const userData: CreateUserDto = {
    //         email: 'lkm@gmail.com',
    //         password: 'q1w2e3r4',
    //       };
    //       const usersRoute = new UserRoute();
    //       const app = new App([usersRoute]);
    //       return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    //     });
    //   });
    //   describe('[PUT] /users/:id', () => {
    //     it('response statusCode 200 / updated', async () => {
    //       const userId = 1;
    //       const userData: CreateUserDto = {
    //         email: 'lim@gmail.com',
    //         password: '1q2w3e4r',
    //       };
    //       const usersRoute = new UserRoute();
    //       const app = new App([usersRoute]);
    //       return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
    //     });
    //   });
    //   describe('[DELETE] /users/:id', () => {
    //     it('response statusCode 200 / deleted', () => {
    //       const userId = 1;
    //       const deleteUser: User[] = userModel.filter(user => user.id !== userId);
    //       const usersRoute = new UserRoute();
    //       const app = new App([usersRoute]);
    //       return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200, { data: deleteUser, message: 'deleted' });
    //     });
    //   });
});
//# sourceMappingURL=tasks.test.js.map