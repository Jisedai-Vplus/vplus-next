import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useApi } from '../utils/apiClient';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  const [userInfoData, setUserInfoData] = useState<any>([]);
  const [auth, setAuth] = useState<boolean>(false);
  const { getUserInfo } = useApi();

  useEffect(() => {
    async function fetch() {
      const UserInfoResponse = await getUserInfo();
      setUserInfoData(UserInfoResponse);
      setAuth(true);
    }
    fetch();
  }, [getUserInfo]);

  return (
    <Box>
      <Flex
        bg={useColorModeValue('gray.200' /*'#39c5bb'*/, 'gray.700')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1, md: 'auto' }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            V+ Next
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={NAV_ITEMS} />
          </Flex>
        </Flex>
        <Flex display={{ base: '1' }} ml={10} justify={'flex-end'}>
          <DesktopNav navItems={NAV_ITEMS_AUTH} />
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <ColorModeSwitcher justifySelf={'flex-end'} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  isImplemented?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  /*
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  */
  {
    label: '主页',
    href: '/',
    isImplemented: true,
  },
  {
    label: '投稿提交',
    href: '/contribute',
    isImplemented: true,
  },
  /*
  {
    label: '观赏小作文',
    href: '/view',
    isImplemented: true,
  },
  */
  {
    label: '其他',
    href: '/else',
    isImplemented: false,
  },
];

const NAV_ITEMS_AUTH: Array<NavItem> = [
  /*
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  */
  {
    label: '登录',
    href: '/login',
    isImplemented: true,
  },
  {
    label: '注册',
    href: '/register',
    isImplemented: true,
  },
];

const DesktopNav = (props: { navItems: Array<NavItem> }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const toast = useToast();
  return (
    <Stack direction={'row'} spacing={4}>
      {props.navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              {navItem.isImplemented ? (
                <Link
                  p={2}
                  display={'flex'}
                  alignContent={'center'}
                  justifyContent={'center'}
                  href={navItem.href ?? ''}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              ) : (
                <Link
                  p={2}
                  fontSize={'sm'}
                  display={'flex'}
                  alignContent={'center'}
                  justifyContent={'center'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                  onClick={() =>
                    toast({
                      // title: '敬请期待',
                      // description: '正在开工建设中',
                      // status: 'info',
                      duration: 3000,
                      isClosable: false,
                      render: () => (
                        <Box color="white" rounded="lg" p={3} bg="#09958b">
                          正在开工建设中, 敬请期待
                        </Box>
                      ),
                    })
                  }
                >
                  {navItem.label}
                </Link>
              )}
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = (props: { navItems: Array<NavItem> }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {props.navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, isImplemented }: NavItem) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      {isImplemented ? (
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight={600} color={linkColor}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      ) : (
        <Flex
          py={2}
          as={Link}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
          onClick={() =>
            toast({
              position: 'top',
              // title: '敬请期待',
              // description: '正在开工建设中',
              // status: 'info',
              duration: 3000,
              isClosable: false,
              render: () => (
                <Box color="white" rounded="lg" p={3} bg="#09958b">
                  正在开工建设中, 敬请期待
                </Box>
              ),
            })
          }
        >
          <Text fontWeight={600} color={linkColor}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      )}

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
