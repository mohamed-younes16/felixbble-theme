
import React from 'react'

const FormField = ({title,name, setstate,placeholder , state , isTextArea}) => {

  return (<div className='flexStart flex-col gap-4 relative z-50'>

<label className="w-full   text gray-100">
{title}
</label>
{
  isTextArea ?(<textarea 
    placeholder={placeholder}
    value={state}
    name={name}
    onChange={e=>setstate(e.target.value)}
    className= ' text-black form_field-input'
    required
  > </textarea> )
  :(<input
  name={name}
    type='text'
    placeholder={placeholder}
    value={state}
    onChange={e=>setstate(e.target.value)}
    className=' text-black form_field-input'
    required
  />)
}
</div>
  
)
}

export default FormField