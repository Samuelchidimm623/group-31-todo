 Notes Application

A digital notebook for writing, organising, and searching personal notes. Notes are kept in the browser's Local Storage so they persist between visits.

## What it does

- Create a new note (title + body) via a modal dialog
- Display all saved notes as cards
- Edit an existing note
- Delete a note
- Search notes by title or by keyword in the body, live as you type
- Saves everything with Local Storage
- Refuses to save a completely empty note
- Responsive card grid — reflows on smaller screens

## Requirements (planning)

1. A user can click "New note", type a title and/or body, and save it as a new note card.
2. A user can click "Edit" on any note to change its title/body.
3. A user can click "Delete" on any note to remove it permanently.
4. A user can type in the search box and see the note grid filtered to matches in the title or body.
5. The app must not save a note that has no title and no body.

## Classes / functions used

- **`Note`** — data model for one note (`id`, `title`, `body`, `createdAt`).
- **`NotesApp`** — the controller class. Key methods:
  - `load()` / `save()` — Local Storage read/write
  - `bindEvents()` — wires up New/Cancel/Save buttons and the search box
  - `openModal(note)` / `closeModal()` — show/hide the add-or-edit dialog
  - `commitNote()` — validates and saves the note being created or edited
  - `deleteNote(id)` — removes a note
  - `filteredNotes()` — returns notes matching the current search text
  - `handleSearch()` — re-renders on every keystroke in search
  - `render(list)` — draws the note cards

## Expected input / output

| Action     | Input                                                  | Output                                                                             |
| ---------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| New note   | Title: `"Exam dates"`, Body: `"Grade calc due Friday"` | New card appears in the grid                                                       |
| Empty note | Title and body both blank, click Save                  | Error: _"A note needs a title or some content — it can't be empty."_ Nothing saved |
| Search     | Type `"exam"` in search box                            | Only notes with "exam" in title or body remain visible                             |
| Edit       | Click Edit, change text, Save                          | Card updates with new content                                                      |
| Delete     | Click Delete on a card                                 | Card is removed from the grid                                                      |

## How to run

1. Download/clone this folder (`index.html`, `style.css`, `script.js`).
2. Open `index.html` directly in your browser.
3. No installation or server required.

## Files

```
2-notes-app/
├── index.html   — page structure
├── style.css    — styling
├── script.js    — app logic (Note, NotesApp classes)
└── README.md    — this file
```
