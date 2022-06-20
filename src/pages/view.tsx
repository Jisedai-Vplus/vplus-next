import React from 'react';

import {
  Box,
  Container,
  Grid,
  StackDivider,
  VStack,
  useColorModeValue,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
} from '@chakra-ui/react';

import WithSubnavigation from '../components/header';
import { VIEW_ITEMS } from './viewitems';

const ViewView: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />
      <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
        <Grid p={4} marginX={'3vh'}>
          <VStack
            divider={
              <StackDivider borderColor={useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600')} />
            }
            spacing={4}
            align="stretch"
          >
            {VIEW_ITEMS.map((viewItem) => (
              <ViewCard {...viewItem} />
            ))}
          </VStack>
        </Grid>
      </Flex>
      <Flex
        flex={{ base: 1, md: 'auto' }}
        ml={{ base: 0 }}
        display={{ base: 'flex', md: 'none' }}
        justify={'center'}
      >
        <Grid p={1} marginX={'1'}>
          <VStack
            divider={
              <StackDivider borderColor={useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600')} />
            }
            spacing={4}
            align="stretch"
          >
            {VIEW_ITEMS.map((viewItem) => (
              <MobileViewCard {...viewItem} />
            ))}
          </VStack>
        </Grid>
      </Flex>
    </Box>
  );
};

export interface ViewCardItem {
  title?: string;
  desc?: string;
  from?: string;
  details?: string;
  isHidden?: boolean;
}

const ViewCard = ({ title, desc, from, details, isHidden }: ViewCardItem) => {
  return (
    <Container
      maxW="container.xxl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600')}
    >
      <Container maxW="container.lg" fontSize="">
        <Stat>
          <StatNumber>
            <Heading my={3} fontSize="xl">
              {title}
            </Heading>
          </StatNumber>
          {!isHidden && (
            <StatLabel mt={1} mb={1}>
              投稿人:
            </StatLabel>
          )}
        </Stat>
        <Box my={2}>
          {details?.split('\n').map((item) => {
            return (
              <Text fontSize="lg" align={'left'} lineHeight={1.6}>
                {item}
              </Text>
            );
          })}
        </Box>
      </Container>
    </Container>
  );
};

const MobileViewCard = ({ title, desc, from, details, isHidden }: ViewCardItem) => {
  return (
    <Container
      maxW="container.xxl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600')}
    >
      <Stat>
        <StatNumber>
          <Heading mt={3} fontSize="xl">
            {title}
          </Heading>
        </StatNumber>
        {!isHidden && (
          <StatLabel mt={1} mb={1}>
            投稿人:
          </StatLabel>
        )}
      </Stat>
      <Box my={2}>
        {details?.split('\n').map((item) => {
          return (
            <Text fontSize="sm" align={'left'} lineHeight={1.6}>
              {item}
            </Text>
          );
        })}
      </Box>
    </Container>
  );
};

export default ViewView;
