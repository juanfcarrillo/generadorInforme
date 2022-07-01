import PizZip from 'pizzip'
import DocxTemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free'
import axios from 'axios'
import sizeOf from 'image-size'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

import getImage from '../getImage/getImage.js'

async function generateReport(tags){

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    const data = { image: "https://docxtemplater.com/xt-pro.png" };

    const imageOpts = {
        centered: true,
        getImage: function (tagValue, tagName) {
            return new Promise(function (resolve, reject) {
                const data = getImage(tagValue)
                resolve(data)
            });
        },
        getSize: function (img, tagValue, tagName) {
            let dim
            const size = sizeOf(img)
            const ratio = size.height/size.width
            const width = 600
            dim = [width, width*ratio]
            return dim
        },
        dpi: 30,
    };

    const content = fs.readFileSync(
        path.resolve(__dirname, "template.docx")
    );
    
    const zip = new PizZip(content);

    const doc = new DocxTemplater(zip, {
        modules: [new ImageModule(imageOpts)],
    });

    try{
        await doc.renderAsync({data: tags})
        const buf = await doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        return buf
    }catch (error){
        console.log("An error occured", error);
        return null
    }
}

export default generateReport