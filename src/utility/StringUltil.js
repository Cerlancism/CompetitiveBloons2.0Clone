class StringUtil
{
    /**
     * 
     * @param {String} string 
     */
    markdownCodeLine(string)
    {
        return "`" + string.replace("`", '\\`') + "`"
    }

    /**
     * 
     * @param {String} string 
     * @param {String} syntaxType 
     */
    markdownCodeBlock(string, syntaxType = "")
    {
        return "```" + syntaxType + "\n" + string.replace("```", '\\```') + "\n```"
    }
}

module.exports = new StringUtil();