import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useLocation } from 'react-router-dom';

import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  List,
  ListIcon,
  ListItem,
  StackDivider,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import {
  MdAdd,
  MdCached,
  MdCheckCircle,
  MdEdit,
  MdFileDownload,
  MdList,
  MdSettings,
  MdVisibility,
} from 'react-icons/md';
import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';
import { useMediaQuery } from '@chakra-ui/react';

const RegisterView: React.FC = () => {
  const toast = useToast();
  const { postRegister, postSendPin } = useApi();
  const methods = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [loaded, setLoaded] = useState<boolean>();

  const location = useLocation();

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

  const onSubmit = async (postData: any) => {
    let data = new FormData();
    data.append('email', postData.email);
    data.append('password', postData.password);
    const RegisterResponse = await postRegister(data);
    if (RegisterResponse.register) {
      toast({
        duration: 1500,
        title: '注册成功',
        status: 'success',
      });
    } else {
      toast({
        duration: 1500,
        title: '注册失败',
        description: RegisterResponse.msg,
        status: 'error',
      });
    }
  };

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />
      <FormProvider {...methods}>
        <AnimatePresence>
          <Flex w="full" justify={'center'}>
            <Grid p={4} marginX={'3vh'}>
              <GridItem colStart={4} colSpan={6} minWidth={isLargerThan768 ? '50vh' : undefined}>
                <Text fontSize={'xl'} marginBottom={4} verticalAlign={'left'}>
                  注册
                </Text>
                <Divider borderColor={dividercolor} marginBottom={4} />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scaleY: 0.01,
                      opacity: 0,
                      y: "-60%"
                    },
                    visible: {
                      scaleY: 1,
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.2,
                        duration: 0.4,
                      },
                    },
                  }}
                >
                  <RegisterForm dividercolor={dividercolor} onSubmit={onSubmit} />
                </motion.div>
              </GridItem>
            </Grid>
          </Flex>
        </AnimatePresence>
      </FormProvider>
    </Box>
  );
};

const RegisterForm = (props: { dividercolor: any; onSubmit: any }) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Box display="block">
      <VStack
        divider={<StackDivider borderColor={props.dividercolor} />}
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
          <Input size={'md'} type="password" {...register('password', { required: true })} />
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
                const { password } = getValues();
                if (password !== val) {
                  toast({
                    duration: 1500,
                    title: '密码与确认密码不匹配',
                    status: 'error',
                  });
                  return 'Your passwords do no match';
                }
              },
            })}
          />
        </FormControl>
        <Button type="submit" onClick={handleSubmit(props.onSubmit)}>
          注册
        </Button>
        <Box>
          <Text fontSize="md" align={'left'}>
            不经注册你可以：
          </Text>
          <List fontSize="md" textAlign={'left'}>
            <ListItem>
              <ListIcon as={MdVisibility} />
              查看投稿
            </ListItem>
            <ListItem>
              <ListIcon as={MdEdit} />
              撰写投稿
            </ListItem>
            <ListItem>
              <ListIcon as={MdCached} />
              无痛暂存猜测结果（是的，可以）
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} />
              验证往期投稿的猜测结果
            </ListItem>
          </List>
        </Box>
        <Box>
          <Text fontSize="md" align={'left'}>
            注册后你可以：
          </Text>
          <List fontSize="md" textAlign={'left'}>
            <ListItem>
              <ListIcon as={MdAdd} />
              发起一期游戏（未实装）
            </ListItem>
            <ListItem>
              <ListIcon as={MdFileDownload} />
              下载投稿及数据（未实装）
            </ListItem>
            <ListItem>
              <ListIcon as={MdList} />
              查看其它注册用户的公开投稿（未实装）
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon as={MdSettings} />
              设置个人小传（未实装）
            </ListItem>
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default RegisterView;
