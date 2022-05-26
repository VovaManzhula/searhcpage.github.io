const initial = {
  posts: [],
  searchPosts:[],
  currentPage:1,
  perPage:10,
  totalCount:10,
  matches:[],
  match:[],
 modal:[]
};



export default function reducer(state = initial, action) {
  switch (action.type) {
    case "SET_DATA": {
      return {
        ...state,
        posts: [...action.payload]
      }
    }
    case "SET_DATA_FOR_SEARCH": {
      return {
        ...state,
        searchPosts:[...action.payload],
        posts: [...action.payload]
      }
    }
    case "OPEN_MODAL":{
return {
  ...state,
  modal:[action.payload]
}
    }
   
    case "HIDE_MODAL":{
      return{
        ...state,
        modal:action.payload
      }
    }

     case  "COMPLETE":{
               
        return{
          ...state,
          match:action.payload.text,
          matches:[...action.payload.matches],
          matchShow:[...action.payload.text]

        }
      }
      case "HIDE_MATHCES":{
        return{
          ...state,
          matches:action.payload,
          match:action.payload
        }
      }
      case "FILTER":{
        return{
          ...state,
          matches:[...action.payload],
          match:action.payload.q
        }
      }
    default:
      return state;
  }
}


