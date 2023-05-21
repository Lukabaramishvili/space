<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/dark@2x.png" alt="Logo" />
    </div>
    <nav class="nav">
      <ul>
        <li class="nav-item">
          <a href="https://space.ge/" target="_blank" rel="noopener noreferrer" class="nav-button"
            >About</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  // component code here
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 50px;
  color: #fff;
}

.logo img {
  height: 40px;
}

.nav {
  margin-left: auto;
}

.nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: inline-block;
  margin-left: 20px;
}

.nav-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #fff;
  color: #111;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #e4e1e1;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .logo {
    margin-bottom: 20px;
  }

  .nav {
    margin: 0;
  }

  .nav-item {
    display: block;
    margin: 10px 0;
  }
}
</style>
