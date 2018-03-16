class StringUtil
{
    constructor()
    {
        this.SyntaxType =
            {
                CSharp: "csharp",
                cpp: "cpp",
                SQL: "sql",
                JavaScript: "js",
                YAML: "yaml",
                Inform7: "inform7"
            }
    }
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