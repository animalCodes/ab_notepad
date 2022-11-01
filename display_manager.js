// * Once page has finished loading, take a peek at the URL and convert any GET parameters into notes
addEventListener("DOMContentLoaded", () => {
  // retrieve parameters
  const parameters = new URL(document.URL).searchParams;
  
  // if searchParams is empty, return out.
  if (parameters.toString() == "") return;

  // otherwise, delete default note.
  deleteNote(0)
  
  // fill out notes
  for (let i = 0; i < Number(parameters.get("count"))||0; i++) {
    // retrieve title and content, add note with retrieved data
    addNote(parameters.get(`${i}_title`), parameters.get(`${i}_content`))
  }

  // Update display
  updateUrlDisplay()
})

// * Notes

// Note HTML - I know using <div>s is unsemantic but <fieldset>s have max-width + a 2px groove border by default and I want the page to look as good as possible without any css
const noteHtml = "<div class='note' id='note_{{id}}'><button onclick='deleteNote({{id}})'>Delete</button>\n<input type='text' value='{{title}}'><br/><textarea cols='29' rows='5'>{{content}}</textarea></div>"

let noteCount = 1;

/**
 * Creates a new note
 * @param {string} title - title of note, default "Title"
 * @param {string} content - content of note, default "Content"
 */
function addNote(title="Title", content="Content") {
  // * Updating the content of the holder will reset any input values, so we need to save them first.
  
  // add new note - ugly but it works.
  holder.innerHTML += noteHtml.replaceAll("{{id}}", noteCount).replaceAll("{{title}}", title).replaceAll("{{content}}", content)

  const noteBuffer = getNoteBuffer();
  
  // * Restore values
  for (let i = 0; i < holder.children.length-1/* skip just added note*/; i++) {
    const child = holder.children[i];
    // restore title
    child.children[1].value = noteBuffer[i][0];
    // restore content
    child.children[2].value = noteBuffer[i][1];
  }
  
  noteCount++;

  updateUrlDisplay()
}

// Un-hide buttons once script has loaded
document.querySelector("div#button_holder button").hidden = false;
document.querySelector("div#note_0 button").hidden = false;
document.getElementById("url_holder").hidden = false;