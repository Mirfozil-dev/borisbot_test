<template>
  <Toolbar />
  <Workspace />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toolbar from "@/components/Toolbar.vue";
import Workspace from "@/components/Workspace.vue";

export default defineComponent({
  name: 'App',
  components: {
    Workspace,
    Toolbar,
  }
});
</script>

<style>
</style>
