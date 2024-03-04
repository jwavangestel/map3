<template>
  <div class="feature-table">
    <button type="button" @click="close">Close</button>
    <table class="feature-table">
      <thead>
        <tr>
          <th>
            {{ feature.id }}
          </th>
          
        </tr>
      </thead>
      <tr>
        <th>
          Gemeente
        </th>
        <td>
          {{ properties.gemeente }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue';
import { useFeatureStore } from "@/stores/featureStore";

const props = defineProps({
  feature: {
    type: Object,
    required: true,
  },
});

const properties = computed(() => {
  if ('properties' in props.feature) {
    return props.feature.properties;
  }
  return null;
});

const featureStore = useFeatureStore();

const close = (() => {
  featureStore.resetCurrentFeature();
});


</script>