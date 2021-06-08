const uuid = require('uuid')

// class to generate msgs to display in the front end
class ResObj {
    constructor(msg, type) {
        this.msgObj= {
            msg,
            type
        }
    }
}

//class to generate comment object
class Comment {
    constructor(memberName, memberId, comment) {
        this.id = uuid.v4(),
        this.memberName = memberName,
        this.memberId = memberId,
        this.comment = comment
    }
}

module.exports = { ResObj, Comment }