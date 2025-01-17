<template>
  <svg class="canvas">
    <ConnectionLine
        v-for="connection in connections"
        :key="connection.id"
        :connection="connection"
    />
    <Block
        v-for="block in blocks"
        :key="block.id"
        :block="block"
        @drag="updateBlockPosition(block.id, $event)"
        @handelOnClick="id => handelOnClick(id)"
    />
  </svg>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import { useStore } from "vuex";
import Block from "@/components/Block.vue";
import ConnectionLine from "@/components/ConnectionLine.vue";

export default defineComponent({
  components: { Block, ConnectionLine },
  setup() {
    const store = useStore();
    const connections = computed(() => store.state.connections);
    const blocks = computed(() => store.state.blocks);

    const updateBlockPosition = (id: string, position: { x: number; y: number }) => {
      store.commit("updateBlockPosition", { id, ...position });
    };

    const handelOnClick = (id: string) => {
      store.commit("selectBlock", id);
    };

    return { blocks, connections, updateBlockPosition, handelOnClick };
  },
});
</script>

<style>
.canvas {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
}
</style>
