* this binding
    * 함수의 호출방식에 의해서 해당 호출 시점에 어떤 객체를 this 에 바인딩할지 결정하는 것을 의미한다.
    * 함수의 호출방식은 다음과 같다.
        * 함수(Function) 호출
        * 메소드(Method) 호출
        * 생성자 함수
        * Function property 의 apply, call, bind 사용
        > 함수와 메서드의 차이?
        > 함수와 메서드의 차이는 특정 객체에 종속적이냐 아니냐에 따라서 갈린다.
        > 한마디로 보는 관점에서의 차이.
* 함수 호출
    * 사실 함수 호출도 따지고보면 메서드 호출이다.
    * 함수는 전역객체의 프로퍼티로 접근할 수 있기 때문이다.
    * 기본적으로 this 는 전역 객체에 바인딩 된다. (Browser : window, Node.js : Global)
    * inner function 및 callback function 는 외부 함수를 바라보지 않으며, 전역 객체에 바인딩 된다.
    ```
        var globalVar = 'something';
        
        console.log(globalVar);
        console.log(window.ga);
        
        function foo(){
            console.log('invoke');
            function inFoo(){
                console.log(this);      //window
            }
        }
        
        window.foo();
    ```
    * 결론적으로는 함수 자체가 별도의 처리가 없으면 항상 this binding 은 전역객체를 바인딩 한다. [왜 그런가?](https://github.com/GodChiken/StudyES5/blame/master/src/main/resources/markdown/context/executionContext.md#L117-L122)
    * 그렇다면 어떤 함수이건 간에 호출시점에서 다른 객체에 Binding 된 this 를 활용하는 방법은 무엇이 있을까? [왜지?](https://github.com/GodChiken/StudyES5/blame/master/src/main/resources/markdown/function/function.md#L32-L35)
    * 위의 링크와 다른 예제로 this 를 명시적으로 바인딩 하는 apply, call, bind 등을 활용하는것도 하나의 방법이다.
    
             