/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY_COVALENTHQ: process.env.API_KEY_COVALENTHQ
  }
}

module.exports = nextConfig
