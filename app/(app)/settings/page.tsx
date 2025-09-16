'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Button,
  Divider,
  useToast,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useState } from 'react'
import { PageTransition } from '#components/motion/page-transition'

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    organizationName: 'DataConvert Pro',
    adminEmail: 'admin@dataconvert.com',
    timezone: 'UTC',
    
    // Conversion Settings
    defaultOutputFormat: 'json',
    maxFileSize: 50, // MB
    enablePreview: true,
    autoDownload: false,
    
    // Notification Settings
    emailNotifications: true,
    conversionComplete: true,
    errorAlerts: true,
    
    // Security Settings
    requireAuth: true,
    sessionTimeout: 30, // minutes
    enableAuditLog: true,
  })

  const toast = useToast()

  const handleSave = () => {
    // Simulate saving settings
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleReset = () => {
    // Reset to default values
    setSettings({
      organizationName: 'DataConvert Pro',
      adminEmail: 'admin@dataconvert.com',
      timezone: 'UTC',
      defaultOutputFormat: 'json',
      maxFileSize: 50,
      enablePreview: true,
      autoDownload: false,
      emailNotifications: true,
      conversionComplete: true,
      errorAlerts: true,
      requireAuth: true,
      sessionTimeout: 30,
      enableAuditLog: true,
    })
    
    toast({
      title: 'Settings reset',
      description: 'All settings have been reset to default values.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.lg" py="8">
      <PageTransition>
        <VStack spacing="8" align="stretch">
          <Box>
            <Heading size="lg" mb="2">
              Settings
            </Heading>
            <Text color="muted">
              Configure your data conversion application preferences
            </Text>
          </Box>

          <Card>
            <CardHeader>
              <Heading size="md">General Settings</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing="6" align="stretch">
                <FormControl>
                  <FormLabel>Organization Name</FormLabel>
                  <Input
                    value={settings.organizationName}
                    onChange={(e) => setSettings(prev => ({ ...prev, organizationName: e.target.value }))}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Administrator Email</FormLabel>
                  <Input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </Select>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Conversion Settings</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing="6" align="stretch">
                <FormControl>
                  <FormLabel>Default Output Format</FormLabel>
                  <Select
                    value={settings.defaultOutputFormat}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultOutputFormat: e.target.value }))}
                  >
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Maximum File Size (MB)</FormLabel>
                  <NumberInput
                    value={settings.maxFileSize}
                    onChange={(value) => setSettings(prev => ({ ...prev, maxFileSize: parseInt(value) || 50 }))}
                    min={1}
                    max={500}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="enable-preview" mb="0">
                    Enable Data Preview
                  </FormLabel>
                  <Switch
                    id="enable-preview"
                    isChecked={settings.enablePreview}
                    onChange={(e) => setSettings(prev => ({ ...prev, enablePreview: e.target.checked }))}
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="auto-download" mb="0">
                    Auto-download Converted Files
                  </FormLabel>
                  <Switch
                    id="auto-download"
                    isChecked={settings.autoDownload}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoDownload: e.target.checked }))}
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Notification Settings</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing="6" align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-notifications" mb="0">
                    Email Notifications
                  </FormLabel>
                  <Switch
                    id="email-notifications"
                    isChecked={settings.emailNotifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="conversion-complete" mb="0">
                    Conversion Complete Notifications
                  </FormLabel>
                  <Switch
                    id="conversion-complete"
                    isChecked={settings.conversionComplete}
                    onChange={(e) => setSettings(prev => ({ ...prev, conversionComplete: e.target.checked }))}
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="error-alerts" mb="0">
                    Error Alert Notifications
                  </FormLabel>
                  <Switch
                    id="error-alerts"
                    isChecked={settings.errorAlerts}
                    onChange={(e) => setSettings(prev => ({ ...prev, errorAlerts: e.target.checked }))}
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Security Settings</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing="6" align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="require-auth" mb="0">
                    Require Authentication
                  </FormLabel>
                  <Switch
                    id="require-auth"
                    isChecked={settings.requireAuth}
                    onChange={(e) => setSettings(prev => ({ ...prev, requireAuth: e.target.checked }))}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Session Timeout (minutes)</FormLabel>
                  <NumberInput
                    value={settings.sessionTimeout}
                    onChange={(value) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(value) || 30 }))}
                    min={5}
                    max={480}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="audit-log" mb="0">
                    Enable Audit Logging
                  </FormLabel>
                  <Switch
                    id="audit-log"
                    isChecked={settings.enableAuditLog}
                    onChange={(e) => setSettings(prev => ({ ...prev, enableAuditLog: e.target.checked }))}
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <HStack spacing="4" justify="flex-end">
                <Button variant="outline" onClick={handleReset}>
                  Reset to Defaults
                </Button>
                <Button colorScheme="blue" onClick={handleSave}>
                  Save Settings
                </Button>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </PageTransition>
    </Container>
  )
}

export default Settings