import React from 'react'

function index({data}) {
  return (<div>
      <textarea  className="form-control mt-5" id="exampleFormControlTextarea1" rows="6" value={data} />  
    </div>
  )
}

export default index
