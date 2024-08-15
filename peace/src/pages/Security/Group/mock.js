import { v4 as uuidv4 } from 'uuid';

import { faker } from '@faker-js/faker';
import { makeMockData } from '@/utils/makeMockData';

export const available = makeMockData(() => ({ id: uuidv4(), data: faker.commerce.department().toLowerCase() }), 10);
export const assigned = makeMockData(() => ({ id: uuidv4(), data: faker.commerce.department().toLowerCase() }), 3);
export const effective = makeMockData(() => ({ id: uuidv4(), data: faker.commerce.department().toLowerCase() }), 5);
