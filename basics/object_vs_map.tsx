interface DemoProps {
  title: string;
}

const ObjectVsMapDemo = (props: DemoProps) => {
  const { title } = props;

  // 1. Object Demo
  const userObject = {
    name: "John",
    age: 30,
    "user-id": 123
  };

  console.log("userObject", userObject);

  // 2. Map Demo
  const userMap = new Map();
  userMap.set("name", "John");
  userMap.set("age", 30);
  userMap.set("user-id", 123);
  userMap.set(123, "numeric key");  // Maps can have any type as key
  userMap.set({}, "object as key"); // Even objects as keys

  console.log("userMap", userMap);

  // Key Differences Examples

  // 1. Size
  console.log("Object.keys(userObject).length", Object.keys(userObject).length);
  console.log("userMap.size", userMap.size);

  // 2. Key Types
  const complexKey = { id: 1 };
  userMap.set(complexKey, "value for object key");
  console.log("userMap with complex key", userMap);

  // 3. Iteration
  // Object iteration
  for (const key in userObject) {
    console.log("object key", key);
    console.log("object value", userObject[key]);
  }

  // Map iteration
  userMap.forEach((value, key) => {
    console.log("map key", key);
    console.log("map value", value);
  });

  // 4. Key Existence Check
  console.log("hasOwnProperty result", userObject.hasOwnProperty("name"));
  console.log("map has result", userMap.has("name"));

  // 5. Adding/Removing Properties
  // Object
  userObject.newProp = "new value";
  delete userObject.newProp;
  console.log("modified userObject", userObject);

  // Map
  userMap.set("newProp", "new value");
  userMap.delete("newProp");
  console.log("modified userMap", userMap);

  return (
    <div>
      <h1>{title}</h1>
      {/* Component content */}
    </div>
  );
};

export default ObjectVsMapDemo;


/**
 *  differences
 *  
 * 1. key types
 *  -> object: only strings and symbols
 * 	maps: Any value (functions , objects, primitives)
 * we can have temporary stuff like these keys in map
 * and while saving to db we wont need them
 * 
 * 2. size/length
 * 	maps have .size key and objects dont.
 * 	we have to use Object.keys(object).length
 * 
 * 3. delete and insert methods for keys are faster for
 * maps then object.
 * 
 * 4. maps need to be serialized for json where Objects have
 * direct JSON support
 * 
 * 5. keys maintain the key value order
 * 
 * 6. keys are not polluted with prebuilt keys whereas
 * objects due to prototype have those
 * 
 * 
 */