import React from 'react';

import { Textarea } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import WithSubnavigation from '../components/header';

const ViewView: React.FC = () => {
  return (
    <div>
      <WithSubnavigation />
      <Textarea />
    </div>
  );
};

export default ViewView;
