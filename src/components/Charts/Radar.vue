<script>
import Chart from 'chart.js'
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
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
