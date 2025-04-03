#!/bin/bash

# Install dependencies
npm install

# Install additional dependencies
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-tabs
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate
npm install framer-motion lucide-react
npm install next-auth nuqs
npm install react-hook-form @hookform/resolvers zod

# Install dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D autoprefixer postcss tailwindcss
npm install -D eslint eslint-config-next prettier typescript 