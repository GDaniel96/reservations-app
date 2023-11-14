import { defineRule } from "vee-validate";
import { alpha, email, required } from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("alpha", alpha);
});
