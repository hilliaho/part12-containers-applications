const FilterForm = ({ searchFilter, handleFilterChange }) => {
    return (
        <div>
            <label>
                filter shown with
                <input value={searchFilter}
                    onChange={handleFilterChange} />
            </label>
        </div>
    )
}

export default FilterForm