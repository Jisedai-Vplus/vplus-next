import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

import { GameItem } from '../utils/apiModels';

const GameDescCard = (props: {game: GameItem}) => {
  const gameitem = props.game;
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex flex="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="" src="" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text></Text>
            </Box>
          </Flex>
          <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {gameitem.ext}
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src=""
        alt=""
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      ></CardFooter>
    </Card>
  );
};

export default GameDescCard;