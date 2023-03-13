import React, { useEffect, useState } from 'react';

import { useColorModeValue } from '@chakra-ui/color-mode';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Textarea,
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
  ViewAllGamesApiReturn,
  ViewGamePostsApiReturn,
} from '../utils/apiModels';
import TagInput from '../components/tagInput';
import ScrollToTop from '../components/toTop';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';

const ContributeView: React.FC = () => {
  const toast = useToast();

  const { postContributeOnePost, getViewAllGames } = useApi();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [AllGamesData, setAllGamesData] = useState<ViewAllGamesApiReturn>([]);
  const [loaded, setLoaded] = useState<boolean>();

  const location = useLocation();
  const from = location.state as { gameid: number; gameItem: any };

  const [gameItem, setGameItem] = useState<any>({});
  const [postVisibility, setPostVisibility] = React.useState('private');

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
      const AllGamesResponse = await getViewAllGames({});
      setAllGamesData(AllGamesResponse);
      console.log(from);
      if (from) setGameItem(from.gameItem);
      else setGameItem(AllGamesResponse[AllGamesResponse.length - 1]);
      setLoaded(true);
    }
    fetch();
  }, [getViewAllGames]);

  const dividercolor = useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600');

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (postData: any) => {
    postData.visibility = postVisibility;
    console.log(postData);
    let data = new FormData();
    data.append('gameid', JSON.stringify(gameItem.id));
    data.append('post', JSON.stringify(postData));
    const ContributeOnePostResponse = await postContributeOnePost(data);
    if (ContributeOnePostResponse.add) {
      toast({
        duration: 1500,
        title: '投放成功',
        status: 'success',
      });
    } else {
      toast({
        duration: 1500,
        title: '投放失败',
        status: 'error',
      });
    }
  };

  /*
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
  */

  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />

      <AnimatePresence>
        <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
          <Grid p={4} marginX={'3vh'} templateColumns="repeat(12, 1fr)">
            <GridItem colStart={4} colSpan={6}>
              {loaded ? (
                <Text fontSize={'xl'} marginBottom={4} verticalAlign={'left'}>
                  {`第 ${gameItem.id + 1} 回 ： ${gameItem.title}`}
                </Text>
              ) : (
                <div />
              )}
              <Divider borderColor={dividercolor} marginBottom={4} />
              <motion.div layout>
                {loaded ? (
                  <Box>
                    <Box>
                      <VStack
                        divider={<StackDivider borderColor={dividercolor} />}
                        spacing={3}
                        align="stretch"
                        ref={parentMobile as React.RefObject<HTMLDivElement>}
                      >
                        <Stack
                          direction="row"
                          spacing={10}
                          
                        >
                          <FormControl isRequired maxWidth={'44vh'}>
                            <FormLabel>推荐人的名字</FormLabel>
                            <Input
                              placeholder="你的 ID（别人的可以吗）"
                              size={'md'}
                              {...register('player_name', { required: true })}
                            />
                          </FormControl>
                          <Box>
                            <FormLabel marginBottom={3}>推荐的方式</FormLabel>
                            <RadioGroup
                              onChange={setPostVisibility}
                              value={postVisibility}
                              defaultValue={'private'}
                            >
                              <Stack
                                direction="row"
                                spacing={5}
                                
                              >
                                <Radio value="public" size={'md'} colorScheme={'teal'}>
                                  公开作文
                                </Radio>
                                <Radio value="private" size={'md'} colorScheme={'teal'}>
                                  匿名推歌
                                </Radio>
                              </Stack>
                            </RadioGroup>
                          </Box>
                        </Stack>
                        <Box>
                          <FormControl isRequired>
                            <FormLabel>推荐的歌曲</FormLabel>
                            <Input
                              placeholder="歌曲"
                              size={'md'}
                              resize={'vertical'}
                              {...register('title', { required: true })}
                            />
                          </FormControl>
                        </Box>
                        <Stack direction="row" spacing={5}>
                          <FormControl isRequired>
                            <FormLabel>P 主</FormLabel>
                            <Input
                              placeholder="Producer"
                              size={'md'}
                              resize={'vertical'}
                              {...register('producer', { required: true })}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>歌手</FormLabel>
                            <Input
                              placeholder="Virtual Singer"
                              size={'md'}
                              resize={'vertical'}
                              {...register('diva', { required: true })}
                            />
                          </FormControl>
                        </Stack>
                        <Box>
                          <FormControl>
                            <FormLabel>链接</FormLabel>
                            <Input
                              placeholder="url"
                              size={'md'}
                              resize={'vertical'}
                              {...register('url', { required: false })}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <Stack direction="row">
                            <FormLabel marginBottom={3}>想说的话</FormLabel>
                          </Stack>
                          <Textarea
                            placeholder="小作文"
                            size={'lg'}
                            resize={'vertical'}
                            {...register('body', { required: false })}
                          />
                        </Box>
                      </VStack>
                    </Box>
                  </Box>
                ) : (
                  <div />
                )}
              </motion.div>
            </GridItem>
            <GridItem colStart={10} marginLeft={3}>
              <Tooltip hasArrow label="交卷!">
                <Button
                  rightIcon={<ChevronUpIcon />}
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  神奇按钮
                </Button>
              </Tooltip>
              <ScrollToTop />
            </GridItem>
          </Grid>
        </Flex>
      </AnimatePresence>

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
            {loaded ? <div /> : <div />}
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

export default ContributeView;
