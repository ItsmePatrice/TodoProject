export default class StorageManager {
  getNotes() {
    //const notes = JSON.parse(localStorage.getItem(this.STORAGE_KEY_NOTES));
    return notes ? notes : [];
  }

  getNoteById(id) {
    const note = this.getNotes().find((note) => note.id === id);
    return note !== undefined ? note : undefined;
  }

  setNotes(notesArray) {
    let notesTemp = this.getNotes();

    for (let i = 0; i < notesArray.length; i++) {
      notesTemp.push(notesArray[i]);
    }

    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notesTemp));
  }

  /**
   * Remplaces les items du storage par notesArray
   * @param {Array<Note>} notesArray tableau de notes à mettre
   */
  addNotes(notesArray) {
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notesArray));
  }

  /**
   * Ajoute une nouvelle note au Storage
   * @param {Note} note note à ajouter
   */
  addNote(note) {
    const notes = this.getNotes() || [];
    notes.push(note);
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
  }

  /**
   * TODO : Supprime une note en fonction de son ID
   * @param {string} id identifiant de la note
   */
  deleteNoteById(id) {
    const notes = this.getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);

    if (updatedNotes.length !== notes.length) {
      localStorage.setItem(
        this.STORAGE_KEY_NOTES,
        JSON.stringify(updatedNotes)
      );
    }
  }

  /**
   * TODO : Supprime toutes les notes du storage
   */
  deleteAllNotes() {
    localStorage.clear();
  }
}
