<template>
    <fa type="fas" icon="spinner" class="spinner"></fa>
</template>

<script>
export default {
    name: 'Spinner'
}
</script>

<style lang="scss" scoped>
@keyframes rotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}
.spinner {
    width: 36px;
    height: 36px;
    margin: 6px;
    animation: rotation 2s infinite linear;
    color: #2c3e50;
}
</style>