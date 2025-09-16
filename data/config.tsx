import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'DataConvert Pro',
    description: 'Professional data conversion platform for organizations',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        label: 'Products',
        href: '#',
      },
      {
        label: 'Features',
        href: '#',
      },
      {
        label: 'Resources',
        href: '#',
      },
      {
        label: 'Compare',
        href: '#',
      },
      {
        label: 'Pricing',
        href: '#',
      },
      {
        label: 'Login',
        href: '/login',
      },
      {
        label: 'Get Started',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        © 2024 DataConvert Pro. All rights reserved.
      </>
    ),
    links: [
      {
        href: 'mailto:hello@saas-ui.dev',
        label: 'Contact',
      },
      {
        href: '#',
        label: <FaTwitter size="14" />,
      },
      {
        href: '#',
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: 'Start converting your data today',
    features: [
      {
        icon: FiCheck,
        title: 'Fast Conversion',
        description: 'Convert CSV files to JSON or XML format in seconds.',
      },
      {
        icon: FiCheck,
        title: 'Secure Processing',
        description:
          'Your data is processed securely and never stored permanently.',
      },
      {
        icon: FiCheck,
        title: 'Multiple Formats',
        description:
          'Support for CSV, XLS, XLSX input and JSON, XML output formats.',
      },
      {
        icon: FiCheck,
        title: 'Organization Management',
        description:
          'Manage multiple client organizations and their conversion needs.',
      },
    ],
  },
}

export default siteConfig
