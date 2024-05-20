import { useState } from "react";

export default function TextExpander({
    children,
    collapsedNumWords = 40,
    expandButtonText = "Show more",
    collapseButtonText = "Show less",
    buttonColor = "#1f09cd",
    className = "",
    expanded = false,
}) {
    const [isExpanded, setIsExpanded] = useState(expanded);

    function handleExpand() {
        setIsExpanded((ex) => !ex);
    }

    return (
        <div className={className}>
            <span>
                {isExpanded
                    ? children
                    : children
                          .split(" ")
                          .slice(0, collapsedNumWords)
                          .join(" ") + "..."}
            </span>
            <Button onExpand={handleExpand} buttonColor={buttonColor}>
                {isExpanded ? collapseButtonText : expandButtonText}
            </Button>
        </div>
    );
}

function Button({ children, onExpand, buttonColor }) {
    const buttonStyle = {
        border: "none",
        background: "none",
        color: buttonColor,
        marginLeft: "5px",
    };

    return (
        <button onClick={onExpand} style={buttonStyle}>
            {children}
        </button>
    );
}
