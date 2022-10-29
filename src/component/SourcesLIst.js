import React from 'react'

const SourcesLIst = ({sources, setSource_name, setShowSource}) => {
    
  return (
<div className='container my-1'>
{sources.map((source)=>(
        <button key={source.id} className="btn btn-sm btn-info m-1" type="button" 
        onClick={()=>{
            setSource_name(source.id)
            setShowSource((x)=>!x);
        }
        
        }>{source.name}</button>
    ))
}</div>
  )
}

export default SourcesLIst
