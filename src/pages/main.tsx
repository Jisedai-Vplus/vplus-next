import React, { useEffect } from 'react';

import { Box, Grid, useColorModeValue, Flex, useToast } from '@chakra-ui/react';

import WithSubnavigation from '../components/header';
import ContributorsBlock from '../components/ContributorsBlock';
import { CONTRIBUTOR_ITEMS } from './viewitems';

const MainView: React.FC = () => {
  const toast = useToast();
  function shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  useEffect(() => {
    toast({
      // title: '敬请期待',
      // description: '正在开工建设中',
      // status: 'info',
      duration: 3000,
      isClosable: false,
      render: () => (
        <Box color="white" rounded="lg" p={3} bg="#09958b">
          正在建设中, 敬请期待
          <br />
          这个页面会更好看!
        </Box>
      ),
    });
  });
  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />
      <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
        <Grid p={4} marginX={'3vh'}>
          <ContributorsBlock citems={shuffle(CONTRIBUTOR_ITEMS)} />
        </Grid>
      </Flex>
      <Flex
        flex={{ base: 1, md: 'auto' }}
        ml={{ base: 0 }}
        display={{ base: 'flex', md: 'none' }}
        justify={'center'}
      >
        <Grid p={1} marginX={'1'}>
          <ContributorsBlock citems={shuffle(CONTRIBUTOR_ITEMS)} />
        </Grid>
      </Flex>
    </Box>
  );
};

export default MainView;
