import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

function getPostAPI(postId) {
	console.log(`https://jsonplaceholder.typicode.com/posts/${postId}`)
	return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}


const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);


export const getPost = (postId) => dispatch => {
	console.log("getPost: " + postId);
	dispatch(getPostPending());

	return getPostAPI(postId).then((response) => {
		console.log(response);
		dispatch(getPostSuccess(response));
		return response;
	}).catch(error => {
		dispatch(getPostFailure(error));
		throw(error);
	});
};

const initialState = {
    pending: false,
	error: false,
	data:  {
    	title: '',
		body: ''
	}
};

export default handleActions({
	[GET_POST_PENDING]: (state, action) => {
		return {
			...state,
			pending: true,
			error: false
		};
	},
	[GET_POST_SUCCESS]: (state, action) => {
		const {title, body} = action.payload.data;
		console.log(title, body);

		return {
			...state,
			pending: false,
			data: {
				title,
				body
			}
		};
	},
	[GET_POST_FAILURE]: (state, action) => {
		return {
			...state,
			pending: false,
			error: true
		};
	}
}, initialState)