

const loggerMiddleware = store => next => action =>  {
	console.log(store.dispatch)
	/*미들 웨어 내용*/
	//현재 스토어 상태값 기록
	console.log('현재상태', store.getState());
	//액션 기록
	console.log('액션', action);

	//액션을 다음 미들웨어 또는 리듀서로 넘김
	const result = next(action);
	console.log(next);
	console.log(result);

	//액션 처리 후의 스토어 상태를 기록
	console.log('다음상태', store.getState());
	console.log('\n');
	return result;
};


export default loggerMiddleware;