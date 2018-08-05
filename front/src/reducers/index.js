// import { ADD_ARTICLE } from "../constants/action-types";
import { UPDATE_COLUMNS } from "../constants/action-types";
import { UPDATE_IN_COLUMNS } from "../constants/action-types";

const initialState = {
	columns: [],
	columnsIn: []
};

const rootReducer = (state = initialState, action) => {
	switch(action.type) {
		//case ADD_ARTICLE:
		//	return { ...state, articles: [...state.articles, action.payload] };
		case UPDATE_COLUMNS:
			return {...state, columns: action.columns}
		case UPDATE_IN_COLUMNS:
			return {...state, columnsIn: action.inColumns}
		default:
			return state;
	}
};

export default rootReducer;