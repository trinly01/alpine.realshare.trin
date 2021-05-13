const realShare = require('real-share/server')
const trinDB = require('trin.db')

let db
const initializeDatabase = async () => {
    db = await trinDB({
        filename: 'trinDb/todos.db',
    })
}

class TodoServer {
    constructor () {
        initializeDatabase()
    }
    getAllTodos () {
        console.log(db.data)
        return Object.keys(db.data).map((key) => db.data[key])
    }
    add (obj) {
        return db.create(obj).data
    }
    remove (id) {
        return db.remove(id)
    }
    patch (id, patch) {
        // console.log(db.patch(id, patch).data)
        return db.patch(id, patch).data
    }
}

const todoService = new TodoServer()

realShare(3000, {
    todoService
})