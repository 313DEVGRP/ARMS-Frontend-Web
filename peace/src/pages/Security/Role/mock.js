import { faker } from '@faker-js/faker';
import { makeMockData } from '@/utils/makeMockData';

export const roles = makeMockData(() => {
  const department = faker.commerce.department().toLowerCase();

  return {
    roleName: department,
    composite: faker.datatype.boolean(),
    description: `\${${department}}`,
  };
}, 246);
