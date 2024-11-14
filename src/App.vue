<script setup lang="ts">
import { PopupSize } from '@/common/interfaces/popup.interface';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
</script>

<template>
  <v-app>
    <v-main>
      <!-- Template to display during data loading -->
      <template v-if="authStore.rehydrateLoading">
        <v-dialog
          v-model="authStore.rehydrateLoading"
          persistent
          :max-width="PopupSize.sm"
        >
          <v-card max-height="400" height="300">
            <v-card-text class="d-flex align-center justify-center'">
              <v-row justify="center" align="center">
                <v-progress-circular
                  indeterminate
                  color="secondary"
                  size="80"
                ></v-progress-circular>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
      <!-- Template to display data -->
      <template v-else>
        <router-view />
      </template>
      <notifications />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
