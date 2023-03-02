import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useLocation } from 'react-router-dom';

import { useColorModeValue } from '@chakra-ui/color-mode';
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

import WithSubnavigation from '../components/header';
import TagInput from '../components/tagInput';
import { useApi } from '../utils/apiClient';
import {
  GuessPostPlayerItem,
  GuessPostPlayerResultItem,
  PostItem,
  ViewAllGamesApiReturn,
} from '../utils/apiModels';

const RegisterView: React.FC = () => {
  const toast = useToast();

  const { postContributeOnePost, getViewAllGames } = useApi();
  const {
    handleSubmit,
    register,
    getValues,
    watch,
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
            <GridItem colStart={4} colSpan={6} minW="50vh">
              <Text fontSize={'xl'} marginBottom={4} verticalAlign={'left'}>
                注册
              </Text>
              <Divider borderColor={dividercolor} marginBottom={4} />
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                    },
                  },
                }}
              >
                <Box display="block">
                  <VStack
                    divider={<StackDivider borderColor={dividercolor} />}
                    spacing={3}
                    align="stretch"
                  >
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder="example@test.com"
                        size={'md'}
                        {...register('email', { required: true })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>密码</FormLabel>
                      <Input
                        size={'md'}
                        type="password"
                        {...register('password', { required: true })}
                      />
                      <PasswordStrengthBar password={watch('password')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>确认密码</FormLabel>
                      <Input
                        size={'md'}
                        type="password"
                        {...register('confirm_password', {
                          required: true,
                          validate: (val: string) => {
                            if (watch('password') !== val) {
                              return 'Your passwords do no match';
                            }
                          },
                        })}
                      />
                    </FormControl>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>
                      神奇按钮
                    </Button>
                  </VStack>
                </Box>
              </motion.div>
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

export default RegisterView;
