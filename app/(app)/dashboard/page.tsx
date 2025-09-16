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
} from '@chakra-ui/react'
import { FiUpload, FiDownload, FiFileText, FiUsers } from 'react-icons/fi'
import { PageTransition } from '#components/motion/page-transition'

const Dashboard = () => {
  return (
    <Container maxW="container.xl" py="8">
      <PageTransition>
        <VStack spacing="8" align="stretch">
          <Box>
            <Heading size="lg" mb="2">
              Data Conversion Dashboard
            </Heading>
            <Text color="muted">
              Convert your legacy data from CSV to JSON or XML formats
            </Text>
          </Box>

          <SimpleGrid columns={[1, 2, 4]} spacing="6">
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiUpload} mr="2" />
                    Files Uploaded
                  </StatLabel>
                  <StatNumber>24</StatNumber>
                  <StatHelpText>This month</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiDownload} mr="2" />
                    Conversions
                  </StatLabel>
                  <StatNumber>18</StatNumber>
                  <StatHelpText>Completed</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiFileText} mr="2" />
                    Data Records
                  </StatLabel>
                  <StatNumber>12.5k</StatNumber>
                  <StatHelpText>Processed</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel display="flex" alignItems="center">
                    <Icon as={FiUsers} mr="2" />
                    Organizations
                  </StatLabel>
                  <StatNumber>5</StatNumber>
                  <StatHelpText>Active clients</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </PageTransition>
    </Container>
  )
}

export default Dashboard