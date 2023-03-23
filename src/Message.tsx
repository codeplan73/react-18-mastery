

function Message() {
    const name:string  = 'Emmanuel'
    
    if(name)
        return <h2>Hello {name}</h2>
    return <h2>Hello Wolrd</h2>
}

export default Message;