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
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';

const LoginView: React.FC = () => {
  const toast = useToast();

  const { postLogin } = useApi();
  const methods = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [loaded, setLoaded] = useState<boolean>();

  const location = useLocation();

  const dividercolor = useColorModeValue('gray.300' /*'#39c5bb'*/, 'gray.600');

  const onSubmit = async (loginData: any) => {
    let data = new FormData();
    data.append('email', loginData.email);
    data.append('password', loginData.password);
    const LoginResponse = await postLogin(data);
    if (LoginResponse.login) {
      toast({
        duration: 1500,
        title: '登录成功',
        status: 'success',
      });
    } else {
      toast({
        duration: 1500,
        title: '登录失败',
        description: LoginResponse.msg,
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
              <GridItem colStart={4} colSpan={6} minWidth={isLargerThan768 ? '50vh' : "37vh"}>
                <Text fontSize={'xl'} marginBottom={4} verticalAlign={'left'}>
                  登录
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
                  <LoginForm dividercolor={dividercolor} onSubmit={onSubmit} />
                </motion.div>
              </GridItem>
            </Grid>
          </Flex>
        </AnimatePresence>
      </FormProvider>
    </Box>
  );
};

const LoginForm = (props: { dividercolor: any; onSubmit: any }) => {
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
        </FormControl>
        <Button type="submit" onClick={handleSubmit(props.onSubmit)}>
          登录
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginView;
