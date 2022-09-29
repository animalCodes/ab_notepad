// Grab holder from DOM
const holder = document.getElementById("field_holder")
// Note HTML
const noteHtml = "<fieldset id='{{id}}'><button onclick='deleteNode({{id}})'>X</button><input type='text' id='{{id}}_title' placeholder='Title'><br/><textarea id='{{id}}_body' cols='25' rows='6'>Body</textarea></fieldset>"

let nodeCount = 0; 
let nodeBuffer = [];

// * Helper/library functions

/**
 * Updates nodeBuffer with current node titles and bodies
 */
function updateNodeBuffer() {
  // reset buffer
  nodeBuffer = [];

  // for every node
  for (let i = 0; i < holder.children.length; i++) {
    const child = holder.children[i];
    // push title and body
    nodeBuffer.push([child.children[1].value, child.children[3].value]);
  }
}

/**
 * Creates a new node
 */
function addNode() {
  nodeCount++;
  // * Updating the content of the holder will reset any input values, so we need to save them first.

  // update buffer
  updateNodeBuffer()

  // add new node
  holder.innerHTML += noteHtml.replaceAll("{{id}}", nodeCount)

  // * Restore values
  for (let i = 0; i < holder.children.length-1/* skip just added node*/; i++) {
    const child = holder.children[i];
    // restore title
    child.children[1].value = nodeBuffer[i][0];
    // restore body
    child.children[3].value = nodeBuffer[i][1];
  }
  updateUrlDisplay()
}

/**
 * Deletes node with given id
 * @param {Number} id - id of node
 */
function deleteNode(id) {
  nodeCount--;
  // loop through all children of holder
  for (let i = 0; i < holder.children.length; i++) {
    const child = holder.children[i];
    // if ids match, remove node
    if (child.id == id) {
      child.remove();
    }
  }
  updateUrlDisplay()
}