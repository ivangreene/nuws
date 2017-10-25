<template>
  <div class="field">
    <div class="control">
      <label>
        <h2 class="label" v-if="label"><slot></slot></h2>
        <slot name="input"><input ref="input" :value="value" @input="$emit('input', $event.target.value)" :type="type" :placeholder="placeholder" class="input"></slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    label: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
    }
  }
}
</script>
