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
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { GameItem } from '../utils/apiModels';

const GameDescCard = (props: { game: GameItem }) => {
  const gameItem = props.game;
  const bannerUrl = process.env.REACT_APP_API_BASE! + '/view/gamebanner?gameid=' + gameItem.id;
  return (
    <Card p="3" borderWidth="1px" maxW="md" maxH="md">
      <CardHeader>
        <Flex flex="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="md">{gameItem.title}</Heading>
              <Text></Text>
            </Box>
          </Flex>
          <Link to="/contribute" state={{ gameid: gameItem.id, gameItem: gameItem }}>
            <Tooltip hasArrow label="投稿小作文">
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="goto"
                marginLeft={2}
                icon={<MdEdit size={'22'} />}
              />
            </Tooltip>
          </Link>
          <Link to="/view" state={{ gameid: gameItem.id, gameItem: gameItem }}>
            <Tooltip hasArrow label="前往观赏">
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="goto"
                marginLeft={2}
                icon={<ArrowRightIcon />}
              />
            </Tooltip>
          </Link>
        </Flex>
      </CardHeader>
      {/*
        <CardBody>
        <Text></Text>
      </CardBody>*/}

      <Image
        objectFit="cover"
        align="50% 75%"
        overflow="hidden"
        borderRadius={4}
        marginX={0}
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
