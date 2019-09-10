* 향후 ES6에서 다루는 class 키워드를 사용한 개념을 이야기 하는 것이 아니다
* 무엇을 클래스와 모듈이라 취급하는지 한번 알아본다.
* ES5 기준으로 설명된다.
* 클래스는 프로토타입 기반의 상속 메커니즘을 기반한다.  
* 클래스와 프로토타입
    * 두 객체가 같은 프로토타입 객체로부터 프로퍼티를 상속 받았을 때, 같은 클래스와 인스턴스로 취급한다.  
    * 동적으로 확장이 될 수 있다.
    * 팩터리 역활을 하는 함수를 이야기 하나 쓸 일은 없을 것 같다.
    * 대부분의 챕터에서 this keyword 의 역활을 확실히 알기를 권장한다. 이 챕터도 마찬가지..
* 클래스와 생성자
    * 생성자로 내부에 수행할 변수를 초기화, 생성하는 역활을 한다.
    * "(정의한 객체명).prototype" 프로퍼티를 통해 상속 시키고자 하는 코드를 작성한다.
        ```
        function Range(from, to){
            this.from = from;
            this.to = to;
        }
        Range.prototype = {
            include : function(){
                //something
            }
            // 배열처럼 상속시키고자 하는 함수를 위와 동일하게 작성해나간다.            
        }
        ```
    * new 키워드로 생성자 함수를 호출하며 일반 함수와 차이점은 대문자로 시작해준다가 관례이나 누가 지킬까 싶기도 하다.
    * 썩 와닿지가 않는다.
* 생성자와 클래스 구별
    * 프로토타입 객체는 클래스를 구별할떄 핵심적인 역활을 한다고 써있다. 같은 프로토타입 객체를 상속한 경우에만 같은 클래스의 인스턴스라고 알아두면 된다.
    * instanceof 는 생성자에 의해서 초기화된건지 검증하지 않고 [프로토타입을 상속하는가 검증]하는 키워드 이다.
    * 별도로 이 연산자에 대해서 공부할 가치가 있어보이긴 한다.
* constructor 프로퍼티
    * prototype 프로퍼티가 있어야지만 모든 함수는 생성자가 될 수 있다. 그래서 자동으로 설정이 된다.
    * ES5 에서는 Function.bind() 메서드가 반환하는 함수는 자동으로 설정되지 않는다.
    * 자동으로 설정되는 prototype property 의 값은 constructor property 하나만 가진 객체이다.   
    이 constructor property 는 열거되지 않고 값으로 해당 함수 객체를 가진다.
    * 참 설명이.. 알아먹기 힘들다.
         ```
         var someFunction = function() {};
         var protoTypeInSomeFunction = someFunction.prototype;
         var constructorInProtoTypeInSomeFunction = protoTypeInSomeFunction.constructor;
         console.log(someFunction == constructorInProtoTypeInSomeFunction) // true
         ```
    * 어떤 객체에 프로토타입 객체에 constructor property 가 있다는 것은   
      이 객체의 생성자를 가르키는 constructor property 역시 상속함을 뜻한다.   
      이 사실을 통해서 constructor 를 통하여 클래스를 구별하거나 객체의 클래스를 얻어낼 수 있다는 사실을 알 수 있다.
    * 별도로 정의하는 프로토타입 객체에는 constructor 가 자동으로 생기진 않는다. 이럴경우 명시적으로 설정하여 해결이 가능한다.
        ```
        Range.prototype = {
            constructor : Range, //이런 식으로 명시적으로 역참조를 위해 설정할 수 있다.
            //etc...
        }
        ``` 
      * 혹은 이럴 필요가 없이 미리 정의된 프로토타입 객체를 확장해 나가는 식으로 진행하는 것도 하나의 방법이다.
          ```
          Range.prototype.etc1 = function(){ //something }
          Range.prototype.etc2 = function(){ //something }
          Range.prototype.etc3 = function(){ //something }
          ```  
* 자바 스타일 클래스
    * 궁금했던 정보이기는 하다. 뭔 차이가 있는지 알아보려고 한다.
    * (내일은 여기부터)         