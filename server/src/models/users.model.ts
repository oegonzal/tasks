import { User } from '../interfaces/users.interface';
import { TaskItem } from '../interfaces/tasks.interface';

// password: q1w2e3r4
const userModel: User[] = [
  { 
    id: 1, 
    email: 'oegonbar@gmail.com', 
    password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56',
    tasks: [],
  },
  { 
    id: 2, 
    email: 'oscar@gmail.com', 
    password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56',
    tasks: [],
  },
];

const tasks: Array<TaskItem> = [];
for (let i = 0; i < 10; i++) {
  const date = new Date();
  tasks.push({
      id: i+1,
      userId: 1,
      title: 'Tite of item',
      completed: i % 2 === 0,
      due: new Date(date.setDate(date.getDate() - i)),
      description: 'Here is the description. Blah blah blah blah Blah blah blah blah Blah blah blah blah.Blah blah blah blah Blah blah blah blah Blah blah blah blah'
  });
}

userModel.find(user => user.id === 1).tasks = tasks;

export default userModel;
