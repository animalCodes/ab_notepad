// Get URL display element from DOM
const urlDisplay = document.getElementById("url_holder")

// * Once page has finished loading, take a peek at the URL and decode any GET parameters
addEventListener("DOMContentLoaded", () => {
  // retrieve parameters
  const parameters = new URL(document.URL).searchParams;
  
  // if searchParams is empty, return out.
  if (parameters.toString() == "") return;

  // otherwise, delete default node.
  deleteNode(0)
  
  // fill out notes
  for (let i = 0; i < Number(parameters.get("count"))||0; i++) {
    // retrieve title and content, add note with retrieved data
    addNode(parameters.get(`${i}_title`), parameters.get(`${i}_content`))
  }

  // Update display
  updateUrlDisplay()
})

/**
 * Updates value of url holder with url generated by createUrl
 */
 function updateUrlDisplay() {
  urlDisplay.value = createUrl();
}

/**
 * Generates a URL string containing all node data, to be used to restore 'sessions'
 * @returns {string} generated URL
 */
function createUrl() {
  // start with route and 'count' parameter
  updateNodeBuffer()
  let url = "/placeholder?count="+nodeBuffer.length;

  let id = 0;
  nodeBuffer.forEach(pair => {
    // for every pair, append GET parameters.
    url += `&${id}_title=${pair[0]}&${id}_content=${pair[1]}`
    id++
  })

  return url;
}