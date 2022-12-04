import { ArrowRightIcon, SpinnerIcon } from '@chakra-ui/icons';
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
import { Link } from 'react-router-dom';

import { GameItem } from '../utils/apiModels';

const GameDescCard = (props: { game: GameItem }) => {
  const gameItem = props.game;
  const bannerUrl = process.env.REACT_APP_API_BASE! + '/view/gamebanner?gameid=' + gameItem.id;
  return (
    <Card maxW="md" maxH="sm">
      <CardHeader>
        <Flex flex="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="md">{gameItem.title}</Heading>
              <Text></Text>
            </Box>
          </Flex>
          <Link to="/view" state={{ gameid: gameItem.id }}>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="goto"
              icon={<ArrowRightIcon />}
            />
          </Link>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text></Text>
      </CardBody>

      <Image
        objectFit="cover"
        align="50% 75%"
        overflow="hidden"
        boxSize="sm"
        src={bannerUrl}
        alt={gameItem.title}
        fallback={<SpinnerIcon />}
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '40vh',
          },
        }}
      ></CardFooter>
    </Card>
  );
};

export default GameDescCard;
