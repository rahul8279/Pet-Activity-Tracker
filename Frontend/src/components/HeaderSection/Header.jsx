import React from 'react'
import "./Header.css"
function Header() {
  return (
   <header className='header'>
       <div className='container'>
           <nav className='title-container'>
           <h1 className='title'>Pet Activity</h1>    
       </nav>
       <button className='todayActivity'>
          Add Activity
       </button>
       </div>
   </header>
  )
}

export default Header