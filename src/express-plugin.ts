import http from 'node:http'
import express from 'express'

let serverInstance: http.Server | undefined
const app = express();

(function () {
  const originalCreateServerInternal = http.createServer

  http.createServer = function patchedHttpCreateServer(...createServerArgs) {
    const fastMcpOriginalListener = createServerArgs[0]

    const dispatcherFunction = (req: express.Request, res: express.Response) => {
      const passToFastMcp = (err: any) => {
        if (err) {
          console.error('Error from Express layer; FastMCP will not be called:', err)
          return
        }
        if (typeof fastMcpOriginalListener === 'function') {
          fastMcpOriginalListener(req as any, res as any)
        } else {
          console.error('fastMcpOriginalListener is not a callable function.')
        }
      }
      app(req, res, passToFastMcp)
    }

    const finalArgs = [dispatcherFunction, ...createServerArgs.slice(1)]
    const newServerInstance = originalCreateServerInternal.apply(this, finalArgs as any)

    if (typeof serverInstance !== 'undefined') {
      serverInstance = newServerInstance
    }
    return newServerInstance
  }
})()

export default app
