import { FC } from "react";

interface MarkdownLiteProps {
    text: string
}

const MarkdownLite: FC<MarkdownLiteProps> = ({text}) => {
    const linkRegex = /\[(.+?)\]\((.+?)\)/g
    return <div>MarkdownLite</div>;
}

export default MarkdownLite