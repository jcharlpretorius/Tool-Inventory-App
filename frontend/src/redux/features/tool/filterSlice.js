import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredTools: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_TOOLS(state, action) {
      // Search tools by name or tool type
      const { tools, search } = action.payload;
      const tempTools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(search.toLowerCase()) ||
          tool.toolType.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredTools = tempTools;
    },
  },
});

export const { FILTER_TOOLS } = filterSlice.actions;
export const selectFilderedTools = (state) => state.filter.filteredTools;

export default filterSlice.reducer;
