import { faker } from '@faker-js/faker';
import { makeMockData } from '@/utils/makeMockData';

import { v4 as uuidv4 } from 'uuid';

export const users = makeMockData(() => {
  return {
    id: uuidv4(),
    username: faker.internet.userName().toLocaleLowerCase(),
    name: faker.person.fullName(),
    department: faker.commerce.department(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    role: faker.commerce.department().toLowerCase(),
  };
}, 365);
