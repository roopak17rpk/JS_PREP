const sum = (a , b) => {
    return a + b;
}

test("a function to add two numbers" , () => {
    expect(sum(1,2)).toBe(3);
})

const cloneArray = (arr) => {
    return [...arr];
} 

test("a cloning array function" , () => {
    const newArr = [1,2,3,4,5];
    expect(cloneArray(newArr)).toBe(newArr); // throws error as for toBe the same  memory reference is checked
    expect(cloneArray(newArr).toEqual(newArr)) // this works as it compares values
})