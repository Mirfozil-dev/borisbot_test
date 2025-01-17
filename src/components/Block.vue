<template>
  <rect
      @dblclick="handelOnClick"
      style="cursor: pointer;"
      width="100px"
      height="100px"
      fill="#007bff"
      :x="block.x"
      :y="block.y"
      rx="10"
      @mousedown="startDragging"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Block } from "@/types";

export default defineComponent({
  props: {
    block: {
      type: Object as PropType<Block>,
      required: true,
    },
  },
  emits: ["drag", "handelOnClick"],
  setup(props, { emit }) {
    const startDragging = (event: MouseEvent) => {
      const startX = event.clientX - props.block.x;
      const startY = event.clientY - props.block.y;

      const onMouseMove = (moveEvent: MouseEvent) => {
        emit("drag", { x: moveEvent.clientX - startX, y: moveEvent.clientY - startY });
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const handelOnClick = () => {
      emit("handelOnClick", props.block.id);
    };

    return { startDragging, handelOnClick };
  },
});
</script>
