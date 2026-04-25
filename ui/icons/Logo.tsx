import React from 'react'

const Logo = () => {
    return (
        <svg
            width={230}
            height={64}
            viewBox="0 0 230 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Panelix logo</title>
            <polygon points="12,4 32,10 26,28 6,22" fill="#0b2460" />
            <polygon points="28,6 46,14 38,32 20,24" fill="#0b2460" opacity="0.82" />
            <polygon points="4,22 24,16 28,36 8,42" fill="#18b8b0" />
            <polygon points="18,30 38,24 32,44 12,50" fill="#0b2460" opacity="0.65" />
            <text
                x={60}
                y={40}
                fontFamily="-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif"
                fontSize={27}
                fontWeight={400}
                fill="#0b2460"
                letterSpacing="0.4"
            >
                Panelix
            </text>
        </svg>

    )
}

export default Logo