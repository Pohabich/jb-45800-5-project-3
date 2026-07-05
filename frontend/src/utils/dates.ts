// import { useState } from "react"

export function displayDate(date: string | Date): string {
    return (new Date(date)).toLocaleDateString()
}