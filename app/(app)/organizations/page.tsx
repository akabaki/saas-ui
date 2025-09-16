'use client'

'use client'

import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Avatar,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiFileText } from 'react-icons/fi'
import { PageTransition } from '#components/motion/page-transition'

interface Organization {
  id: string
  name: string
  email: string
  contactPerson: string
  phone: string
  description: string
  status: 'active' | 'inactive'
  conversionsCount: number
  lastActivity: Date
}

const Organizations = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      email: 'admin@techcorp.com',
      contactPerson: 'John Smith',
      phone: '+1 (555) 123-4567',
      description: 'Technology consulting company',
      status: 'active',
      conversionsCount: 45,
      lastActivity: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Healthcare Plus',
      email: 'it@healthcareplus.com',
      contactPerson: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      description: 'Healthcare management system',
      status: 'active',
      conversionsCount: 23,
      lastActivity: new Date('2024-01-12')
    },
    {
      id: '3',
      name: 'RetailMax Inc',
      email: 'data@retailmax.com',
      contactPerson: 'Mike Wilson',
      phone: '+1 (555) 456-7890',
      description: 'Retail chain management',
      status: 'inactive',
      conversionsCount: 12,
      lastActivity: new Date('2023-12-20')
    }
  ])
  
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactPerson: '',
    phone: '',
    description: ''
  })
  const toast = useToast()

  const handleAddOrganization = () => {
    setEditingOrg(null)
    setFormData({
      name: '',
      email: '',
      contactPerson: '',
      phone: '',
      description: ''
    })
    onOpen()
  }

  const handleEditOrganization = (org: Organization) => {
    setEditingOrg(org)
    setFormData({
      name: org.name,
      email: org.email,
      contactPerson: org.contactPerson,
      phone: org.phone,
      description: org.description
    })
    onOpen()
  }

  const handleSaveOrganization = () => {
    if (editingOrg) {
      // Update existing organization
      setOrganizations(prev => 
        prev.map(org => 
          org.id === editingOrg.id 
            ? { ...org, ...formData }
            : org
        )
      )
      toast({
        title: 'Organization updated',
        description: 'Organization details have been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      // Add new organization
      const newOrg: Organization = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'active',
        conversionsCount: 0,
        lastActivity: new Date()
      }
      setOrganizations(prev => [...prev, newOrg])
      toast({
        title: 'Organization added',
        description: 'New organization has been added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    onClose()
  }

  const handleDeleteOrganization = (id: string) => {
    setOrganizations(prev => prev.filter(org => org.id !== id))
    toast({
      title: 'Organization deleted',
      description: 'Organization has been removed successfully.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const getStatusColor = (status: Organization['status']) => {
    return status === 'active' ? 'green' : 'gray'
  }

  return (
    <Container maxW="container.xl" py="8">
      <PageTransition>
        <VStack spacing="8" align="stretch">
          <HStack justify="space-between">
            <Box>
              <Heading size="lg" mb="2">
                Organizations
              </Heading>
              <Text color="muted">
                Manage client organizations and their data conversion needs
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              leftIcon={<FiPlus />}
              onClick={handleAddOrganization}
            >
              Add Organization
            </Button>
          </HStack>

          <Card>
            <CardBody>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Organization</Th>
                      <Th>Contact Person</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Status</Th>
                      <Th>Conversions</Th>
                      <Th>Last Activity</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {organizations.map((org) => (
                      <Tr key={org.id}>
                        <Td>
                          <HStack>
                            <Avatar name={org.name} size="sm" />
                            <Box>
                              <Text fontWeight="medium">{org.name}</Text>
                              <Text fontSize="sm" color="muted">
                                {org.description}
                              </Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td>{org.contactPerson}</Td>
                        <Td>{org.email}</Td>
                        <Td>{org.phone}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(org.status)}>
                            {org.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack>
                            <FiFileText />
                            <Text>{org.conversionsCount}</Text>
                          </HStack>
                        </Td>
                        <Td>{org.lastActivity.toLocaleDateString()}</Td>
                        <Td>
                          <HStack spacing="2">
                            <Tooltip label="Edit">
                              <IconButton
                                aria-label="Edit organization"
                                icon={<FiEdit2 />}
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditOrganization(org)}
                              />
                            </Tooltip>
                            <Tooltip label="Delete">
                              <IconButton
                                aria-label="Delete organization"
                                icon={<FiTrash2 />}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleDeleteOrganization(org.id)}
                              />
                            </Tooltip>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </Card>
        </VStack>
      </PageTransition>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingOrg ? 'Edit Organization' : 'Add New Organization'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Organization Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter organization name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Contact Person</FormLabel>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="Enter contact person name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter organization description"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSaveOrganization}
              isDisabled={!formData.name || !formData.email || !formData.contactPerson}
            >
              {editingOrg ? 'Update' : 'Add'} Organization
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Organizations