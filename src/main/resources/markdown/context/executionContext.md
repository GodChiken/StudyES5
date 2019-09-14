* 실행 컨텍스트(Execution Context)
    * 자바스크립트의 동작원리를 담고 있는 핵심원리이다.
    * 실행 코드가 수행될 수 있도 구성된 환경을 의미한다.
* 실행 코드
    * 다음 세 종류로 나뉘어 진다.
        * 글로벌 코드 : 코드 전역에서 수행되는 코드
        * eval 코드 : eval 함수로 수행되는 코드
        * function 코드 : 함수 내에 존재하는 코드
    * 이와 같이 실행에 필요한 정보를 형상화하고 구분하기 위해 자바스크립트 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다.     
    * 자바스크립트 엔진이 코드를 실행하려면 다음과 같은 정보를 실행 컨텍스트에서 물리적인 객체 형태로 관리가 되어야한다.    
        * 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
        * 함수 선언
        * 변수의 유효범위(Scope)
        * this
    * 물리적인 형태는 크게 다음과 같다.
        * Value Object  : 변수, 함수 선언문, 아규먼트
        * Scope Chain   : Variable Object 와 모든 부모의 스코프
        * this          : 컨텍스트 오브젝트
* 실행 컨텍스트의 생성과정
* 전역 코드의 실행
* 함수 코드의 실행    

10.1.1 Strict Mode Code # Ⓣ Ⓓ


10.2 Lexical Environments # Ⓣ Ⓓ
A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment. Usually a Lexical Environment is associated with some specific syntactic structure of ECMAScript code such as a FunctionDeclaration, a WithStatement, or a Catch clause of a TryStatement and a new Lexical Environment is created each time such code is evaluated.
An Environment Record records the identifier bindings that are created within the scope of its associated Lexical Environment.
The outer environment reference is used to model the logical nesting of Lexical Environment values. The outer reference of a (inner) Lexical Environment is a reference to the Lexical Environment that logically surrounds the inner Lexical Environment. An outer Lexical Environment may, of course, have its own outer Lexical Environment. A Lexical Environment may serve as the outer environment for multiple inner Lexical Environments. For example, if a FunctionDeclaration contains two nested FunctionDeclarations then the Lexical Environments of each of the nested functions will have as their outer Lexical Environment the Lexical Environment of the current execution of the surrounding function.
Lexical Environments and Environment Record values are purely specification mechanisms and need not correspond to any specific artefact of an ECMAScript implementation. It is impossible for an ECMAScript program to directly access or manipulate such values.

10.2.1 Environment Records # Ⓣ 
There are two kinds of Environment Record values used in this specification: declarative environment records and object environment records. Declarative environment records are used to define the effect of ECMAScript language syntactic elements such as FunctionDeclarations, VariableDeclarations, and Catch clauses that directly associate identifier bindings with ECMAScript language values. Object environment records are used to define the effect of ECMAScript elements such as Program and WithStatement that associate identifier bindings with the properties of some object.
For specification purposes Environment Record values can be thought of as existing in a simple object-oriented hierarchy where Environment Record is an abstract class with two concrete subclasses, declarative environment record and object environment record. The abstract class includes the abstract specification methods defined in Table 17. These abstract methods have distinct concrete algorithms for each of the concrete subclasses.

Table 17 — Abstract Methods of Environment Records
Method
Purpose
HasBinding(N)
Determine if an environment record has a binding for an identifier. Return true if it does and false if it does not. The String value N is the text of the identifier.
CreateMutableBinding(N, D)
Create a new mutable binding in an environment record. The String value N is the text of the bound name. If the optional Boolean argument D is true the binding is may be subsequently deleted.
SetMutableBinding(N,V, S)
Set the value of an already existing mutable binding in an environment record. The String value N is the text of the bound name. V is the value for the binding and may be a value of any ECMAScript language type. S is a Boolean flag. If S is true and the binding cannot be set throw a TypeError exception. S is used to identify strict mode references.
GetBindingValue(N,S)
Returns the value of an already existing binding from an environment record. The String value N is the text of the bound name. S is used to identify strict mode references. If S is true and the binding does not exist or is uninitialized throw a ReferenceError exception.
DeleteBinding(N)
Delete a binding from an environment record. The String value N is the text of the bound name If a binding for N exists, remove the binding and return true. If the binding exists but cannot be removed return false. If the binding does not exist return true.
ImplicitThisValue()
Returns the value to use as the this value on calls to function objects that are obtained as binding values from this environment record.

10.2.1.1 Declarative Environment Records # Ⓣ 
Each declarative environment record is associated with an ECMAScript program scope containing variable and/or function declarations. A declarative environment record binds the set of identifiers defined by the declarations contained within its scope.
In addition to the mutable bindings supported by all Environment Records, declarative environment records also provide for immutable bindings. An immutable binding is one where the association between an identifier and a value may not be modified once it has been established. Creation and initialization of immutable binding are distinct steps so it is possible for such bindings to exist in either an initialized or uninitialized state. Declarative environment records support the methods listed in Table 18 in addition to the Environment Record abstract specification methods:

Table 18 — Additional Methods of Declarative Environment Records
Method
Purpose
CreateImmutableBinding(N)
Create a new but uninitialized immutable binding in an environment record. The String value N is the text of the bound name.
InitializeImmutableBinding(N,V)
Set the value of an already existing but uninitialized immutable binding in an environment record. The String value N is the text of the bound name. V is the value for the binding and is a value of any ECMAScript language type.
The behaviour of the concrete specification methods for Declarative Environment Records are defined by the following algorithms.

10.2.1.1.1 HasBinding(N) # Ⓣ 
The concrete environment record method HasBinding for declarative environment records simply determines if the argument identifier is one of the identifiers bound by the record:
Let envRec be the declarative environment record for which the method was invoked.
If envRec has a binding for the name that is the value of N, return true.
If it does not have such a binding, return false

10.2.1.1.2 CreateMutableBinding (N, D) # Ⓣ 
The concrete Environment Record method CreateMutableBinding for declarative environment records creates a new mutable binding for the name N that is initialized to the value undefined. A binding must not already exist in this Environment Record for N. If Boolean argument D is provided and has the value true the new binding is marked as being subject to deletion.
Let envRec be the declarative environment record for which the method was invoked.
Assert: envRec does not already have a binding for N.
Create a mutable binding in envRec for N and set its bound value to undefined. If D is true record that the newly created binding may be deleted by a subsequent DeleteBinding call.

10.2.1.1.3 SetMutableBinding (N,V,S) # Ⓣ Ⓔ Ⓑ
The concrete Environment Record method SetMutableBinding for declarative environment records attempts to change the bound value of the current binding of the identifier whose name is the value of the argument N to the value of argument V. A binding for N must already exist. If the binding is an immutable binding, a TypeError is thrown if S is true.
Let envRec be the declarative environment record for which the method was invoked.
Assert: envRec must have a binding for N.
If the binding for N in envRec is a mutable binding, change its bound value to V.
Else this must be an attempt to change the value of an immutable binding so if S is true throw a TypeError exception.

10.2.1.1.4 GetBindingValue(N,S) # Ⓣ 
The concrete Environment Record method GetBindingValue for declarative environment records simply returns the value of its bound identifier whose name is the value of the argument N. The binding must already exist. If S is true and the binding is an uninitialized immutable binding throw a ReferenceError exception.
Let envRec be the declarative environment record for which the method was invoked.
Assert: envRec has a binding for N.
If the binding for N in envRec is an uninitialized immutable binding, then
If S is false, return the value undefined, otherwise throw a ReferenceError exception.
Else, return the value currently bound to N in envRec.

10.2.1.1.5 DeleteBinding (N) # Ⓣ 
The concrete Environment Record method DeleteBinding for declarative environment records can only delete bindings that have been explicitly designated as being subject to deletion.
Let envRec be the declarative environment record for which the method was invoked.
If envRec does not have a binding for the name that is the value of N, return true.
If the binding for N in envRec is cannot be deleted, return false.
Remove the binding for N from envRec.
Return true.

10.2.1.1.6 ImplicitThisValue() # Ⓣ 
Declarative Environment Records always return undefined as their ImplicitThisValue.
Return undefined.

10.2.1.1.7 CreateImmutableBinding (N) # Ⓣ 
The concrete Environment Record method CreateImmutableBinding for declarative environment records creates a new immutable binding for the name N that is initialized to the value undefined. A binding must not already exist in this environment record for N.
Let envRec be the declarative environment record for which the method was invoked.
Assert: envRec does not already have a binding for N.
Create an immutable binding in envRec for N and record that it is uninitialized.

10.2.1.1.8 InitializeImmutableBinding (N,V) # Ⓣ 
The concrete Environment Record method InitializeImmutableBinding for declarative environment records is used to set the bound value of the current binding of the identifier whose name is the value of the argument N to the value of argument V. An uninitialized immutable binding for N must already exist.
Let envRec be the declarative environment record for which the method was invoked.
Assert: envRec must have an uninitialized immutable binding for N.
Set the bound value for N in envRec to V.
Record that the immutable binding for N in envRec has been initialized.

10.2.1.2 Object Environment Records # Ⓣ 
Each object environment record is associated with an object called its binding object. An object environment record binds the set of identifier names that directly correspond to the property names of its binding object. Property names that are not an IdentifierName are not included in the set of bound identifiers. Both own and inherited properties are included in the set regardless of the setting of their [[Enumerable]] attribute. Because properties can be dynamically added and deleted from objects, the set of identifiers bound by an object environment record may potentially change as a side-effect of any operation that adds or deletes properties. Any bindings that are created as a result of such a side-effect are considered to be a mutable binding even if the Writable attribute of the corresponding property has the value false. Immutable bindings do not exist for object environment records.
Object environment records can be configured to provide their binding object as an implicit this value for use in function calls. This capability is used to specify the behaviour of With Statement (12.10) induced bindings. The capability is controlled by a provideThis Boolean value that is associated with each object environment record. By default, the value of provideThis is false for any object environment record.
The behaviour of the concrete specification methods for Object Environment Records is defined by the following algorithms.

10.2.1.2.1 HasBinding(N) # Ⓣ 
The concrete Environment Record method HasBinding for object environment records determines if its associated binding object has a property whose name is the value of the argument N:
Let envRec be the object environment record for which the method was invoked.
Let bindings be the binding object for envRec.
Return the result of calling the [[HasProperty]] internal method of bindings, passing N as the property name.

10.2.1.2.2 CreateMutableBinding (N, D) # Ⓣ Ⓔ 
The concrete Environment Record method CreateMutableBinding for object environment records creates in an environment record’s associated binding object a property whose name is the String value and initializes it to the value undefined. A property named N must not already exist in the binding object. If Boolean argument D is provided and has the value true the new property’s [[Configurable]] attribute is set to true, otherwise it is set to false.
Let envRec be the object environment record for which the method was invoked.
Let bindings be the binding object for envRec.
Assert: The result of calling the [[HasProperty]] internal method of bindings, passing N as the property name, is false.
If D is true then let configValue be true otherwise let configValue be false.
Call the [[DefineOwnProperty]] internal method of bindings, passing N, Property Descriptor {[[Value]]:undefined, [[Writable]]: true, [[Enumerable]]: true , [[Configurable]]: configValue}, and true as arguments.

10.2.1.2.3 SetMutableBinding (N,V,S) # Ⓣ 
The concrete Environment Record method SetMutableBinding for object environment records attempts to set the value of the environment record’s associated binding object’s property whose name is the value of the argument N to the value of argument V. A property named N should already exist but if it does not or is not currently writable, error handling is determined by the value of the Boolean argument S.
Let envRec be the object environment record for which the method was invoked.
Let bindings be the binding object for envRec.
Call the [[Put]] internal method of bindings with arguments N, V, and S.

10.2.1.2.4 GetBindingValue(N,S) # Ⓣ 
The concrete Environment Record method GetBindingValue for object environment records returns the value of its associated binding object’s property whose name is the String value of the argument identifier N. The property should already exist but if it does not the result depends upon the value of the S argument:
Let envRec be the object environment record for which the method was invoked.
Let bindings be the binding object for envRec.
Let value be the result of calling the [[HasProperty]] internal method of bindings, passing N as the property name.
If value is false, then
If S is false, return the value undefined, otherwise throw a ReferenceError exception.
Return the result of calling the [[Get]] internal method of bindings, passing N for the argument.

10.2.1.2.5 DeleteBinding (N) # Ⓣ 
The concrete Environment Record method DeleteBinding for object environment records can only delete bindings that correspond to properties of the environment object whose [[Configurable]] attribute have the value true.
Let envRec be the object environment record for which the method was invoked.
Let bindings be the binding object for envRec.
Return the result of calling the [[Delete]] internal method of bindings, passing N and false as arguments.

10.2.1.2.6 ImplicitThisValue() # Ⓣ 
Object Environment Records return undefined as their ImplicitThisValue unless their provideThis flag is true.
Let envRec be the object environment record for which the method was invoked.
If the provideThis flag of envRec is true, return the binding object for envRec.
Otherwise, return undefined.

10.2.2 Lexical Environment Operations # Ⓣ 
The following abstract operations are used in this specification to operate upon lexical environments:

10.2.2.1 GetIdentifierReference (lex, name, strict) # Ⓣ 
The abstract operation GetIdentifierReference is called with a Lexical Environment lex, an identifier String name, and a Boolean flag strict. The value of lex may be null. When called, the following steps are performed:
If lex is the value null, then
Return a value of type Reference whose base value is undefined, whose referenced name is name, and whose strict mode flag is strict.
Let envRec be lex’s environment record.
Let exists be the result of calling the HasBinding(N) concrete method of envRec passing name as the argument N.
If exists is true, then
Return a value of type Reference whose base value is envRec, whose referenced name is name, and whose strict mode flag is strict.
Else
Let outer be the value of lex’s outer environment reference.
Return the result of calling GetIdentifierReference passing outer, name, and strict as arguments.

10.2.2.2 NewDeclarativeEnvironment (E) # Ⓣ 
When the abstract operation NewDeclarativeEnvironment is called with either a Lexical Environment or null as argument E the following steps are performed:
Let env be a new Lexical Environment.
Let envRec be a new declarative environment record containing no bindings.
Set env’s environment record to be envRec.
Set the outer lexical environment reference of env to E.
Return env.

10.2.2.3 NewObjectEnvironment (O, E) # Ⓣ 
When the abstract operation NewObjectEnvironmentis called with an Object O and a Lexical Environment E (or null) as arguments, the following steps are performed:
Let env be a new Lexical Environment.
Let envRec be a new object environment record containing O as the binding object.
Set env’s environment record to be envRec.
Set the outer lexical environment reference of env to E.
Return env.

10.2.3 The Global Environment # Ⓣ 
The global environment is a unique Lexical Environment which is created before any ECMAScript code is executed. The global environment’s Environment Record is an object environment record whose binding object is the global object (15.1). The global environment’s outer environment reference is null.
As ECMAScript code is executed, additional properties may be added to the global object and the initial properties may be modified.

10.3 Execution Contexts # Ⓣ 
When control is transferred to ECMAScript executable code, control is entering an execution context. Active execution contexts logically form a stack. The top execution context on this logical stack is the running execution context. A new execution context is created whenever control is transferred from the executable code associated with the currently running execution context to executable code that is not associated with that execution context. The newly created execution context is pushed onto the stack and becomes the running execution context.
An execution context contains whatever state is necessary to track the execution progress of its associated code. In addition, each execution context has the state components listed in Table 19.

Table 19 —Execution Context State Components
Component
Purpose
LexicalEnvironment
Identifies the Lexical Environment used to resolve identifier references made by code within this execution context.
VariableEnvironment
Identifies the Lexical Environment whose environment record holds bindings created by VariableStatements and FunctionDeclarations within this execution context.
ThisBinding
The value associated with the this keyword within ECMAScript code associated with this execution context.
The LexicalEnvironment and VariableEnvironment components of an execution context are always Lexical Environments. When an execution context is created its LexicalEnvironment and VariableEnvironment components initially have the same value. The value of the VariableEnvironment component never changes while the value of the LexicalEnvironment component may change during execution of code within an execution context.
In most situations only the running execution context (the top of the execution context stack) is directly manipulated by algorithms within this specification. Hence when the terms “LexicalEnvironment”, “VariableEnvironment” and “ThisBinding” are used without qualification they are in reference to those components of the running execution context.
An execution context is purely a specification mechanism and need not correspond to any particular artefact of an ECMAScript implementation. It is impossible for an ECMAScript program to access an execution context.

10.3.1 Identifier Resolution # Ⓣ 
Identifier resolution is the process of determining the binding of an Identifier using the LexicalEnvironment of the running execution context. During execution of ECMAScript code, the syntactic production PrimaryExpression : Identifier is evaluated using the following algorithm:
Let env be the running execution context’s LexicalEnvironment.
If the syntactic production that is being evaluated is contained in a strict mode code, then let strict be true, else let strict be false.
Return the result of calling GetIdentifierReference function passing env, Identifier, and strict as arguments.
The result of evaluating an identifier is always a value of type Reference with its referenced name component equal to the Identifier String.

10.4 Establishing an Execution Context # Ⓣ 
Evaluation of global code or code using the eval function (15.1.2.1) establishes and enters a new execution context. Every invocation of an ECMAScript code function (13.2.1) also establishes and enters a new execution context, even if a function is calling itself recursively. Every return exits an execution context. A thrown exception may also exit one or more execution contexts.
When control enters an execution context, the execution context’s ThisBinding is set, its VariableEnvironment and initial LexicalEnvironment are defined, and declaration binding instantiation (10.5) is performed. The exact manner in which these actions occur depend on the type of code being entered.

10.4.1 Entering Global Code # Ⓣ 
The following steps are performed when control enters the execution context for global code:
Initialize the execution context using the global code as described in 10.4.1.1.
Perform Declaration Binding Instantiation as described in 10.5 using the global code.

10.4.1.1 Initial Global Execution Context # Ⓣ Ⓐ
The following steps are performed to initialize a global execution context for ECMAScript code C:
Set the VariableEnvironment to the Global Environment.
Set the LexicalEnvironment to the Global Environment.
Set the ThisBinding to the global object.

10.4.2 Entering Eval Code # Ⓣ 
The following steps are performed when control enters the execution context for eval code:
If there is no calling context or if the eval code is not being evaluated by a direct call (15.1.2.1.1) to the eval function then,
Initialize the execution context as if it was a global execution context using the eval code as C as described in 10.4.1.1.
Else,
Set the ThisBinding to the same value as the ThisBinding of the calling execution context.
Set the LexicalEnvironment to the same value as the LexicalEnvironment of the calling execution context.
Set the VariableEnvironment to the same value as the VariableEnvironment of the calling execution context.
If the eval code is strict code, then
Let strictVarEnv be the result of calling NewDeclarativeEnvironment passing the LexicalEnvironment as the argument.
Set the LexicalEnvironment to strictVarEnv.
Set the VariableEnvironment to strictVarEnv.
Perform Declaration Binding Instantiation as described in 10.5 using the eval code.

10.4.2.1 Strict Mode Restrictions # Ⓣ 
The eval code cannot instantiate variable or function bindings in the variable environment of the calling context that invoked the eval if either the code of the calling context or the eval code is strict code. Instead such bindings are instantiated in a new VariableEnvironment that is only accessible to the eval code.

10.4.3 Entering Function Code # Ⓣ 
The following steps are performed when control enters the execution context for function code contained in function object F, a caller provided thisArg, and a caller provided argumentsList:
If the function code is strict code, set the ThisBinding to thisArg.
Else if thisArg is null or undefined, set the ThisBinding to the global object.
Else if Type(thisArg) is not Object, set the ThisBinding to ToObject(thisArg).
Else set the ThisBinding to thisArg.
Let localEnv be the result of calling NewDeclarativeEnvironment passing the value of the [[Scope]] internal property of F as the argument.
Set the LexicalEnvironment to localEnv.
Set the VariableEnvironment to localEnv.
Let code be the value of F’s [[Code]] internal property.
Perform Declaration Binding Instantiation using the function code code and argumentList as described in 10.5.

10.5 Declaration Binding Instantiation # Ⓣ Ⓔ Ⓐ Ⓑ
Every execution context has an associated VariableEnvironment. Variables and functions declared in ECMAScript code evaluated in an execution context are added as bindings in that VariableEnvironment’s Environment Record. For function code, parameters are also added as bindings to that Environment Record.
Which Environment Record is used to bind a declaration and its kind depends upon the type of ECMAScript code executed by the execution context, but the remainder of the behaviour is generic. On entering an execution context, bindings are created in the VariableEnvironment as follows using the caller provided code and, if it is function code, argument List args:
Let env be the environment record component of the running execution context’s VariableEnvironment.
If code is eval code, then let configurableBindings be true else let configurableBindings be false.
If code is strict mode code, then let strict be true else let strict be false.
If code is function code, then
Let func be the function whose [[Call]] internal method initiated execution of code. Let names be the value of func’s [[FormalParameters]] internal property.
Let argCount be the number of elements in args.
Let n be the number 0.
For each String argName in names, in list order do
Let n be the current value of n plus 1.
If n is greater than argCount, let v be undefined otherwise let v be the value of the n’th element of args.
Let argAlreadyDeclared be the result of calling env’s HasBinding concrete method passing argName as the argument.
If argAlreadyDeclared is false, call env’s CreateMutableBinding concrete method passing argName as the argument.
Call env’s SetMutableBinding concrete method passing argName, v, and strict as the arguments.
For each FunctionDeclaration f in code, in source text order do
Let fn be the Identifier in FunctionDeclaration f.
Let fo be the result of instantiating FunctionDeclaration f as described in Clause 13.
Let funcAlreadyDeclared be the result of calling env’s HasBinding concrete method passing fn as the argument.
If funcAlreadyDeclared is false, call env’s CreateMutableBinding concrete method passing fn and configurableBindings as the arguments.
Else if env is the environment record component of the global environment then
Let go be the global object.
Let existingProp be the resulting of calling the [[GetProperty]] internal method of go with argument fn.
If existingProp .[[Configurable]] is true, then
Call the [[DefineOwnProperty]] internal method of go, passing fn, Property Descriptor {[[Value]]: undefined, [[Writable]]: true, [[Enumerable]]: true , [[Configurable]]: configurableBindings }, and true as arguments.
Else if IsAccessorDescrptor(existingProp) or existingProp does not have attribute values {[[Writable]]: true, [[Enumerable]]: true}, then
Throw a TypeError exception.
Call env’s SetMutableBinding concrete method passing fn, fo, and strict as the arguments.
Let argumentsAlreadyDeclared be the result of calling env’s HasBinding concrete method passing "arguments" as the argument
If code is function code and argumentsAlreadyDeclared is false, then
Let argsObj be the result of calling the abstract operation CreateArgumentsObject (10.6) passing func, names, args, env and strict as arguments.
If strict is true, then
Call env’s CreateImmutableBinding concrete method passing the String "arguments" as the argument.
Call env’s InitializeImmutableBinding concrete method passing "arguments" and argsObj as arguments.
Else,
Call env’s CreateMutableBinding concrete method passing the String "arguments" as the argument.
Call env’s SetMutableBinding concrete method passing "arguments", argsObj, and false as arguments.
For each VariableDeclaration and VariableDeclarationNoIn d in code, in source text order do
Let dn be the Identifier in d.
Let varAlreadyDeclared be the result of calling env’s HasBinding concrete method passing dn as the argument.
If varAlreadyDeclared is false, then
Call env’s CreateMutableBinding concrete method passing dn and configurableBindings as the arguments.
Call env’s SetMutableBinding concrete method passing dn, undefined, and strict as the arguments.

10.6 Arguments Object # Ⓣ Ⓡ Ⓖ Ⓑ Ⓑ
When control enters an execution context for function code, an arguments object is created unless (as specified in 10.5) the identifier arguments occurs as an Identifier in the function’s FormalParameterList or occurs as the Identifier of a VariableDeclaration or FunctionDeclaration contained in the function code.
The arguments object is created by calling the abstract operation CreateArgumentsObject with arguments func the function object whose code is to be evaluated, names a List containing the function’s formal parameter names, args the actual arguments passed to the [[Call]] internal method, env the variable environment for the function code, and strict a Boolean that indicates whether or not the function code is strict code. When CreateArgumentsObject is called the following steps are performed:
Let len be the number of elements in args.
Let obj be the result of creating a new ECMAScript object.
Set all the internal methods of obj as specified in 8.12.
Set the [[Class]] internal property of obj to "Arguments".
Let Object be the standard built-in Object constructor (15.2.2).
Set the [[Prototype]] internal property of obj to the standard built-in Object prototype object (15.2.4).
Call the [[DefineOwnProperty]] internal method on obj passing "length", the Property Descriptor {[[Value]]: len, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}, and false as arguments.
Let map be the result of creating a new object as if by the expression new Object() where Object is the standard built-in constructor with that name
Let mappedNames be an empty List.
Let indx = len - 1.
Repeat while indx >= 0,
Let val be the element of args at 0-origined list position indx.
Call the [[DefineOwnProperty]] internal method on obj passing ToString(indx), the property descriptor {[[Value]]: val, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false as arguments.
If indx is less than the number of elements in names, then
Let name be the element of names at 0-origined list position indx.
If strict is false and name is not an element of mappedNames, then
Add name as an element of the list mappedNames.
Let g be the result of calling the MakeArgGetter abstract operation with arguments name and env.
Let p be the result of calling the MakeArgSetter abstract operation with arguments name and env.
Call the [[DefineOwnProperty]] internal method of map passing ToString(indx), the Property Descriptor {[[Set]]: p, [[Get]]: g, [[Configurable]]: true}, and false as arguments.
Let indx = indx - 1
If mappedNames is not empty, then
Set the [[ParameterMap]] internal property of obj to map.
Set the [[Get]], [[GetOwnProperty]], [[DefineOwnProperty]], and [[Delete]] internal methods of obj to the definitions provided below.
If strict is false, then
Call the [[DefineOwnProperty]] internal method on obj passing "callee", the property descriptor {[[Value]]: func, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}, and false as arguments.
Else, strict is true so
Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
Call the [[DefineOwnProperty]] internal method of obj with arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false}, and false.
Call the [[DefineOwnProperty]] internal method of obj with arguments "callee", PropertyDescriptor {[[Get]]: thrower, [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false}, and false.
Return obj
The abstract operation MakeArgGetter called with String name and environment record env creates a function object that when executed returns the value bound for name in env. It performs the following steps:
Let body be the result of concatenating the Strings "return ", name, and ";"
Return the result of creating a function object as described in 13.2 using no FormalParameterList, body for FunctionBody, env as Scope, and true for Strict.
The abstract operation MakeArgSetter called with String name and environment record env creates a function object that when executed sets the value bound for name in env. It performs the following steps:
Let param be the String name concatenated with the String "_arg"
Let body be the String "<name> = <param>;" with <name> replaced by the value of name and <param> replaced by the value of param.
Return the result of creating a function object as described in 13.2 using a List containing the single String param as FormalParameterList, body for FunctionBody, env as Scope, and true for Strict.
The [[Get]] internal method of an arguments object for a non-strict mode function with formal parameters when called with a property name P performs the following steps:
Let map be the value of the [[ParameterMap]] internal property of the arguments object.
Let isMapped be the result of calling the [[GetOwnProperty]] internal method of map passing P as the argument.
If the value of isMapped is undefined, then
Let v be the result of calling the default [[Get]] internal method (8.12.3) on the arguments object passing P as the argument.
If P is "caller" and v is a strict mode Function object, throw a TypeError exception.
Return v.
Else, map contains a formal parameter mapping for P so,
Return the result of calling the [[Get]] internal method of map passing P as the argument.
The [[GetOwnProperty]] internal method of an arguments object for a non-strict mode function with formal parameters when called with a property name P performs the following steps:
Let desc be the result of calling the default [[GetOwnProperty]] internal method (8.12.1) on the arguments object passing P as the argument.
If desc is undefined then return desc.
Let map be the value of the [[ParameterMap]] internal property of the arguments object.
Let isMapped be the result of calling the [[GetOwnProperty]] internal method of map passing P as the argument.
If the value of isMapped is not undefined, then
Set desc.[[Value]] to the result of calling the [[Get]] internal method of map passing P as the argument.
Return desc.
The [[DefineOwnProperty]] internal method of an arguments object for a non-strict mode function with formal parameters when called with a property name P, Property Descriptor Desc, and Boolean flag Throw performs the following steps:
Let map be the value of the [[ParameterMap]] internal property of the arguments object.
Let isMapped be the result of calling the [[GetOwnProperty]] internal method of map passing P as the argument.
Let allowed be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on the arguments object passing P, Desc, and false as the arguments.
If allowed is false, then
If Throw is true then throw a TypeError exception, otherwise return false.
If the value of isMapped is not undefined, then
If IsAccessorDescriptor(Desc) is true, then
Call the [[Delete]] internal method of map passing P, and false as the arguments.
Else
If Desc.[[Value]] is present, then
Call the [[Put]] internal method of map passing P, Desc.[[Value]], and Throw as the arguments.
If Desc.[[Writable]] is present and its value is false, then
Call the [[Delete]] internal method of map passing P and false as arguments.
Return true.
The [[Delete]] internal method of an arguments object for a non-strict mode function with formal parameters when called with a property name P and Boolean flag Throw performs the following steps:
Let map be the value of the [[ParameterMap]] internal property of the arguments object.
Let isMapped be the result of calling the [[GetOwnProperty]] internal method of map passing P as the argument.
Let result be the result of calling the default [[Delete]] internal method (8.12.7) on the arguments object passing P and Throw as the arguments.
If result is true and the value of isMapped is not undefined, then
Call the [[Delete]] internal method of map passing P, and false as the arguments.
Return result.
NOTE 1 For non-strict mode functions the array index (defined in 15.4) named data properties of an arguments object whose numeric name values are less than the number of formal parameters of the corresponding function object initially share their values with the corresponding argument bindings in the function’s execution context. This means that changing the property changes the corresponding value of the argument binding and vice-versa. This correspondence is broken if such a property is deleted and then redefined or if the property is changed into an accessor property. For strict mode functions, the values of the arguments object‘s properties are simply a copy of the arguments passed to the function and there is no dynamic linkage between the property values and the formal parameter values.
NOTE 2 The ParameterMap object and its property values are used as a device for specifying the arguments object correspondence to argument bindings. The ParameterMap object and the objects that are the values of its properties are not directly accessible from ECMAScript code. An ECMAScript implementation does not need to actually create or use such objects to implement the specified semantics.
NOTE 3 Arguments objects for strict mode functions define non-configurable accessor properties named "caller" and "callee" which throw a TypeError exception on access. The "callee" property has a more specific meaning for non-strict mode functions and a "caller" property has historically been provided as an implementation-defined extension by some ECMAScript implementations. The strict mode definition of these properties exists to ensure that neither of them is defined in any other manner by conforming ECMAScript implementations.    