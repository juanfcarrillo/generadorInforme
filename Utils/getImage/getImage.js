import axios from "axios"
const baseURL = 'https://carbonara-42.herokuapp.com/api/cook'

const PARAMS = {
    "backgroundColor": "#1F816D",
    "paddingVertical": "56px",
    "paddingHorizontal": "56px",
    "backgroundImage": "null",
    "backgroundImageSelection": "null",
    "backgroundMode": "color",
    "backgroundColor": "rgba(144,19,254,0)",
    "dropShadow": true,
    "dropShadowOffsetY": "20px",
    "dropShadowBlurRadius": "68px",
    "theme": "seti",
    "windowTheme": "none",
    "language": "python",
    "fontFamily": "Hack",
    "fontSize": "14px",
    "lineHeight": "133%",
    "windowControls": true,
    "widthAdjustment": true,
    "lineNumbers": false,
    "firstLineNumber": 1,
    "exportSize": "2x",
    "watermark": false,
    "squaredImage": "false",
    "hiddenCharacters": "false",
    "name": "",
    "width": 1000
  
}

async function getImage(code){

    PARAMS['code'] = code

    const content = JSON.stringify(PARAMS)
    try{
        const response = await axios({
            url: baseURL,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            responseType: 'arraybuffer',
            data: PARAMS
        })

        return response.data
    }catch (e){
        console.log(`Error: ${e}`)
    }

}

export default getImage