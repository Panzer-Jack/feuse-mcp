#!/usr/bin/env node

import app from './express-plugin'
import { MCPServer } from './server'

// 验证环境变量
const FIGMA_API_KEY = process.env.FIGMA_API_KEY as string
if (!FIGMA_API_KEY) {
  console.error('❌ FIGMA_API_KEY environment variable is not set')
}

export const mcpServer = new MCPServer({ figmaApiKey: FIGMA_API_KEY })

mcpServer.server.start({
  transportType: 'stdio',
})

mcpServer.server.on('connect', (event) => {
  console.log(process.env.FIGMA_API_KEY)
  console.log('Client connected:', event.session)
})

mcpServer.server.on('disconnect', (event) => {
  console.log('Client disconnected:', event.session)
})

app.get('/stream/monitor/ping', (req, res) => {
  res.send('pong')
})
