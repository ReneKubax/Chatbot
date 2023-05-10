import { FC } from "react";

interface MarkdownLiteProps {
    text: string
}

const MarkdownLite: FC<MarkdownLiteProps> = ({text}) => {
    const linkRegex = /\[(.+?)\]\((.+?)\)/g
    const parts = []

    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
        const [fullMatch, linkText, linkUrl] = match
        const matchStart = match.index
        const matchEnd = matchStart + fullMatch.length
        
        if(lastIndex < matchStart) {
            parts.push(text.slice(lastIndex, matchStart))
        }
    }
    
    return <div>MarkdownLite</div>;
}

export default MarkdownLite