type AppState = {
  notesList: Array<any>;
  noteFields: {
    title: string;
    noteText: string;
  };
  notePreviewId: null | number;
  searchText: string;
  isEdit: boolean;
};

type Note = {
  title: string;
  noteText: string;
  id: number;
  date: Date;
};

type Action = {
  type: string;
  payload?: any;
};
