import { configure, defineRule } from "vee-validate";
import {
  alpha_spaces as alphaSpaces,
  min as minValue,
  max as maxValue,
  email,
  required,
} from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("alpha_spaces", alphaSpaces);
  defineRule("min", minValue);
  defineRule("max", maxValue);

  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `The field ${ctx.field} is required.`,
        email: `The field ${ctx.field} must be a valid email.`,
        alpha_spaces: `The field ${ctx.field} may contain alphabetic characters and spaces.`,
        min: `The field ${ctx.field} is too short.`,
        max: `The field ${ctx.field} is too long.`,
      };

      const message = messages[ctx.rule.name]
        ? messages[ctx.rule.name]
        : `The field ${ctx.field} is invalid`;

      return message;
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  });
});
