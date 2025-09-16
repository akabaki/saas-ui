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
  Button,
  Badge,
  Divider,
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
  FiShoppingCart,
  FiGrid,
} from 'react-icons/fi'
import { Logo } from '#components/layout/logo'

interface NavItemProps {
  icon: any
  children: ReactNode
  href: string
  isActive?: boolean
  badge?: string
}

const NavItem = ({ icon, children, href, isActive, badge, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="md"
        role="group"
        cursor="pointer"
        bg={isActive ? 'orange.50' : 'transparent'}
        color={isActive ? 'orange.600' : 'gray.600'}
        borderLeft={isActive ? '3px solid' : '3px solid transparent'}
        borderLeftColor={isActive ? 'orange.500' : 'transparent'}
        _hover={{
          bg: 'orange.50',
          color: 'orange.600',
        }}
        fontSize="sm"
        fontWeight="medium"
        {...rest}
      >
        {icon && (
          <Box
            mr="3"
            fontSize="18"
            _groupHover={{
              color: 'orange.500',
            }}
          >
            {icon}
          </Box>
        )}
        <Text flex="1">{children}</Text>
        {badge && (
          <Badge colorScheme="orange" size="sm" borderRadius="full">
            {badge}
          </Badge>
        )}
      </Flex>
    </Link>
  )
}

const SidebarContent = ({ onClose, ...rest }: any) => {
  const pathname = usePathname()

  const linkItems = [
    { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
    { name: 'Data Converter', icon: FiRefreshCw, href: '/convert', badge: 'New' },
    { name: 'Organizations', icon: FiUsers, href: '/organizations' },
    { name: 'Settings', icon: FiSettings, href: '/settings' },
  ]

  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="16" alignItems="center" mx="4" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="orange.500">
          DataConvert
        </Text>
        <Box display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onClose}
            variant="ghost"
            aria-label="close menu"
            icon={<FiMenu />}
          />
        </Box>
      </Flex>
      
      <Box px="2" mt="4">
        <Text fontSize="xs" fontWeight="semibold" color="gray.400" px="3" mb="2" textTransform="uppercase">
          Main Menu
        </Text>
        {linkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={<link.icon />}
            href={link.href}
            isActive={pathname === link.href}
            badge={link.badge}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>

      <Divider my="4" />

      <Box px="2">
        <Text fontSize="xs" fontWeight="semibold" color="gray.400" px="3" mb="2" textTransform="uppercase">
          Quick Actions
        </Text>
        <NavItem icon={<FiGrid />} href="/convert">
          Convert Files
        </NavItem>
      </Box>
    </Box>
  )
}

const TopNav = ({ onOpen, ...rest }: any) => {
  return (
    <Flex
      ml={{ base: 0, md: 64 }}
      px={{ base: 4, md: 6 }}
      height="16"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="xl"
        fontWeight="bold"
        color="orange.500"
      >
        DataConvert
      </Text>

      <HStack spacing="4">
        <Button
          colorScheme="orange"
          size="sm"
          leftIcon={<FiShoppingCart />}
        >
          Upgrade
        </Button>
        
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar size="sm" name="Admin User" bg="orange.500" />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm" fontWeight="medium">Admin User</Text>
                <Text fontSize="xs" color="gray.500">
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
      </HStack>
    </Flex>
  )
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg="gray.50">
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
      <TopNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 64 }} p="6" bg="gray.50" minH="calc(100vh - 64px)">
        {children}
      </Box>
    </Box>
  )
}