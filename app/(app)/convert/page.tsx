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
} from '@chakra-ui/react'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiDownload, FiEye, FiTrash2, FiRefreshCw } from 'react-icons/fi'
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
      case 'processing': return 'blue'
      case 'error': return 'red'
      default: return 'gray'
    }
  }

  return (
    <Container maxW="container.xl" py="8">
      <PageTransition>
        <VStack spacing="8" align="stretch">
          <Box>
            <Heading size="lg" mb="2">
              Data Conversion Tool
            </Heading>
            <Text color="muted">
              Upload your CSV files and convert them to JSON or XML format
            </Text>
          </Box>

          <Card>
            <CardHeader>
              <Heading size="md">Upload Files</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing="6">
                <Box
                  {...getRootProps()}
                  border="2px dashed"
                  borderColor={isDragActive ? 'blue.300' : 'gray.300'}
                  borderRadius="lg"
                  p="8"
                  textAlign="center"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
                  _dark={{ _hover: { bg: 'blue.900' } }}
                  w="full"
                >
                  <input {...getInputProps()} />
                  <VStack spacing="4">
                    <FiUpload size="48" />
                    <Box>
                      <Text fontSize="lg" fontWeight="medium">
                        {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                      </Text>
                      <Text color="muted">
                        or click to browse (CSV, XLS, XLSX files)
                      </Text>
                    </Box>
                  </VStack>
                </Box>

                {files.length > 0 && (
                  <Box w="full">
                    <Text fontWeight="medium" mb="3">
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
                          _dark={{ bg: 'gray.700' }}
                          borderRadius="md"
                        >
                          <Text>{file.name}</Text>
                          <HStack>
                            <Text fontSize="sm" color="muted">
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
                    <FormLabel>Output Format</FormLabel>
                    <Select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                    >
                      <option value="json">JSON</option>
                      <option value="xml">XML</option>
                    </Select>
                  </FormControl>

                  <Box flex="1" />

                  <Button
                    colorScheme="blue"
                    leftIcon={<FiRefreshCw />}
                    onClick={handleConvert}
                    isLoading={isProcessing}
                    loadingText="Converting..."
                    isDisabled={files.length === 0}
                  >
                    Convert Files
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {previewData.length > 0 && (
            <Card>
              <CardHeader>
                <Heading size="md">Data Preview</Heading>
                <Text color="muted" fontSize="sm">
                  Showing first 5 rows of {files[0]?.name}
                </Text>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        {Object.keys(previewData[0] || {}).map((header) => (
                          <Th key={header}>{header}</Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {previewData.map((row, index) => (
                        <Tr key={index}>
                          {Object.values(row).map((value: any, cellIndex) => (
                            <Td key={cellIndex}>{value}</Td>
                          ))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          )}

          {conversionJobs.length > 0 && (
            <Card>
              <CardHeader>
                <Heading size="md">Conversion History</Heading>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>File Name</Th>
                        <Th>Input Format</Th>
                        <Th>Output Format</Th>
                        <Th>Records</Th>
                        <Th>Status</Th>
                        <Th>Created</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {conversionJobs.map((job) => (
                        <Tr key={job.id}>
                          <Td>{job.fileName}</Td>
                          <Td>{job.inputFormat}</Td>
                          <Td>{job.outputFormat}</Td>
                          <Td>{job.recordCount.toLocaleString()}</Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </Td>
                          <Td>{job.createdAt.toLocaleDateString()}</Td>
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
                                  colorScheme="blue"
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
    </Container>
  )
}

export default Convert