import Link from 'next/link'
import React from 'react'
import { Github, Linkedin} from 'lucide-react'

const Footer = () => {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Segments', href: '/segment' },
    { name: 'Campaigns', href: '/campaign' },
  ]

  const socials = [
    { name: 'GitHub', icon: <Github className="h-6 w-6" />, href: 'https://github.com/Vasu1303' },
    { name: 'LinkedIn', icon: <Linkedin className="h-6 w-6" />, href: 'https://www.linkedin.com/in/vasusingh1305/' },
    
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-gray-100">
      <div className="  px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between  ">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600">ONEX</h3>
            <p className="mt-4 text-gray-600 max-w-md">
              Simplify your customer engagement with our powerful CRM solution. 
              Build better relationships, one interaction at a time.
            </p>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
              <ul className="mt-4 space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links and Credits */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              Made by{' '}
              <span className="font-medium text-blue-600">Vasu</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
