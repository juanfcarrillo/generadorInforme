import express  from "express";
import fs from 'node:fs'
import path from "node:path";
import { fileURLToPath } from 'url'
import vite from 'vite'
import { createRequire } from "node:module";

import generateReport from './Utils/makeReport/makeReport.js'

import cors from 'cors'

const createViteServer = async () => {

    
    let viteServer = await vite.createServer({
        logLevel: 'error',
        server: {
            middlewareMode: true,
        }
    })
    
    return viteServer
    
}

(async () => {
    
    const inProduction = process.env.NODE_ENV === "production"
    
    const PORT = 3000
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const requires = createRequire(import.meta.url)

    const app = express()
    app.use(express.json())
    app.use(cors())

    let viteServer

    if (inProduction){

        app.use((await import('compression')).default())
        app.use((await import('serve-static')).default(path.resolve(__dirname,'dist/client'), {
            index: false
        }))
        
    }else{
        
        viteServer = await createViteServer()
        app.use(viteServer.middlewares)

    }
    
    app.use('^/$', async (req, res) => {

        let template, appHtml, render

        try{

            const url = req.originalUrl

            const indexPath = inProduction ? 'dist/client/index.html': 'index.html'

            template = fs.readFileSync(path.resolve(__dirname, indexPath), 'utf-8')
            
            
            if (inProduction){
                
                render = (await import('./dist/server/entry-server.cjs')).render
                
            }else{
                
                template = await viteServer.transformIndexHtml(url, template)
                render  = (await viteServer.ssrLoadModule('/src/entry-server.jsx')).render

            }

            appHtml = render()
            
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)
    
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    
        }catch (e){
            console.log(e.stack)
            res.status(500).end(e.stack)
        }

    })

    app.post("/api/make-report", async (req, res) => {
        const body = req.body
        const documentFile = await generateReport(body.data)
        res.set('Content-Type','application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        res.status(201).end(documentFile, 'base64')
    })
    
    
    app.listen(PORT, (err) => {
        if (err){
            console.log(err)
        }else{
            console.log(`App listen in http://localhost:${PORT}`)
        }
    })
    
})();

export default createViteServer