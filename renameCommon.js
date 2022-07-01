import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const name = "dist/server/entry-server.js"
const rename = "dist/server/entry-server.cjs"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

fs.rename(path.resolve(__dirname, name), path.resolve(__dirname, rename), () => {
    console.log("cjs completado")
})
