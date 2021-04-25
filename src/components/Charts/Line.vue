<script>
import Chart from 'chart.js'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    data: {
      type: Object,
      require: true
    },
    config: {
      type: Object
    }
  },
  mounted() {
    Chart.defaults.global.defaultFontColor = '#54627d'

    this.renderChart(this.data, this.config)
  }
}
</script>
