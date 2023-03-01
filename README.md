# GraphQL

{
  books {
    name,
    genre,
    author {
      name,
      age
    }
  }
}

mutation {
  addAuthor(name: "Stephen King", age: 57) {
    name,
    age
  }
}

mutation {
  addBook(name: "Asesinato en el orient express", genre: "Crimen", authorId: "63ff54a90ae1e2268aca02c0") {
    name,
    genre
  }
}
