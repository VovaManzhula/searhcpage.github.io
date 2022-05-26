import { useDispatch } from "react-redux";



function Post({ el }) {

  const dispatch = useDispatch();
 
  return (
    <div className="Post card" onClick={() => dispatch({ type: "HIDE_MATHCES", payload: [] })} >  
    <div className="Post card-body">
      <div className="Post">{el.id}</div>
  <div className="Post card-title">{el.title}</div>
  <div className="Post card-text">{el.body}</div>
    </div>
    </div>
  );
}

export default Post;
