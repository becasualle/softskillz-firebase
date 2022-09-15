import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { AppState } from "../../app/store";
import { auth, db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

export interface PostNote {
  title: string;
  text: string;
  author: Author;
  createdAt: string;
}

export interface Note extends PostNote {
  id: string;
}

export interface Author {
  name: string;
  email: string;
  id: string;
}

export interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "failed";
}

export const initialNote: Note = {
  id: "",
  title: "",
  text: "",
  author: {
    name: "",
    email: "",
    id: "",
  },
  createdAt: "",
};

// create initial state with default values
const initialState: NotesState = {
  notes: [],
  status: "idle",
};

const notesCollectionRef = collection(db, "notes");

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    const postDoc = doc(db, "notes", id);
    await deleteDoc(postDoc);
    return id;
  }
);

export const fetchAllNotes = createAsyncThunk(
  "notes/fetchAllNotes",
  async (): Promise<Note[]> => {
    const data = await getDocs(notesCollectionRef);
    const notes = data.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Note)
    );
    return notes;
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllNotes.fulfilled,
        (state, action: PayloadAction<Note[]>) => {
          state.status = "idle";
          state.notes = action.payload;
        }
      )
      .addCase(fetchAllNotes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

// export actions

// export select
export const selectNotes = (state: AppState) => state.notes.notes;
export const selectNotesStatus = (state: AppState) => state.notes.status;

// export reducer
export default notesSlice.reducer;
