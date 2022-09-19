import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { AppState } from "../../app/store";
import { auth, db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

export interface Author {
  name: string;
  email: string;
  id: string;
}

export interface Distortion {
  val: string;
  checked: boolean;
  example: string;
}

export interface PostNote {
  title: string;
  description: string;
  emotion: "",
  emotePower: "",
  autoThoughts: "",
  distortions: string[],
  thoughtAnalyze: "",
  rationalThoughts: "",
  author: Author;
  createdAt: string;
}

export interface Note extends PostNote {
  id: string;
}

export interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "failed";
}

export const initialDistortions: Distortion[] = [
  {
    val: "Катастрофизация",
    checked: false,
    example: "Что если случится худшее?",
  },
  {
    val: "Черно-белое мышление",
    checked: false,
    example: "Я полный неудачник",
  },
  {
    val: "Эмоциональное рассуждение",
    checked: false,
    example: "Я так чувствую, стало быть это правда",
  },
  {
    val: "Усиление негатива",
    checked: false,
    example: "Я абсолютно все загубил ",
  },
  {
    val: "Минимизация позитива",
    checked: false,
    example: "Они так говорят просто из вежливости",
  },
  {
    val: "Навешивание ярлыков",
    checked: false,
    example: "Если я ошибся, значит, я идиот",
  },
  {
    val: "Предсказание будущего",
    checked: false,
    example: "Я наверняка провалю мой экзамен",
  },
  {
    val: "Чтение мыслей",
    checked: false,
    example: "Он думает, что я не справлюсь",
  },
  { val: "Персонализация", checked: false, example: "Это всё из-за меня" },
  {
    val: "Обвинение других",
    checked: false,
    example: "Это они во всем виноваты",
  },
  {
    val: "Чрезмерное обобщение",
    checked: false,
    example: "Мне вечно не везет",
  },
];

export const defaultNote = {
  title: "",
  description: "",
  emotion: "",
  emotePower: "",
  autoThoughts: "",
  distortions: [],
  thoughtAnalyze: "",
  rationalThoughts: "",
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
