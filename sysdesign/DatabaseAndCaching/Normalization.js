/**
 * what is normalization?
 *
 */

// flattening of Data Structures.

/**
 *
 * storing entities seperately.
 * dont store college info in student table.
 */

/**
 * create foreign key to reference the entity.
 * have relationship with unique id
 */

const student1 = {
  name: "John",
  college: {
    name: "MIT",
    id: 1,
    year: 2024,
  },
  department: "CS",
};

// now for every student we need to store college info.
// we can store college info seperately.

const student2 = {
  name: "John",
  collegeId: 1,
  department: "CS",
};

const college1 = {
  id: 1,
  name: "MIT",
  year: 2024,
};

// now we can store college1 in the database and reference it in the student2 table.

/**
 * why we need normalization?
 *
 * 1. reduce data redundancy
 * 2. simplifies nested relationships
 * 3. efficiency in data retrieval
 * 4. enhanced caching
 * 5. scalability
 */

// example problem

const state = {
  users: [
    {
      id: 1,
      name: "alice",
      posts: [
        {
          id: 101,
          title: "post 1",
          content: "content 1",
        },
        {
          id: 102,
          title: "post 2",
          content: "content 2",
        },
      ],
    },
    {
      id: 2,
      name: "bob",
      posts: [
        {
          id: 201,
          title: "post 3",
          content: "content 3",
        },
      ],
    },
  ],
};

const normalizedState = {
  users: {
    byIds: {
      1: {
        id: 1,
        name: "alice",
        posts: [101, 102],
      },
      2: {
        id: 2,
        name: "bob",
        posts: [201],
      },
    },
  },
  posts: {
    byIds: {
      101: {
        id: 101,
        title: "post 1",
        content: "content 1",
        userId: 1,
      },
      102: {
        id: 102,
        title: "post 2",
        content: "content 2",
        userId: 1,
      },
      201: {
        id: 201,
        title: "post 3",
        content: "content 3",
        userId: 2,
      },
    },
  },
};
