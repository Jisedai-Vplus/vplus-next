import React, { useEffect, useState } from 'react';

import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLocation } from 'react-router-dom';
import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';
import {
  GuessPostPlayerItem,
  GuessPostPlayerResultItem,
  PostItem,
  ViewGamePostsApiReturn,
} from '../utils/apiModels';
import TagInput from '../components/tagInput';
import ScrollToTop from '../components/toTop';
import { ChevronUpIcon } from '@chakra-ui/icons';

const ViewView: React.FC = () => {
  const toast = useToast();
  const { getViewGamePosts, postGuessOneGamePlayers } = useApi();
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
  const [guessAssumption, setGuessAssumption] = useState<Array<any>>();
  const [guessCheckResults, setGuessCheckResults] = useState<Array<any>>();
  const [checkCounts, setCheckCounts] = useState<number>(0);
  useEffect(() => {
    async function fetch() {
      let gameid = 0;
      if (from) {
        gameid = from.gameid;
      }
      const GamePostsResponse = await getViewGamePosts({ gameid: gameid });
      setGamePostsData(GamePostsResponse);
      setGuessAssumption(GamePostsResponse.posts.map((s) => ({ id: s.id, playernames: [] })));
      setGuessCheckResults(GamePostsResponse.posts.map((s) => ({ id: s.id, result: 'blank' })));
      setLoaded(true);
    }
    fetch();
  }, [getViewGamePosts]);
  const dividercolor = useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600');

  const handleUpCheckGame = async () => {
    let data = new FormData();
    data.append('gameid', JSON.stringify(from.gameid));
    data.append('try_results', JSON.stringify(guessAssumption));
    const GuessOneGamePlayersResponse = await postGuessOneGamePlayers(data);
    setGuessCheckResults(GuessOneGamePlayersResponse.results);
    setCheckCounts(checkCounts + 1);
    console.log(GuessOneGamePlayersResponse);
    console.log(checkCounts);
  };

  const handleCollectTagData = (e: GuessPostPlayerItem) => {
    // console.log(guessAssumption);
    let tempGuessAssumption = guessAssumption;
    tempGuessAssumption!.forEach((element, index) => {
      if (element.id === e.id) {
        tempGuessAssumption![index] = e;
      }
    });
    setGuessAssumption(tempGuessAssumption);
  };
  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />

      <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
        <Grid p={4} marginX={'3vh'} templateColumns="repeat(12, 1fr)">
          <GridItem colStart={3} colSpan={8}>
            <VStack
              divider={<StackDivider borderColor={dividercolor} />}
              spacing={4}
              align="stretch"
              ref={parent as React.RefObject<HTMLDivElement>}
            >
              {loaded ? (
                GamePostsData!.posts.map((viewItem) => {
                  let oneResult = guessCheckResults?.filter((e) => e.id == viewItem.id)[0];
                  return (
                    <ViewCard
                      item={viewItem}
                      oneResult={oneResult}
                      checkCounts={checkCounts}
                      onSet={handleCollectTagData}
                      key={JSON.stringify(viewItem.id)}
                    />
                  );
                })
              ) : (
                <div />
              )}
            </VStack>
          </GridItem>

          <GridItem colStart={11} marginLeft={3}>
            <Tooltip hasArrow label="交卷!">
              <Button rightIcon={<ChevronUpIcon />} onClick={handleUpCheckGame}>
                神奇按钮
              </Button>
            </Tooltip>
            <ScrollToTop />
          </GridItem>
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
              GamePostsData!.posts.map((viewItem) => (
                <MobileViewCard {...viewItem} key={'mobile' + JSON.stringify(viewItem.id)} />
              ))
            ) : (
              <div />
            )}
          </VStack>
        </Grid>
      </Flex>
    </Box>
  );
};

const ViewCard = (props: {
  item: PostItem;
  oneResult: GuessPostPlayerResultItem;
  checkCounts: number;
  onSet: (e: GuessPostPlayerItem) => void;
}) => {
  const handleSet = (e: Array<string>) => {
    props.onSet({
      id: props.item.id,
      playernames: e,
    });
  };
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
                {props.item.title}
              </Text>
              <Stack flex={1} display={'flex'} justify={'flex-end'} direction={'row'} spacing={6}>
                <Box justifySelf={'flex-end'} marginLeft={'5'}>
                  <TagInput
                    postId={props.item.id}
                    onSet={handleSet}
                    oneResult={props.oneResult.result}
                    checkCounts={props.checkCounts}
                  />
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
          {props.item.producer && (
            <StatLabel mt={1} mb={1}>
              P 主: {props.item.producer}
            </StatLabel>
          )}
          {props.item.diva && (
            <StatLabel mt={1} mb={1}>
              演唱: {props.item.diva}
            </StatLabel>
          )}
        </Stat>
        <Box my={2}>
          {props.item.body?.split('\n').map((item, index) => {
            return (
              <Text fontSize="lg" align={'left'} lineHeight={1.6} key={index}>
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
        {props.body?.split('\n').map((item, index) => {
          return (
            <Text fontSize="sm" align={'left'} lineHeight={1.6} key={index}>
              {item}
            </Text>
          );
        })}
      </Box>
    </Container>
  );
};

export default ViewView;
