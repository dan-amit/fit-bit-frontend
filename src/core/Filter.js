import React from 'react'

const Filter = ({filter, setFilter}) => {
	return (
		<>
			<div className="form-group row">
			  <label for="example-date-input" className="col-4 col-form-label"><h3>Filter By date</h3></label>
			  <div className="col-8">
			    <input className="form-control" type="date" value={filter} id="example-date-input" onChange={(e) => setFilter(e.target.value)} />
			  </div>
			</div>
		</>
	)
}

export default Filter;