<template>
  <div ref="chartDom" style="height: 400px;"></div>
</template>

<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      // this.renderChart();
      this.chart.setOption(val);
      // 浅度监听，如果只是option的某个值发生改变的话，监听不到。
      // 可以通过父组件重新创建一个option来解决此问题
    }
    /* option: {
      handler(val) {
        this.chart.setOption(val);
      },
      deep: true
      // 深度监听
    } */
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      // console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style scoped></style>
