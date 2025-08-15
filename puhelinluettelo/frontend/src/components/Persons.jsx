const Persons = ({ persons, deletePerson }) => {
    return (
        persons.map(person =>
            <Name key={person.id} id={person.id} name={person.name} number={person.number} deletePerson={deletePerson} />
        )
    )
}

const Name = ({ id, name, number, deletePerson }) => {
    return (
        <p className="person">
            {name} {number}
            <button onClick={() => deletePerson(id)}>delete</button>
        </p>
    )
}

export default Persons