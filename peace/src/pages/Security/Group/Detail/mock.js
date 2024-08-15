import { v4 as uuidv4 } from 'uuid';

import { faker } from '@faker-js/faker';
import { makeMockData } from '@/utils/makeMockData';

export const attributes = makeMockData(
  () => ({
    id: uuidv4(),
    key: faker.internet.domainSuffix(),
    value: faker.internet.domainSuffix(),
  }),
  10,
);
