/**
 * 이런 류로 감싸서 겹치게 안한 경우는 많이들 봤을것이나
 * 혹은 즉시실행함수를 알지 못해서 function, function... 이렇게 생성했을 수 있다.
 */

// 즉시실행함수의 기본 구조
(function () {
    // 코드 1
    // 코드 2
    // ....
}());

/*
 * 그런데 이게 왜? 즉시실행 함수인가? 다음 코드를 보면 알 수 있을거라 생각한다.
 * foo(); <<<=======>>> (function(){})();
 * 위 코드에서 '(function(){})' 를 'foo' 와 같은 것이라고 생각해보면 결론이 나올 것 같다.
 * 다 좋다 즉시실행함수를 하면 전역변수를 안만드는건 알겠다. 그래서 어떻게 활용하냐?
 * 그래서 모듈 패턴이 나온 것 같고, 여태까지 일하면서 가장 많이 쓰기도 했다.
 * 그래서 코드를 보자.
*/

//step - 1
(function(){})();

//step - 2
(function () {
    return null;
})();

//step - 3
(function () {
    return {
        asdf : "asdf"
    }
})();

//step - 4
//내부 변수에 뭘 붙이든 그건 취향것 하도록하자.
(function () {
    var $verify = function(){
        return "검증했다."
    }
    return {
        verify : $verify
    }
})();

//step - 5
var myModule = (function () {
    var $verify = function(){
        return "검증했다."
    }
    return {
        verify : $verify
    }
})(/*여기에 인자값을 넣어 활용할 수 있다.*/);