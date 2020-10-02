<template>
  <canvas id="pie-chart" height="300"></canvas>
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
        names.push(`${can.nameOfChairman} & ${can.nameOfViceChairman}`)
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
        type: 'pie',
        data: {
          labels: this.names(),
          datasets: [
            {
              backgroundColor: choseColor(this.candidates.length),
              data: this.data(),
            },
          ],
        },
        options: {
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
    this.createChart('pie-chart', this.chartData)
  },
}
</script>