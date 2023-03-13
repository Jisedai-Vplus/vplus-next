import React, { useEffect, useState } from 'react';

import { Box, Flex, Grid, GridItem, useColorModeValue, useToast } from '@chakra-ui/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import GameDescCard from '../components/GameDescCard';
import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';
import { ViewAllGamesApiReturn } from '../utils/apiModels';

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
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 350,
    easing: 'ease-in-out',
    disrespectUserMotionPreference: false,
  });
  const [parentMobile, enableAnimationsMobile] = useAutoAnimate({
    duration: 350,
    easing: 'ease-in-out',
    disrespectUserMotionPreference: false,
  });
  const { getViewAllGames } = useApi();
  const [AllGamesData, setAllGamesData] = useState<ViewAllGamesApiReturn>([]);
  const [loaded, setLoaded] = useState<boolean>();
  useEffect(() => {
    async function fetch() {
      const AllGamesResponse = await getViewAllGames({});
      setAllGamesData(AllGamesResponse);
      setLoaded(true);
    }
    toast({
      duration: 1500,
      isClosable: false,
      render: () => (
        <Box color="white" rounded="lg" p={3} bg="#09958b">
          正在建设中, 敬请期待
          <br />
          这个页面会更好看!
        </Box>
      ),
    });
    fetch();
  }, [getViewAllGames]);
  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />
      <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
        <Grid
          p={4}
          marginX={'10vh'}
          templateColumns="repeat(4, 1fr)"
          gap={6}
          ref={parent as React.RefObject<HTMLDivElement>}
        >
          {loaded ? (
            AllGamesData.map((gameitem) => (
              <GridItem>
                <GameDescCard game={gameitem} />
              </GridItem>
            ))
          ) : (
            <div />
          )}
        </Grid>
      </Flex>
      <Flex
        flex={{ base: 1, md: 'auto' }}
        ml={{ base: 0 }}
        display={{ base: 'flex', md: 'none' }}
        justify={'center'}
      >
        <Grid p={2} marginX={'3vh'} marginY={6} gap={6} ref={parentMobile as React.RefObject<HTMLDivElement>}>
          {loaded ? (
            AllGamesData.map((gameitem) => (
              <GridItem>
                <GameDescCard game={gameitem} />
              </GridItem>
            ))
          ) : (
            <div />
          )}
        </Grid>
      </Flex>
    </Box>
  );
};

export default MainView;
