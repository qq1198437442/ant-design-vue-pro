<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark" @click="onChange">黑色</a-radio>
          <a-radio value="light" @click="onChange">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left" @click="onChange">左侧</a-radio>
          <a-radio value="top" @click="onChange">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left"
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>
<style scoped>
.handle {
  font-size: 20px;
  position: absolute;
  top: 240px;
  right: 255px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
