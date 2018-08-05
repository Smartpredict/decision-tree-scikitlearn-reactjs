//import { ADD_ARTICLE } from "../constants/action-types";
import { UPDATE_COLUMNS } from "../constants/action-types";
import { UPDATE_IN_COLUMNS } from "../constants/action-types";


// export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const updateColumns = columns => ({ type: UPDATE_COLUMNS, columns: columns });
export const updateInColumns = inColumns => ({ type: UPDATE_IN_COLUMNS, inColumns: inColumns });