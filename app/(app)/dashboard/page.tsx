'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  HStack,
  Button,
  Badge,
  Flex,
  Avatar,
  Progress,
} from '@chakra-ui/react'
import { FiUpload, FiDownload, FiFileText, FiUsers, FiTrendingUp, FiActivity, FiClock, FiCheckCircle } from 'react-icons/fi'
import { PageTransition } from '#components/motion/page-transition'

const Dashboard = () => {
  const recentConversions = [
    { id: 1, fileName: 'customer_data.csv', status: 'completed', org: 'TechCorp', time: '2 hours ago' },
    { id: 2, fileName: 'inventory.xlsx', status: 'processing', org: 'RetailMax', time: '5 minutes ago' },
    { id: 3, fileName: 'employees.csv', status: 'completed', org: 'HealthCare Plus', time: '1 day ago' },
  ]

  return (
    <Box>
      <PageTransition>
        <VStack spacing="8" align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb="2" color="gray.800">
              Dashboard Overview
            </Heading>
            <Text color="gray.600">
              Monitor your data conversion activities and organization performance
            </Text>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={[1, 2, 4]} spacing="6">
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardBody>
                <Stat>
                  <HStack justify="space-between" mb="2">
                    <StatLabel color="gray.600" fontSize="sm" fontWeight="medium">
                      Files Uploaded
                    </StatLabel>
                    <Icon as={FiUpload} color="orange.500" boxSize="5" />
                  </HStack>
                  <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                    247
                  </StatNumber>
                  <StatHelpText color="green.500" fontSize="sm">
                    <Icon as={FiTrendingUp} mr="1" />
                    +12% from last month
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardBody>
                <Stat>
                  <HStack justify="space-between" mb="2">
                    <StatLabel color="gray.600" fontSize="sm" fontWeight="medium">
                      Conversions
                    </StatLabel>
                    <Icon as={FiDownload} color="orange.500" boxSize="5" />
                  </HStack>
                  <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                    189
                  </StatNumber>
                  <StatHelpText color="green.500" fontSize="sm">
                    <Icon as={FiTrendingUp} mr="1" />
                    +8% from last month
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardBody>
                <Stat>
                  <HStack justify="space-between" mb="2">
                    <StatLabel color="gray.600" fontSize="sm" fontWeight="medium">
                      Data Records
                    </StatLabel>
                    <Icon as={FiFileText} color="orange.500" boxSize="5" />
                  </HStack>
                  <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                    1.2M
                  </StatNumber>
                  <StatHelpText color="green.500" fontSize="sm">
                    <Icon as={FiTrendingUp} mr="1" />
                    +25% from last month
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardBody>
                <Stat>
                  <HStack justify="space-between" mb="2">
                    <StatLabel color="gray.600" fontSize="sm" fontWeight="medium">
                      Organizations
                    </StatLabel>
                    <Icon as={FiUsers} color="orange.500" boxSize="5" />
                  </HStack>
                  <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                    12
                  </StatNumber>
                  <StatHelpText color="green.500" fontSize="sm">
                    <Icon as={FiTrendingUp} mr="1" />
                    +2 new this month
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Quick Actions */}
          <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Heading size="md" mb="4" color="gray.800">
                Quick Actions
              </Heading>
              <HStack spacing="4">
                <Button
                  colorScheme="orange"
                  leftIcon={<FiUpload />}
                  size="lg"
                >
                  Convert New Files
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<FiUsers />}
                  size="lg"
                >
                  Add Organization
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<FiActivity />}
                  size="lg"
                >
                  View Reports
                </Button>
              </HStack>
            </CardBody>
          </Card>

          {/* Recent Activity */}
          <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Flex justify="space-between" align="center" mb="4">
                <Heading size="md" color="gray.800">
                  Recent Conversions
                </Heading>
                <Button size="sm" variant="ghost" color="orange.500">
                  View All
                </Button>
              </Flex>
              
              <VStack spacing="4" align="stretch">
                {recentConversions.map((conversion) => (
                  <Flex
                    key={conversion.id}
                    justify="space-between"
                    align="center"
                    p="4"
                    bg="gray.50"
                    borderRadius="md"
                    border="1px"
                    borderColor="gray.200"
                  >
                    <HStack spacing="3">
                      <Avatar
                        size="sm"
                        name={conversion.org}
                        bg="orange.100"
                        color="orange.600"
                      />
                      <Box>
                        <Text fontWeight="medium" fontSize="sm" color="gray.800">
                          {conversion.fileName}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {conversion.org} • {conversion.time}
                        </Text>
                      </Box>
                    </HStack>
                    
                    <HStack spacing="3">
                      {conversion.status === 'completed' ? (
                        <Badge colorScheme="green" variant="subtle">
                          <Icon as={FiCheckCircle} mr="1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge colorScheme="orange" variant="subtle">
                          <Icon as={FiClock} mr="1" />
                          Processing
                        </Badge>
                      )}
                    </HStack>
                  </Flex>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* System Status */}
          <SimpleGrid columns={[1, 2]} spacing="6">
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardBody>
                <Heading size="md" mb="4" color="gray.800">
                  System Performance
                </Heading>
                <VStack spacing="4" align="stretch">
                  <Box>
                    <Flex justify="space-between" mb="2">
                      <Text fontSize="sm" color="gray.600">CPU Usage</Text>
                      <Text fontSize="sm" color="gray.800" fontWeight="medium">45%</Text>
                    </Flex>
                    <Progress value={45} colorScheme="orange" size="sm" />
                  </Box>
                  <Box>
                    <Flex justify="space-between" mb="2">
                      <Text fontSize="sm" color="gray.600">Memory Usage</Text>
                      <Text fontSize="sm" color="gray.800" fontWeight="medium">62%</Text>
                    </Flex>
                    <Progress value={62} colorScheme="orange" size="sm" />
                  </Box>
                  <Box>
                    <Flex justify="space-between" mb="2">
                      <Text fontSize="sm" color="gray.600">Storage Used</Text>
                      <Text fontSize="sm" color="gray.800" fontWeight="medium">78%</Text>
                    </Flex>
                    <Progress value={78} colorScheme="orange" size="sm" />
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardBody>
                <Heading size="md" mb="4" color="gray.800">
                  Conversion Stats
                </Heading>
                <VStack spacing="4" align="stretch">
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">Success Rate</Text>
                    <Text fontSize="sm" color="green.600" fontWeight="bold">98.5%</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">Avg. Processing Time</Text>
                    <Text fontSize="sm" color="gray.800" fontWeight="medium">2.3s</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">Queue Length</Text>
                    <Text fontSize="sm" color="gray.800" fontWeight="medium">3 files</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">Active Sessions</Text>
                    <Text fontSize="sm" color="gray.800" fontWeight="medium">7 users</Text>
                  </Flex>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </PageTransition>
    </Box>
  )
}

export default Dashboard