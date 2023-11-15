import { configure, defineRule } from "vee-validate";
import { alpha_spaces, email, required } from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("alpha_spaces", alpha_spaces);

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The field ${ctx.field} is required`,
        email: `The field ${ctx.field} must be a valid email`,
      };
    },
  });
});
