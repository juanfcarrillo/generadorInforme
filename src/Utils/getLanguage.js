const getLaguageName = (text) =>{

    const languagesJSON = {
        null: 'file',
        'java' : "java",
        'py' : "python",
        'js' : "javascript",
        'jsx' : "javascript",
    }

    const reg = /\.(java|py|js|jsx)$/

    const language =  text.match(reg)

    return !!language?languagesJSON[language[1]]:null

}

export default getLaguageName