
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/sitesetting">Site Setting</RouterLink>
        <RouterLink to="/">Manage Product</RouterLink>
        <RouterLink to="/manageUsers">Manage Users</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>


<script>
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
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

</style>
