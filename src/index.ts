import nunjucks from "nunjucks"
const nunjEnv = new nunjucks.Environment()

// Contains "helper" functions that might be injected in to various template engines.
// Plugins can use Hooks.helper(string, action) to add to this object.
const funcs = new Map<string, (value: string) => string>()

export interface Hooks {
  /**
   * Add a new template helper.
   * @param  {string} name The name of the new helper.
   * @param  {(value:string) => string} action The action that the helper will perform on the value.
   */
  helper(name: string, action: (value: string) => string): void
}

export class Injectable implements Hooks {
  helper(name: string, action: (value: string) => string): void {
    // We can handle the new function however we want.
    // Maybe the function is stored globally in this object..
    funcs.set(name, action)
    // And it is also injected in to a Nunjucks environment..
    nunjEnv.addFilter(name, action)
  }
}

const hooks = new Injectable()

import ("./plugin")
  .then(imp => imp.default(hooks))
  .then(() => nunjEnv.renderString("This username should be uppercase: {{ username | big }}", { username: "James" }))
  .then((result) => console.log(result))