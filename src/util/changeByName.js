/**
 * Helper code that you can use to create onChange events for form 
 * components by setting the state based on the name of the input.
 * 
 * 
 * 
 * @example  
 * onChange(event) {
 *  changeByName(this, event)
 * }
 * 
 * render() { 
 *  return ( 
 *    <input name="foo" type="text" /> // Changes this.state.foo
 *  )
 * }
 */
function changeByName(self, event) {
  const change = {};
  change[event.target.name] = event.target.value;
  self.setState(change);
}

export default changeByName;
