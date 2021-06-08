import {userReducer} from './user-reducer';


test('user reducer should be increment only age', () => {
    const startState = {
        age: 20,
        childrenCount: 1,
        name: 'Anton'
    }

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(startState.age).toBe(20);
    expect(startState.childrenCount).toBe(1);
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(1);
})

test('user reducer should be increment only children count',()=>{
    const startState = {
        age: 20,
        childrenCount: 1,
        name: 'Anton'
    }

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(startState.childrenCount).toBe(1)
    expect(startState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.age).toBe(20)
});