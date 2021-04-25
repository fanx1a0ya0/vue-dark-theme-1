<script>
import Chart from 'chart.js'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
