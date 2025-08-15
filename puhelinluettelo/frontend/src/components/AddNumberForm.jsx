const AddNumberForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addName}>
            <div>
                <label>
                    Name:
                    <input value={newName}
                        onChange={handleNameChange} />
                </label>
            </div>
            <div>
                <label>
                    Number:
                    <input value={newNumber}
                        onChange={handleNumberChange} />
                </label>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNumberForm