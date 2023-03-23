import useUsers from './hooks/useUsers';
import userService, {User} from './services/user-service'

// import Alert from './components/Alert'
// import Cart from './components/Cart'
// import Navbar from './components/Navbar'
// import Form from './components/Form'
// import ExpenseList from './expense-tracker/components/ExpenseList'
// import ExpenseFilter from './expense-tracker/components/ExpenseFilter'
// import ExpenseForm from './expense-tracker/components/ExpenseForm'
// import ProductList from './components/ProductList'
// import {CanceledError} from './services/api-client'




function App() {
  const {error, loading, users, setError, setLoading, setUsers} = useUsers();
  // const [cartItems, setCartItems] = useState(['product1', 'product2'])
  // const [selectedCategory, setSelectedCategory] = useState('')
  // const [expenses, setExpenses] = useState([
  //   { id: 1, description: 'aaaaa', amount: 10, category: 'Groceries' },
  //   { id: 2, description: 'aaaaa', amount: 10, category: 'Utilities' },
  //   { id: 3, description: 'aaaaa', amount: 10, category: 'Utilities' },
  //   { id: 4, description: 'aaaaa', amount: 10, category: 'Entertainment' },
  //   { id: 5, description: 'aaaaa', amount: 10, category: 'Entertainment' },
  // ])

  // const visibleExpenses = selectedCategory
  // ? expenses.filter((e) => e.category === selectedCategory)
  // : expenses
  // const [category, setCategory] = useState<string>('');

 

  // useEffect(() => {
  //   const fetchUsers = async()=> {
  //     try {
  //       const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  //       setUsers(res.data);
  //     } catch (err) {
  //     setError((err as AxiosError).message)
  //     }
  //   }
  //   fetchUsers()
  // }, [])


  const deleteUser =(user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id))

    userService.delete(user.id)
    .catch(err => {
      setError(err.message);
      setUsers(originalUsers);
    })
  }

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {id:1, name: 'Emmanuel'}
    setUsers([newUser, ...users])

      userService.create(newUser)
      .then(({data: savedUser}) => setUsers([savedUser, ...users]))
      .catch(err => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  const updateUser = (user:User) => {
    const originalUsers = [...users];
    const updatedUser = {...user, name: user.name + '!'}
    setUsers(users.map(u =>  u.id === user.id ? updatedUser: u ))

    userService.update(updatedUser)
    .catch(err => {
      setError(err.message);
      setUsers(originalUsers)
    })
  }

  return (
    <div>
      {/* <Navbar cartItemsCount={cartItems.length}/>
    <Cart cartItems={cartItems} onClear={() => setCartItems([])}/>
    <ExpenseForm /> */}
      {/* <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-5">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div> */}
      {/* <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      /> */}

      {/* <select id="" className="form-select" onChange={(event) => setCategory(event.target.value)}>
            <option value=""></option>
            <option value="Clothing">Clothing</option>
            <option value="Household">Household</option>
        </select>
      <ProductList  category={category}/> */}

      {error && <p className="text-danger">{error}</p>}
      {loading && <div className="spinner-border"></div>}
      <button className='btn btn-primary mb-5' onClick={addUser}>Add User</button>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between">
            {user.name}
            <div>
               <button className="btn btn-outline-danger mx-1" onClick={() => deleteUser(user)}>Delete</button>
            <button className='btn btn-secondary' onClick={() => updateUser(user)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
