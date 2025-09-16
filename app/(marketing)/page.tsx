'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { Features } from '#components/features'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Hero } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import { ChakraLogo, NextjsLogo } from '#components/logos'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Pricing } from '#components/pricing/pricing'
import { Testimonial, Testimonials } from '#components/testimonials'
import { Em } from '#components/typography'
import faq from '#data/faq'
import pricing from '#data/pricing'
import testimonials from '#data/testimonials'

export const meta: Metadata = {
  title: 'Saas UI Landingspage',
  description: 'Free SaaS landingspage starter kit',
}

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />

      <HighlightsSection />

      <FeaturesSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Convert your legacy data
                <Br /> with confidence
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                DataConvert Pro is a <Em>professional data conversion platform</Em>
                <Br /> that helps organizations migrate from legacy systems <Br />{' '}
                by converting CSV files to JSON or XML formats.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/dashboard">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="/convert"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  Try Converter
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Box
                  bg="gray.100"
                  _dark={{ bg: 'gray.700' }}
                  height={762}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xl"
                  color="gray.500"
                >
                  Data Conversion Interface Preview
                </Box>
                </Box>
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: 'Fast Processing',
            icon: FiTrendingUp,
            description: 'Convert thousands of records in seconds with our optimized engine.',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: 'Secure & Private',
            icon: FiLock,
            description:
              'Your data is processed securely and never stored on our servers.',
            iconPosition: 'left',
            delay: 0.8,
          },
          {
            title: 'Multiple Formats',
            icon: FiBox,
            description:
              'Support for CSV, XLS, XLSX input and JSON, XML output formats.',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Organization Ready',
            icon: FiUsers,
            description:
              'Built for teams and organizations with multi-client support.',
            iconPosition: 'left',
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard('yarn add @saas-ui/react')

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Professional Data Conversion">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Transform your legacy data with <Em>enterprise-grade conversion tools</Em>.
            Support for multiple file formats, batch processing, and real-time preview.
            Perfect for organizations migrating from legacy systems.
          </Text>

          <ButtonLink colorScheme="primary" size="lg" href="/convert">
            Start Converting Now
          </ButtonLink>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Built for Enterprise">
        <Text color="muted" fontSize="lg">
          Designed with enterprise needs in mind. Secure processing, audit trails,
          organization management, and scalable architecture to handle your
          data conversion requirements.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Sarah Johnson"
        description="IT Director, HealthCare Plus"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        "DataConvert Pro saved us weeks of manual data migration work. The
        conversion accuracy is excellent and the organization management
        features make it perfect for our multi-department needs."
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Everything you need for data migration"
      >
        <Text color="muted" fontSize="lg">
          Complete toolkit for converting legacy data formats. From simple
          CSV files to complex organizational data structures.
        </Text>
        <Wrap mt="8">
          {[
            'CSV to JSON',
            'CSV to XML',
            'Excel support',
            'batch processing',
            'data preview',
            'organization management',
            'audit trails',
            'secure processing',
            'real-time conversion',
            'download management',
            'error handling',
            'data validation',
            'custom formatting',
            'API integration',
            'team collaboration',
            'progress tracking',
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          More than just
          <Br /> file conversion.
        </Heading>
      }
      description={
        <>
          DataConvert Pro includes everything you need for enterprise data migration.
          <Br />
          From simple file conversion to complex organizational data management.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: 'Batch Processing',
          icon: FiGrid,
          description:
            'Process multiple files simultaneously with our advanced batch conversion engine.',
          variant: 'inline',
        },
        {
          title: 'Data Security',
          icon: FiLock,
          description:
            'Enterprise-grade security with encrypted processing and no data retention policies.',
          variant: 'inline',
        },
        {
          title: 'Real-time Preview',
          icon: FiEye,
          description:
            'Preview your data before conversion to ensure accuracy and proper formatting.',
          variant: 'inline',
        },
        {
          title: 'Team Management',
          icon: FiUserPlus,
          description:
            'Manage multiple organizations and team members with role-based access control.',
          variant: 'inline',
        },
        {
          title: 'Audit Trails',
          icon: FiFlag,
          description:
            'Complete audit logging for compliance and tracking of all conversion activities.',
          variant: 'inline',
        },
        {
          title: 'API Integration',
          icon: FiTrendingUp,
          description:
            'RESTful API for integrating data conversion into your existing workflows.',
          variant: 'inline',
        },
        {
          title: 'Custom Formats',
          icon: FiSliders,
          description:
            'Support for custom data formats and transformation rules for specific use cases.',
          variant: 'inline',
        },
        {
          title: 'Progress Tracking',
          icon: FiTerminal,
          description:
            'Real-time progress tracking for large file conversions with detailed status updates.',
          variant: 'inline',
        },
        {
          title: 'Error Handling',
          icon: FiCode,
          description: (
            <>
              Comprehensive error handling with detailed reports and suggestions
              for data format issues and conversion problems.
            </>
          ),
          variant: 'inline',
        },
      ]}
    />
  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)

        return columns
      },
      [[], [], []],
    )
  }, [])

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  )
}

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default Home
