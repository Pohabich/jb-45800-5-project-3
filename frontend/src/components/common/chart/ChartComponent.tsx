import { useEffect, useRef } from "react"
import { Chart } from 'chart.js'
import './Chart.css'
import type DestinationLikes from "../../../models/DestinationLikes"


const BAR_COLOR = '#3da5ed'


interface Props {
    data: DestinationLikes[],
    title: string
}

export default function ChartComponent({ data, title }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const chartRef = useRef<Chart | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const styles = getComputedStyle(document.documentElement)
        const fontFamily = styles.getPropertyValue('--font-family')
        const fontSize = parseInt(styles.getPropertyValue('--font-size'))

        Chart.defaults.global.defaultFontFamily = fontFamily
        Chart.defaults.global.defaultFontSize = fontSize

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                animation: {
                    duration: 0,
                },
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        ticks: { beginAtZero: true },
                        gridLines: {
                            display: true,
                            drawOnChartArea: true
                        }
                    }]
                }
            }
        })

        return () => {
            chartRef.current?.destroy()
        }
    }, [])

    useEffect(() => {
        const chart = chartRef.current
        if (!chart || !data) return

        chart.data.labels = data.map(item => item.location)

        chart.data.datasets = [{
            data: data.map(item => item.totalLikes),
            backgroundColor: BAR_COLOR,
            borderColor: BAR_COLOR,
            borderWidth: 1
        }]

        chart.update()
    }, [data])

    return (
        <canvas ref={canvasRef} className="Chart" />
    )
}