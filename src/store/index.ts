import { createStore } from 'vuex'
import { Block, Connection } from "@/types";
import { uid } from "@/utils";

interface State {
  blocks: Block[];
  connections: Connection[];
  selectedBlock: null | Block;
  selectedConnection: null | string;
}

export default createStore({
  state: {
    blocks: [],
    connections: [],
    selectedBlock: null,
    selectedConnection: null
  },
  mutations: {
    addBlock(state: State) {
      const id = uid()
      const block = {
        id,
        x: 0,
        y: 0,
      }
      state.blocks.push(block);
    },
    updateBlockPosition(state: State, { id, x, y }: { id: string; x: number; y: number }) {
      const block = state.blocks.find((b) => b.id === id);
      if (block) {
        block.x = x;
        block.y = y;
      }
    },
    removeConnection(state: State, id: string) {
      state.connections = state.connections.filter((conn) => conn.id !== id);
      state.selectedConnection = null;
    },
    removeBlock(state: State, id: string) {
      state.blocks = state.blocks.filter((block) => block.id !== id);
      state.connections = state.connections.filter((conn) => conn.from !== id && conn.to !== id);
      state.selectedBlock = null
    },
    selectBlock(state: State, id: string) {
      if (state.selectedBlock !== null) {
        const connectionExists = state.connections.some(
            conn =>
                (conn.from === state.selectedBlock!.id && conn.to === id) ||
                (conn.from === id && conn.to === state.selectedBlock!.id)
        );

        if (!connectionExists) {
          const generatedId = uid()
          state.connections.push({
            id: generatedId,
            from: state.selectedBlock.id,
            to: id,
          })
        } else {
          alert('Connection already exists!')
        }
        state.selectedBlock = null
      } else {
        state.selectedBlock = state.blocks.find(block => block.id === id) || null;
      }
    },
    selectConnection(state: State, id: string) {
      state.selectedConnection = id
    }
  },
})
