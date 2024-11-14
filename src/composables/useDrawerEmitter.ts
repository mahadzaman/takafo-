import { ref } from 'vue';

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

export function useDrawerEmitter() {
  return {
    drawer,
    toggleDrawer,
  };
}
