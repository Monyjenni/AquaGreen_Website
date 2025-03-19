<template>
  <div>
    <v-btn :color="color" rounded="xl" size="large" class="text-none" block> 
      {{ label }}
    </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#E84D72'
  },
  label: {
    type: String,
    required: true
  }
});
</script>
