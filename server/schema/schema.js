const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// ---- dummy data ----

var books = [
    { name: 'La isla misteriosa', genre: 'Aventura', id: '1', authorId: '1' },
    { name: '10 Negritos', genre: 'Crimen', id: '2', authorId: '2' },
    { name: 'Estudio en escarlata', genre: 'Suspenso', id: '3', authorId: '3' },
    { name: 'El sabueso de los baskerville', genre: 'Suspenso', id: '4', authorId: '3' },
    { name: 'Las aventuras de Sherlock Holmes', genre: 'Suspenso', id: '5', authorId: '3' },
    { name: '20000 leguas de viaje submarino', genre: 'Aventura', id: '6', authorId: '1' }
]

var authors = [
    { name: 'Julio Verne', age: 45, id: '1' },
    { name: 'Agatha Christie', age: 65, id: '2' },
    { name: 'Conan Doyle', age: 39, id: '3' }
]

// --------------------

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId } )
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //args.id will have the parameter passed
                //code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //args.id will have the parameter passed
                //code to get data from db / other source
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})