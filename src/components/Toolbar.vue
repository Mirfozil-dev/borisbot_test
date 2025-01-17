<template>
  <div class="toolbar">
    <button @click="addBlock" class="toolbar-btn">Add Block</button>
    <button @click="removeBlock" class="toolbar-btn" :disabled="!selectedBlock">Remove Block</button>
    <button @click="removeConnection" class="toolbar-btn" :disabled="!selectedConnection">
      Remove Connection
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ToolbarComponent",
  setup() {
    const store = useStore();

    const selectedBlock = computed(() => store.state.selectedBlock);
    const selectedConnection = computed(() => store.state.selectedConnection);

    const addBlock = () => {
      store.commit("addBlock");
    };

    const removeBlock = () => {
      if (selectedBlock.value) {
        store.commit("removeBlock", selectedBlock.value.id);
      }
    };

    const removeConnection = () => {
      if (selectedConnection.value) {
        store.commit("removeConnection", selectedConnection.value);
      }
    };

    return {
      addBlock,
      removeBlock,
      removeConnection,
      selectedBlock,
      selectedConnection,
    };
  },
});
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  background: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.toolbar-btn {
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #007bff;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
.toolbar-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
