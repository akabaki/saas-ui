'use client'

import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
  FiHome,
  FiRefreshCw,
  FiUsers,
  FiSettings,
  FiMenu,
  FiLogOut,
  FiUser,
} from 'react-icons/fi'
import { Logo } from '#components/layout/logo'
import ThemeToggle from '#components/layout/theme-toggle'

interface NavItemProps {
  icon: any
  children: ReactNode
  href: string
  isActive?: boolean
}

const NavItem = ({ icon, children, href, isActive, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'blue.400' : 'transparent'}
        color={isActive ? 'white' : 'inherit'}
        _hover={{
          bg: isActive ? 'blue.400' : 'gray.100',
          _dark: { bg: isActive ? 'blue.400' : 'gray.700' },
        }}
        {...rest}
      >
        {icon && (
          <Box
            mr="4"
            fontSize="16"
            _groupHover={{
              color: isActive ? 'white' : 'blue.400',
            }}
          >
            {icon}
          </Box>
        )}
        {children}
      </Flex>
    </Link>
  )
}

const SidebarContent = ({ onClose, ...rest }: any) => {
  const pathname = usePathname()

  const linkItems = [
    { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
    { name: 'Convert Data', icon: FiRefreshCw, href: '/convert' },
    { name: 'Organizations', icon: FiUsers, href: '/organizations' },
    { name: 'Settings', icon: FiSettings, href: '/settings' },
  ]

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <Box display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onClose}
            variant="outline"
            aria-label="close menu"
            icon={<FiMenu />}
          />
        </Box>
      </Flex>
      {linkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={<link.icon />}
          href={link.href}
          isActive={pathname === link.href}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }: any) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        DataConvert
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <ThemeToggle />
        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size="sm" name="Admin User" />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Admin User</Text>
                  <Text fontSize="xs" color="gray.600">
                    Administrator
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}