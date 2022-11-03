/**
 * Generates a URL string containing all note content to be used for restoration.
 * Essentially just converts the output of getNoteBuffer() to a URL string.
 * @returns {string} Generated URL
 */
 function createUrl() {
  let noteBuffer = getNoteBuffer()
   // start with route and 'count' parameter
  let url = "/placeholder?count="+noteBuffer.length;

  let id = 0;
  noteBuffer.forEach(pair => {
    // for every pair, append GET parameters.
    // noteBuffer pairs look like [(title), (content)]
    url += `&${id}_title=${pair[0]}&${id}_content=${pair[1]}`
    id++
  })

  return url;
}

/**
 * Updates value of url holder with url generated by createUrl.
 */
 function updateUrlDisplay() {
  urlDisplay.value = createUrl();
}

/**
 * Returns array representation of current notes.
 * @returns {array} array of pairs where first item is note title and second item is note content.
 */
 function getNoteBuffer() {
  let noteBuffer = [];

  // for every note
  for (let i = 0; i < noteCount; i++) {
    const child = holder.children[i];
    // push title and content
    noteBuffer.push([child.children[1].value, child.children[3].value]);
  }

  return noteBuffer;
}

/**
 * Creates a new note
 * @param {string} title - title of note, default "Title"
 * @param {string} content - content of note, default "Content"
 */
 function addNote(title="Title", content="Content") {
  // Save current notes
  const noteBuffer = getNoteBuffer();
  
  // add new note - ugly but it works.
  holder.innerHTML += noteHtml.replaceAll("{{id}}", noteCount).replaceAll("{{title}}", title).replaceAll("{{content}}", content)
  
  // * Restore values
  for (let i = 0; i < noteCount; i++) {
    const child = holder.children[i];
    // restore title
    child.children[1].value = noteBuffer[i][0];
    // restore content
    child.children[3].value = noteBuffer[i][1];
  }
  
  noteCount++;

  updateUrlDisplay()
}

/**
 * Deletes note with given id
 * @param {Number} id - id of note
 */
 function deleteNote(id) {
  holder.querySelector(`#note_${id}`).remove();
  noteCount--;
  updateUrlDisplay()
}