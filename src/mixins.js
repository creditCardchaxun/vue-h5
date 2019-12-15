/* eslint-disable no-console */
export const mixinsTest = {
  methods: {
    hello() {
      console.log("hello");
    }
  },
  created() {
    this.hello()
  }
}