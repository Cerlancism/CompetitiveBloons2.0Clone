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
    markdownCodeLinify(string)
    {
        return "`" + string.replace("`", '') + "`"
    }

    /**
     * 
     * @param {String} string 
     * @param {String} syntaxType 
     */
    markdownCodeBlockify(string, syntaxType = "")
    {
        return "```" + syntaxType + "\n" + string.replace("```", '') + "\n```"
    }

    /**
     * 
     * @param {String} string 
     */
    extractOneDigitSet(string)
    {
        try
        {
            var digits = string.match(/\d+/g)[0];
            return digits;
        }
        catch (error)
        {
            return undefined;
        }
    }

    boldify(string)
    {
        return '**' + string + '**';
    }
}

module.exports = new StringUtil();