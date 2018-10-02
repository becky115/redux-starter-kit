import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
//import { pender, applyPenders } from 'redux-pender';
import axios from 'axios';

function getPostAPI(postId) {
	console.log(`https://jsonplaceholder.typicode.com/posts/${postId}`)
	return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';

export const getPost = createAction(GET_POST, getPostAPI);


const initialState = {
	data:  {
    	title: '',
		body: ''
	}
};

const reducer = handleActions({
	//다른 일반 액션들을 관리
}, initialState);

export default applyPenders(reducer, [
	{
		type: GET_POST,
		onSuccess: (state, action) => {
			const {title, body} = action.payload.data;
			return {
				data: {
					title,
					body
				}
			}
		},
		onCancel: (state, action) => {
			return {
				data: {
					title: '취소됨',
					body: '취소됨'
				}
			}
		}
	}
	/**
	 * 다른 pender액션들
	{type: GET_SOMETHING, onSuccess: (state, action) =>  ...},
	{type: GET_SOMETHING, onSuccess: (state, action) =>  ...}
	 */
])

/*
export default handleActions({
	...pender({
		type: GET_POST,
		//추가 작업 필요시
		// onPending: (state, action) => state,
		// onFailure: (state, action) => state
		onSuccess: (state, action) => {
			const {title, body} = action.payload.data;
			return {
				data: {
					title,
					body
				}
			}
		}
	})
}, initialState);
*/