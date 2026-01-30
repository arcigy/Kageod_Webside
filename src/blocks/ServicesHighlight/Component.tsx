import React from 'react'
import type { ServicesHighlightBlock as ServicesHighlightBlockProps } from '@/payload-types'
import { Service } from '@/payload-types'

export const ServicesHighlightBlock: React.FC<ServicesHighlightBlockProps> = ({ title, selectedServices }) => {
    return (
        <div className="container py-24">
            {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary tracking-tight">
                    {title}
                </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {selectedServices?.map((serviceOrId) => {
                    if (typeof serviceOrId === 'object') {
                        const service = serviceOrId as Service
                        return (
                            <div
                                key={service.id}
                                className="group bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300"
                            >
                                <div className="text-5xl mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                                    {service.icon === 'map' && '🗺️'}
                                    {service.icon === 'building' && '🏢'}
                                    {service.icon === 'ruler' && '📏'}
                                    {service.icon === 'radar' && '📡'}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}
