<template>
  <div class="backlay">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.backlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.533);
}

</style>