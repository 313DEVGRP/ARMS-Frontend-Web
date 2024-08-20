import TransferList from '@/components/TransferList';
import { assigned, available } from '@/pages/Security/Group/mock.js';
import { Stack, InputGroup } from 'react-bootstrap';

import Select from 'react-select';

import { faker } from '@faker-js/faker';
import { makeMockData } from '@/utils/makeMockData';

const options = makeMockData(() => {
  const client = faker.internet.domainSuffix();

  return {
    value: client.toLowerCase(),
    label: client,
  };
}, 20);

function RoleMappingTab() {
  return (
    <Stack gap={4}>
      <TransferList available={available} assigned={assigned} />

      <InputGroup>
        <InputGroup.Text>Client Roles</InputGroup.Text>
        <Select options={options} className="form-select basic-multi-select" classNamePrefix="select" />
      </InputGroup>
    </Stack>
  );
}

export default RoleMappingTab;
