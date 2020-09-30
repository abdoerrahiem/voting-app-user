<template>
  <div class="quickCount">
    <div>
      <div>
        <h3>Quick Count (Column Chart)</h3>
        <column-chart :data="data" />
      </div>
      <div>
        <h3>Quick Count (Pie Chart)</h3>
        <pie-chart :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickCount',
  data() {
    return {
      data: [
        ['Abdur Rahim & John Doe', 200],
        ['Abdur Rahim & John Doe II', 100],
        ['Abdur Rahim & John Doe III', 30],
        ['Abdur Rahim & John Doe IV', 60],
        ['Abdur Rahim & John Doe V', 120],
        ['Abdur Rahim & John Doe VI', 160],
      ],
    }
  },
}
</script>

<style>
.quickCount > div {
  padding: 2rem;
}

.quickCount > div > div {
  margin-bottom: 2rem;
}

.quickCount h3 {
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  width: 20rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
