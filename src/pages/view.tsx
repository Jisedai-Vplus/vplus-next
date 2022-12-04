import React, { useEffect, useState } from 'react';

import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLocation } from 'react-router-dom';
import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';
import { PostItem, ViewGamePostsApiReturn } from '../utils/apiModels';

const ViewView: React.FC = () => {
  const { getViewGamePosts } = useApi();
  const [GamePostsData, setGamePostsData] = useState<ViewGamePostsApiReturn>();
  const [loaded, setLoaded] = useState<boolean>();
  const location = useLocation();
  const from = location.state as { gameid: number };
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 200,
    easing: 'linear',
    disrespectUserMotionPreference: false,
  });
  const [parentMobile, enableAnimationsMobile] = useAutoAnimate({
    duration: 200,
    easing: 'linear',
    disrespectUserMotionPreference: false,
  });
  useEffect(() => {
    async function fetch() {
      let gameid = 0;
      if (from) {
        gameid = from.gameid;
      }
      const GamePostsResponse = await getViewGamePosts({ gameid: gameid });
      setGamePostsData(GamePostsResponse);
      setLoaded(true);
    }
    fetch();
  }, [getViewGamePosts]);
  const dividercolor = useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600');
  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />

      <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
        <Grid p={4} marginX={'3vh'}>
          <VStack
            divider={<StackDivider borderColor={dividercolor} />}
            spacing={4}
            align="stretch"
            ref={parent as React.RefObject<HTMLDivElement>}
          >
            {loaded ? GamePostsData!.posts.map((viewItem) => <ViewCard {...viewItem} />) : <div />}
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
            divider={<StackDivider borderColor={dividercolor} />}
            spacing={4}
            align="stretch"
            ref={parentMobile as React.RefObject<HTMLDivElement>}
          >
            {loaded ? (
              GamePostsData!.posts.map((viewItem) => <MobileViewCard {...viewItem} />)
            ) : (
              <div />
            )}
          </VStack>
        </Grid>
      </Flex>
    </Box>
  );
};

const ViewCard = ({ title, body, playername }: PostItem) => {
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
          {1 && (
            <StatLabel mt={1} mb={1}>
              投稿人: {playername}
            </StatLabel>
          )}
        </Stat>
        <Box my={2}>
          {body?.split('\n').map((item) => {
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

const MobileViewCard = ({ title, body, playername }: PostItem) => {
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
        {1 && (
          <StatLabel mt={1} mb={1}>
            投稿人: {playername}
          </StatLabel>
        )}
      </Stat>
      <Box my={2}>
        {body?.split('\n').map((item) => {
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
