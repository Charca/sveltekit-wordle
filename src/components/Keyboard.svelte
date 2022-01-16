<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      dispatch('submit');
      return;
    }

    if ((event.keyCode < 65 || event.keyCode > 90) && event.key !== 'Backspace') {
      return;
    }

    dispatch('input', { key: event.key });
  }
</script>

<svelte:window on:keydown={handleKeydown} />
