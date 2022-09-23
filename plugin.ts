import { Hooks } from "./index"

export default (hooks: Hooks) => {
  hooks.helper("big", (value: string) => {
    return value.toUpperCase()
  })
}