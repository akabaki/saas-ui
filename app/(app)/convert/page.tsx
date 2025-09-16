'use client'

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
  Select,
  FormControl,
  FormLabel,
  useToast,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Flex,
  IconButton,
  Tooltip,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiDownload, FiEye, FiTrash2, FiRefreshCw, FiFile, FiCheckCircle, FiClock } from 'react-icons/fi'
import { PageTransition } from '#components/motion/page-transition'

interface ConversionJob {
  id: string
  fileName: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  inputFormat: string
  outputFormat: string
  recordCount: number
  createdAt: Date
}

const Convert = () => {
  const [files, setFiles] = useState<File[]>([])
  const [outputFormat, setOutputFormat] = useState('json')
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([])
  const [previewData, setPreviewData] = useState<any[]>([])
  const toast = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
    
    // Parse CSV for preview
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const lines = text.split('\n')
        const headers = lines[0].split(',').map(h => h.trim())
        const data = lines.slice(1, 6).map(line => {
          const values = line.split(',')
          const obj: any = {}
          headers.forEach((header, index) => {
            obj[header] = values[index]?.trim() || ''
          })
          return obj
        }).filter(obj => Object.values(obj).some(val => val !== ''))
        
        setPreviewData(data)
      }
      reader.readAsText(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  })

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please upload at least one file to convert.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsProcessing(true)

    // Simulate conversion process
    for (const file of files) {
      const job: ConversionJob = {
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        status: 'processing',
        inputFormat: 'CSV',
        outputFormat: outputFormat.toUpperCase(),
        recordCount: Math.floor(Math.random() * 1000) + 100,
        createdAt: new Date()
      }

      setConversionJobs(prev => [...prev, job])

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))

      setConversionJobs(prev => 
        prev.map(j => j.id === job.id ? { ...j, status: 'completed' } : j)
      )
    }

    setIsProcessing(false)
    setFiles([])
    setPreviewData([])

    toast({
      title: 'Conversion completed',
      description: `Successfully converted ${files.length} file(s) to ${outputFormat.toUpperCase()}.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleDownload = (job: ConversionJob) => {
    // Simulate file download
    const element = document.createElement('a')
    const file = new Blob(['// Converted data would be here'], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${job.fileName.replace('.csv', '')}.${job.outputFormat.toLowerCase()}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: 'Download started',
      description: `Downloading ${job.fileName}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    if (index === 0) {
      setPreviewData([])
    }
  }

  const getStatusColor = (status: ConversionJob['status']) => {
    switch (status) {
      case 'completed': return 'green'
      case 'processing': return 'orange'
      case 'error': return 'red'
      default: return 'gray'
    }
  }

  const getStatusIcon = (status: ConversionJob['status']) => {
    switch (status) {
      case 'completed': return FiCheckCircle
      case 'processing': return FiClock
      case 'error': return FiTrash2
      default: return FiFile
    }
  }

  return (
    <Box>
      <PageTransition>
        <VStack spacing="8" align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb="2" color="gray.800">
              Data Conversion Tool
            </Heading>
            <Text color="gray.600">
              Upload your CSV files and convert them to JSON or XML format with ease
            </Text>
          </Box>

          {/* Quick Stats */}
          <SimpleGrid columns={[2, 4]} spacing="4">
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200" size="sm">
              <CardBody textAlign="center" py="4">
                <Icon as={FiFile} boxSize="6" color="orange.500" mb="2" />
                <Text fontSize="lg" fontWeight="bold" color="gray.800">{files.length}</Text>
                <Text fontSize="sm" color="gray.600">Files Ready</Text>
              </CardBody>
            </Card>
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200" size="sm">
              <CardBody textAlign="center" py="4">
                <Icon as={FiRefreshCw} boxSize="6" color="orange.500" mb="2" />
                <Text fontSize="lg" fontWeight="bold" color="gray.800">{conversionJobs.length}</Text>
                <Text fontSize="sm" color="gray.600">Total Jobs</Text>
              </CardBody>
            </Card>
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200" size="sm">
              <CardBody textAlign="center" py="4">
                <Icon as={FiCheckCircle} boxSize="6" color="green.500" mb="2" />
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  {conversionJobs.filter(j => j.status === 'completed').length}
                </Text>
                <Text fontSize="sm" color="gray.600">Completed</Text>
              </CardBody>
            </Card>
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200" size="sm">
              <CardBody textAlign="center" py="4">
                <Icon as={FiClock} boxSize="6" color="orange.500" mb="2" />
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  {conversionJobs.filter(j => j.status === 'processing').length}
                </Text>
                <Text fontSize="sm" color="gray.600">Processing</Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Upload Section */}
          <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
            <CardHeader>
              <Heading size="md" color="gray.800">Upload Files</Heading>
              <Text fontSize="sm" color="gray.600">
                Drag and drop your CSV, XLS, or XLSX files here
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing="6">
                <Box
                  {...getRootProps()}
                  border="2px dashed"
                  borderColor={isDragActive ? 'orange.300' : 'gray.300'}
                  borderRadius="lg"
                  p="12"
                  textAlign="center"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ borderColor: 'orange.400', bg: 'orange.50' }}
                  w="full"
                  bg={isDragActive ? 'orange.50' : 'gray.50'}
                >
                  <input {...getInputProps()} />
                  <VStack spacing="4">
                    <Icon as={FiUpload} boxSize="12" color="orange.500" />
                    <Box>
                      <Text fontSize="lg" fontWeight="medium" color="gray.800">
                        {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                      </Text>
                      <Text color="gray.600">
                        or click to browse (CSV, XLS, XLSX files)
                      </Text>
                    </Box>
                  </VStack>
                </Box>

                {files.length > 0 && (
                  <Box w="full">
                    <Text fontWeight="medium" mb="3" color="gray.800">
                      Selected Files ({files.length})
                    </Text>
                    <VStack spacing="2" align="stretch">
                      {files.map((file, index) => (
                        <Flex
                          key={index}
                          justify="space-between"
                          align="center"
                          p="3"
                          bg="gray.50"
                          borderRadius="md"
                          border="1px"
                          borderColor="gray.200"
                        >
                          <HStack>
                            <Icon as={FiFile} color="orange.500" />
                            <Text color="gray.800">{file.name}</Text>
                          </HStack>
                          <HStack>
                            <Text fontSize="sm" color="gray.600">
                              {(file.size / 1024).toFixed(1)} KB
                            </Text>
                            <IconButton
                              aria-label="Remove file"
                              icon={<FiTrash2 />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => removeFile(index)}
                            />
                          </HStack>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}

                <HStack spacing="4" w="full">
                  <FormControl maxW="200px">
                    <FormLabel color="gray.700">Output Format</FormLabel>
                    <Select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      bg="white"
                      borderColor="gray.300"
                    >
                      <option value="json">JSON</option>
                      <option value="xml">XML</option>
                    </Select>
                  </FormControl>

                  <Box flex="1" />

                  <Button
                    colorScheme="orange"
                    leftIcon={<FiRefreshCw />}
                    onClick={handleConvert}
                    isLoading={isProcessing}
                    loadingText="Converting..."
                    isDisabled={files.length === 0}
                    size="lg"
                  >
                    Convert Files
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Preview Section */}
          {previewData.length > 0 && (
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardHeader>
                <Heading size="md" color="gray.800">Data Preview</Heading>
                <Text color="gray.600" fontSize="sm">
                  Showing first 5 rows of {files[0]?.name}
                </Text>
              </CardHeader>
              <CardBody>
                <Box overflowX="auto">
                  <Table size="sm" variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        {Object.keys(previewData[0] || {}).map((header) => (
                          <Th key={header} color="gray.700" fontWeight="semibold">
                            {header}
                          </Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {previewData.map((row, index) => (
                        <Tr key={index}>
                          {Object.values(row).map((value: any, cellIndex) => (
                            <Td key={cellIndex} color="gray.800">
                              {value}
                            </Td>
                          ))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </CardBody>
            </Card>
          )}

          {/* Conversion History */}
          {conversionJobs.length > 0 && (
            <Card bg="white" shadow="sm" border="1px" borderColor="gray.200">
              <CardHeader>
                <Heading size="md" color="gray.800">Conversion History</Heading>
                <Text fontSize="sm" color="gray.600">
                  Track your recent conversion jobs and download results
                </Text>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table>
                    <Thead bg="gray.50">
                      <Tr>
                        <Th color="gray.700">File Name</Th>
                        <Th color="gray.700">Input Format</Th>
                        <Th color="gray.700">Output Format</Th>
                        <Th color="gray.700">Records</Th>
                        <Th color="gray.700">Status</Th>
                        <Th color="gray.700">Created</Th>
                        <Th color="gray.700">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {conversionJobs.map((job) => (
                        <Tr key={job.id}>
                          <Td color="gray.800" fontWeight="medium">{job.fileName}</Td>
                          <Td color="gray.600">{job.inputFormat}</Td>
                          <Td color="gray.600">{job.outputFormat}</Td>
                          <Td color="gray.600">{job.recordCount.toLocaleString()}</Td>
                          <Td>
                            <Badge 
                              colorScheme={getStatusColor(job.status)}
                              variant="subtle"
                              display="flex"
                              alignItems="center"
                              w="fit-content"
                            >
                              <Icon as={getStatusIcon(job.status)} mr="1" />
                              {job.status}
                            </Badge>
                          </Td>
                          <Td color="gray.600">{job.createdAt.toLocaleDateString()}</Td>
                          <Td>
                            <HStack spacing="2">
                              <Tooltip label="Preview">
                                <IconButton
                                  aria-label="Preview"
                                  icon={<FiEye />}
                                  size="sm"
                                  variant="ghost"
                                />
                              </Tooltip>
                              <Tooltip label="Download">
                                <IconButton
                                  aria-label="Download"
                                  icon={<FiDownload />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="orange"
                                  onClick={() => handleDownload(job)}
                                  isDisabled={job.status !== 'completed'}
                                />
                              </Tooltip>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          )}
        </VStack>
      </PageTransition>
    </Box>
  )
}

export default Convert