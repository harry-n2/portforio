"use client"

import { useEffect } from "react"

export function AnalyticsTracker({ lpId }: { lpId: string }) {
    useEffect(() => {
        // Mock analytics call
        console.log(`Tracking view for LP: ${lpId}`)
        // fetch('/api/analytics/track', { method: 'POST', body: JSON.stringify({ lpId, type: 'view' }) })
    }, [lpId])

    return null
}
