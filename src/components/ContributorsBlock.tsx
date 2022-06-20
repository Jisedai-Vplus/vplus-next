import React from 'react';

import {
  Text,
  Flex,
  Circle,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Box,
  Heading,
  Spacer,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

const ContributorsBlock = (props: { citems: Array<ContributorItem> }) => {
  interface ContributorBadgeItem {
    cname: string;
    count: number;
  }
  const { citems } = props;
  const color_palette = [
    'gray.300',
    'red.300',
    'orange.300',
    'yellow.300',
    'green.300',
    'teal.300',
    'blue.300',
    'cyan.300',
    'purple.300',
    'pink.300',
  ];
  const textColor = useColorModeValue('gray.800', 'gray.900');

  let citems_trim = Array<ContributorBadgeItem>();
  let citems_block = Array<Array<ContributorBadgeItem>>();
  for (let idx = 0; idx < citems.length; idx++) {
    const badge_item = { cname: citems[idx].cname, count: 1 };
    if (citems_trim.filter((e) => e.cname === citems[idx].cname).length > 0) {
      let exist_idx = citems_trim.findIndex((e) => e.cname === citems[idx].cname);
      citems_trim[exist_idx].count += 1;
    } else citems_trim.push(badge_item);
  }

  let temp_citems = Array<ContributorBadgeItem>();
  for (let idx = 0; idx < citems_trim.length; idx++) {
    temp_citems.push(citems_trim[idx]);
    if (idx % 3 === 2) {
      citems_block.push(temp_citems);
      temp_citems = Array<ContributorBadgeItem>();
    }
  }
  if (temp_citems.length > 0) citems_block.push(temp_citems);
  return (
    <Box>
      <Flex display={{ base: 'none', md: 'flex' }} justify={'center'}>
        <VStack spacing={10}>
          {citems_block.map((line) => (
            <HStack spacing={20}>
              {line.map((citem) => (
                <Circle
                  size={citem.count === 2 ? '180px' : '120px'}
                  bg={color_palette[Math.floor(Math.random() * color_palette.length)]}
                >
                  <Stat>
                    <StatLabel fontSize={citem.count === 2 ? 'sm' : 'sm'} color={textColor}>
                      投稿人
                    </StatLabel>
                    <StatNumber fontSize={citem.count === 2 ? '3xl' : 'lg'} color={textColor}>
                      {citem.cname}
                    </StatNumber>
                  </Stat>
                </Circle>
              ))}
            </HStack>
          ))}
        </VStack>
      </Flex>
      <Flex
        flex={{ base: 1, md: 'auto' }}
        ml={{ base: 0 }}
        display={{ base: 'flex', md: 'none' }}
        justify={'center'}
      >
        <VStack spacing={35} mx={1} mt={10}>
          {citems_block.map((line) => (
            <HStack spacing={6}>
              <Flex alignItems="center" gap={3}>
                {line.map((citem) => (
                  <Box>
                    <Circle
                      size={citem.count === 2 ? '102' : '70'}
                      bg={color_palette[Math.floor(Math.random() * color_palette.length)]}
                    >
                      <VStack spacing={0}>
                        <Text fontSize={citem.count === 2 ? 'sm' : 'sm'} color={textColor}>
                          投稿人
                        </Text>
                        <Container maxW='9ch'>
                          <Heading fontSize={citem.count === 2 ? 'xl' : 'sm'} color={textColor}>
                            {citem.cname}
                          </Heading>
                        </Container>
                      </VStack>
                    </Circle>
                    <Spacer />
                  </Box>
                ))}
              </Flex>
            </HStack>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export interface ContributorItem {
  time?: string;
  cname: string;
}

export default ContributorsBlock;
