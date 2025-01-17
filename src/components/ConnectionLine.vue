<template>
  <line
      @dblclick="selectConnection"
      :x1="coords.from.x"
      :y1="coords.from.y"
      :x2="coords.to.x"
      :y2="coords.to.y"
      stroke="black"
      stroke-width="2"
      style="cursor: pointer"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Block, Connection} from "@/types";
import {useStore} from "vuex";

export default defineComponent({
  props: {
    connection: {
      type: Object as PropType<Connection>,
      required: true,
    }
  },
  computed: {
    coords() {
      const fromBLock: Block = this.store.state.blocks.find((block: Block) => block.id === this.connection.from);
      const toBlock: Block = this.store.state.blocks.find((block: Block) => block.id === this.connection.to);

      return {
        from: {
          x: fromBLock.x + 50,
          y: fromBLock.y + 50,
        },
        to: {
          x: toBlock.x + 50,
          y: toBlock.y + 50,
        }
      }
    }
  },
  methods: {
    selectConnection() {
      this.store.commit("selectConnection", this.connection.id);
    }
  },
  setup() {
    const store = useStore();

    return { store }
  }
});
</script>
