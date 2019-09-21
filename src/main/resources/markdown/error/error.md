* 에러 처리
    * try-catch-finally
        * 자바에서 처리하는 방식과 동일하여 별도의 상세한 정리는 하지 않는다.
        * catch 절에서 error 에 관련된 객체를 전달 받을 수 있다.
    * 에러 타입
        * 모든 에러는 Error 타입을 상속하여 같은 프로퍼티를 공유한다.
        * 에러 종류
            * Error : 최상위 Error 이며, 커스텀 에러를 만드는데 사용된다.
            * EvalError : eval() 함수를 호출 이외의 용도로 사용시 에러.
                > eval()은 문자열을 코드로 인식하게 하는 함수이다. 
            * RangeError : 특정 객체의 범위가 벗어나는 인덱스를 참조 시 발생.
            * ReferenceError : 참조가 불가능 할 때 발생되는 에러.
            * SyntaxError : 문법 에러.
            * TypeError : 타입에 관련된 에러.
            * URIError : encodeURI(), decodeURI()에 옳지 않은 경로를 넘길 시 에러.
    *                    
* 코드 디버그