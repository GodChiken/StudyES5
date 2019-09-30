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
* 메소드 호출
    * 함수가 객체의 프로퍼티 값이면 메소드로서 호출된다. 이때 메소드 내부의 this 는 해당 메소드를 소유한 객체, 즉 해당 메소드를 호출한 객체에 바인딩된다.
    * 프로토타입 객체도 메소드를 가질 수 있다. 프로토타입 객체 메소드 내부에서 사용된 this 도 일반 메소드 방식과 마찬가지로 해당 메소드를 호출한 객체에 바인딩된다.
    ```
        function Person(name) {
          this.name = name;
        }
        
        Person.prototype.getName = function() {
          return this.name;
        }
        
        var me = new Person('Lee');
        console.log(me.getName());
        
        Person.prototype.name = 'Kim';
        console.log(Person.prototype.getName());    
    ```
* 생성자 함수 호출
    * 뭐라고 선언하든지 간에 기존 함수 new 키워드를 붙여 호출하면 생성자 함수가 된다.
    * 규제가 되있는건 아니나 보통 생성자 함수는 첫 글자는 대문자로 수행한다.
    * 생성자 함수의 작동 방식
        1.  빈 객체 생성 및 this binding
            * 생성자 함수의 코드가 실행되기 전에 빈 객체가 생성된다. 
            * 이 빈 객체가 생성자 함수를 새로 생성하는 객체라고 하며 this 키워드는 이 객체를 binding 한다.
            * 생성된 빈 객체는 생성자 함수의 prototype property 가 가르키는 객체를 자신의 프로토타입 객체로 설정한다.
        2. this 를 통한 프로퍼티 생성
            * 생성된 빈 객체에 this 를 활용하여 동적으로 프로퍼티나 메서드를 생성이 가능하다. this 는 새로 생성된 객체를 가르키므로 this 를 통해 생성한 프로퍼티,메서드는 새로 생성된 객체에 추가된다. 
        3. 생성된 객체 반환
            * 반환문이 없는 경우
                * this 에 binding 되어있는 가장 최근에 생성된 객체가 반환된다.
                    > 명시적으로 return this; 를 하여도 마찬가지다.                
            * 반환문이 있는경우
                * 명시적인 this 반환 외의 다른 객체를 반환하는 경우 해당 객체를 반환한다.
                * 또한 생성자 함수로서 역활 수행이 불가하다.
    * 객체 리터럴 vs 생성자 함수
        * 객체 리터럴 방식과 생성자 함수 방식의 차이는 프로토타입 객체(\[\[Prototype\]\])에 있다.
            * 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype 이다.
            * 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 Person.prototype 이다.
        ```
            // 객체 리터럴 방식
            var foo = {
              name: 'foo',
              gender: 'male'
            }
            
            console.dir(foo);
            
            // 생성자 함수 방식
            function Person(name, gender) {
              this.name = name;
              this.gender = gender;
            }
            
            var me  = new Person('Lee', 'male');
            console.dir(me);
            
            var you = new Person('Kim', 'female');
            console.dir(you);        
        ```            
* 생성자 함수에 new 키워드를 붙이지 않을 경우
* apply, call, bind 호출     
                  