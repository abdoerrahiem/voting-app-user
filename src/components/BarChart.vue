<template>
  <canvas id="bar-chart" height="300"></canvas>
</template>

<script>
import Chart from 'chart.js'
import { choseColor } from '../utils'

Chart.defaults.global.defaultFontFamily = 'Quicksand'

export default {
  props: ['candidates'],
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId)
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      })
    },
    names() {
      let names = []
      this.candidates.map((can) =>
        names.push(
          `${can.nameOfChairman.split(' ')[0]} & ${
            can.nameOfViceChairman.split(' ')[0]
          }`
        )
      )
      return names
    },
    data() {
      let numbers = []
      this.candidates.map((can) => numbers.push(can.totalSuara))
      return numbers
    },
  },
  data() {
    return {
      chartData: {
        type: 'bar',
        data: {
          labels: this.names(),
          datasets: [
            {
              label: 'Quick Count',
              backgroundColor: choseColor(this.candidates.length),
              data: this.data(),
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontSize: 15,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 15,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      },
    }
  },
  mounted() {
    this.createChart('bar-chart', this.chartData)
  },
}
</script>