import { useState } from 'react'

interface Props {
    children: string;
    maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: Props) => {
    const [isExanded, setExpanded] = useState(false)
    if (children.length <= maxChars) return <p>{children}</p>;

    const text = isExanded ? children : children.substring(0, maxChars);
    return (
        <div>{text}... <button onClick={() => setExpanded(!isExanded)}>{isExanded ? ' Less' : ' More'}</button> </div>
    )
}

export default ExpandableText