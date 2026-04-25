import React from 'react'
import { ICommonCardsProps } from '@/typescript/interfaces/CustomAllInterface'

const CommonCards = ({ className, children }: ICommonCardsProps) => {
    return (
        <div className={`border border-border p-4 rounded-xl ${className}`}>
            {children}
        </div>
    )
}

export default CommonCards