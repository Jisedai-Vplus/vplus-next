import React, { useEffect, useState } from 'react';

import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spacer,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLocation } from 'react-router-dom';
import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';
import { PostItem, ViewGamePostsApiReturn } from '../utils/apiModels';
import TagInput from '../components/tagInput';

const ViewView: React.FC = () => {
  const toast = useToast();
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

const ViewCard = (props: PostItem) => {
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
            <Flex marginY={'2'} alignItems={'center'}>
              <Box flex={1} />
              <Text
                justifySelf="center"
                align="center"
                maxWidth={'30vh'}
                overflowWrap={'break-word'}
                wordBreak={'keep-all'}
              >
                {props.title}
              </Text>
              <Stack flex={1} display={'flex'} justify={'flex-end'} direction={'row'} spacing={6}>
                <Box justifySelf={'flex-end'} marginLeft={'5'}>
                  <TagInput />
                </Box>
              </Stack>
            </Flex>
            {/*
            <Grid
              flex={{ base: 1, md: 0 }}
              templateColumns="repeat(10, 1fr)"
              gap={2}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <GridItem colStart={4} colSpan={4}>
                <Center>
                  <Heading my={3} fontSize="xl" justifySelf={'center'} alignContent={'center'}>
                    {props.title}
                  </Heading>
                </Center>
              </GridItem>
              <GridItem colSpan={3} justifySelf={'flex-end'}>
                <TagInput />
              </GridItem>
            </Grid>
            */}
          </StatNumber>
          {props.producer && (
            <StatLabel mt={1} mb={1}>
              P 主: {props.producer}
            </StatLabel>
          )}
          {props.diva && (
            <StatLabel mt={1} mb={1}>
              演唱: {props.diva}
            </StatLabel>
          )}
        </Stat>
        <Box my={2}>
          {props.body?.split('\n').map((item) => {
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

const MobileViewCard = (props: PostItem) => {
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
            {props.title}
          </Heading>
        </StatNumber>
        {props.producer && (
          <StatLabel mt={1} mb={1}>
            P 主: {props.producer}
          </StatLabel>
        )}
        {props.diva && (
          <StatLabel mt={1} mb={1}>
            演唱: {props.diva}
          </StatLabel>
        )}
      </Stat>
      <Box my={2}>
        {props.body?.split('\n').map((item) => {
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
