import { useState, useEffect } from 'react'

import axios from 'axios'
import personsService from './services/persons'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setsearchValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then( response => {
        setPersons(response.data)
      })
  }, [])

  if (!persons) { 
    return null 
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personsService
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.name === newName ? response.data : person ))
          setNewName("")
          setNewNumber("")
        })
        setNotificationClass("success")
        setNotificationMessage(`Updated ${newName} number`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      return
      } else { 
        return 
      }
    }
    if (persons.some(person => person.number === newNumber)){
      alert(`${newNumber} is already in the phonebook`)
      return
    }


    const nameObject = { name: newName, number: newNumber }

    personsService
    .create(nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName("")
      setNewNumber("")
    })

    setNotificationClass("success")
    setNotificationMessage(`Added ${newName}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
  }


  const handleDeleteButtonOf = (id) => {
    const person = persons.find(person => person.id === id)
    console.log(person)
    console.log(id)
    if (confirm(`Delete ${person.name}?`) === true) {
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id ))
      })
      .catch(error => {
        setNotificationClass("error")
        setNotificationMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => {
          setNotificationClass(null)
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id ))
      })
    } else {
      return
    }
  }

  const handleInputName = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputSearch = (event) => {
    setsearchValue(event.target.value)
  }

  const personsShowed = persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={notificationClass} message={notificationMessage} />
      <Filter value={searchValue} onChange={handleInputSearch} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleFormSubmit} newName={newName} handleInputName={handleInputName} newNumber={newNumber} handleInputNumber={handleInputNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsShowed} handleDeleteButton={handleDeleteButtonOf} />
    </div>
  )
}

export default App
