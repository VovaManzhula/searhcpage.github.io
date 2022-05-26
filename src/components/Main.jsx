import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Post from "./Post";
function Main() {
  const data = useSelector((state) => state.posts);
  let matches = useSelector((state) => state.matches);
  let match = useSelector((state) => state.match);
  let dataForSearch = useSelector((state) => state.searchPosts);
  let modalData = useSelector((state) => state.modal);
  let pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dispatch = useDispatch();
  function onChangeHandler(text) {
    dispatch({ type: "FILTER+", payload: text });

    if (text.length > 0) {
      matches = dataForSearch.filter((post) => {
        const regex = new RegExp(`${text}`, "gi");

        return post.title.match(regex);
      });
    }
    dispatch({ type: "FILTER", payload: matches, q: text });
  }
  function onSuggestHandler(text) {
    dispatch({ type: "COMPLETE", payload: { text, matches: [] } });
  }

  function openModal(match) {
    dispatch({ type: "OPEN_MODAL", payload: match });
  }

  return (
    <div className=" container-fluid">
      <h2 className="text-center">Post list</h2>

      <form className="container">
        <div className="form-group">
          <input
            value={match}
            className="form-control"
            onChange={(e) => onChangeHandler(e.target.value)}
          ></input>
          <div className="result">
            {matches &&
              matches.map((match, i) => (
                <div
                  className="acompl"
                  key={i}
                  onClick={() => {
                    openModal(match);
                    onSuggestHandler(match.title);
                  }}
                >
                  <div className="card">
                    <div className="card-title">{match.title}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </form>

      {modalData.map((match) => (
        <div className="modalH" onClick={()=>dispatch({type:"HIDE_MODAL",payload:[]})} key="1715751757175">
          <div className=" card ">{match.id}
            <div className="card-title">{match.title}</div>
            <div className="card-body">{match.body}</div>
          </div>
        </div>
      ))}

      <div className="Main container">
        {data.map((el) => (
          <Post el={el} key={el.id} />
        ))}
      </div>
      <nav className="container">
        <div className="pagination">
          {pages.map((page) => {
            return (
              <button
                className="page-item"
                onClick={() =>
                  dispatch({ type:"PAGE", payload: { page: page, limit: 10 } })
                }
                key={page}
              >
                {page}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Main;
