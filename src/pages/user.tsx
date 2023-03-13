import React, { useEffect, useState } from 'react';

import { Box, Button, Flex, Grid, GridItem, useColorModeValue, useToast } from '@chakra-ui/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import GameDescCard from '../components/GameDescCard';
import WithSubnavigation from '../components/header';
import { useApi } from '../utils/apiClient';
import { ViewAllGamesApiReturn } from '../utils/apiModels';

const UserView: React.FC = () => {
  const toast = useToast();
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
  const [userInfoData, setUserInfoData] = useState<any>([]);
  const [auth, setAuth] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(true);
  const { getUserInfo, postLogout } = useApi();

  useEffect(() => {
    async function fetch() {
      const UserInfoResponse = await getUserInfo();
      setUserInfoData(UserInfoResponse);
      setAuth(true);
      setLoaded(true);
    }
    fetch();
  }, [getUserInfo]);

  return (
    <Box
      bg={useColorModeValue('gray.50' /*'#39c5bb'*/, 'gray.800')}
      color={useColorModeValue('gray.800' /*'#39c5bb'*/, 'gray.100')}
    >
      <WithSubnavigation />
      <Button onClick={postLogout}>log out</Button>
    </Box>
  );
};

export default UserView;
