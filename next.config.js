/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Ignora o módulo `fs` no lado do cliente
      path: false, // Ignora o módulo `path` no lado do cliente
    };
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
