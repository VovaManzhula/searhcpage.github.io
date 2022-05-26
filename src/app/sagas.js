import { takeEvery, put ,all} from "redux-saga/effects";

async function getData(action = { page: 1 }) {
  const params = new URLSearchParams([
    ["_page", action.page],
    ["q", action.q],
    ["_limit", action.limit]
  ]);
  if (!action.q) {
    params.delete("q");
  }
  if (!action.limit) {
    params.delete("_limit");
  }
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${params}`
  );
  const data = await request.json();
  return data;
}

function* setData(params) {
  const data = yield getData(params.payload);
  yield put({ type: "SET_DATA", payload: data });
}

export function* setDataForSearch(params = {}) {
  const dataForSearch = yield getData(params.payload);

  yield put({ type: "SET_DATA_FOR_SEARCH", payload: dataForSearch });
}
export function* changePage() {
  yield takeEvery("PAGE", setData);
}
export function* changeInput() {
  yield takeEvery("FILTER+", setDataForSearch);
}

export default function* rootSaga() {
  yield all([changeInput(),  changePage()]);
}
