<template>
    <div>
        <div class="card">
            <header class="card-header">
                <p class="card-header title">
                    {{ title }}
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    {{ content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SimpleTile',
  data() {
    return {
      isVisible: true,
    };
  },
  props: ['title', 'content'],
};
</script>
