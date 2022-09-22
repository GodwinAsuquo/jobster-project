import React from 'react'
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {
  const dispatch = useDispatch()
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector((store)=>store.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((store)=>store.job)

  const handleSearch = (e)=> {
    if(isLoading) return;
    //I did this so I'll be able to type only once loading is done and a request is complete
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    dispatch(clearFilters());
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className="form-center">
          {/* search position  */}
          <FormRow
          type='text'
          name='search'
          value={search}
          handleChange = {handleSearch}
          >
          </FormRow>
          {/* search by status  */}
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]}/>
          
           {/* search by type  */}
          <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]}/>
         
           {/* search by sort  */}
          <FormRowSelect  name='sort' value={sort} handleChange={handleSearch} list={sortOptions}/>

          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer