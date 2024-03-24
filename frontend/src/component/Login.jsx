import React from 'react'
import './Login.css'

const login = () => {
  return (
    <div className='container'>
        <input type="checkbox" name="" id="chk" aria-hidden="true" />
       <div className="main">
       <div className="login">
            <form action="" className="form">
                <label htmlFor="chk" aria-hidden="true">Log in</label>
                <input type="email" name="" id="" className="input" placeholder='email' required/>
                <input type="email" name="" id="" className="password input" placeholder='password' required/>
                <button>Log in</button>
            </form>
        </div>
        <div className="register">
            <form action="" className="form">
                <label htmlFor="chk" aria-hidden="true">Register</label>
                <input type="text" name="txt" id="" className="input" placeholder='Username' required/>
                <input type="email" name="email" id="" className="input" placeholder='email' required/>
                <input type="password" name="pswd" id="" className="input" placeholder='password'/>
                <button>Register</button>
            </form>
        </div>
       </div>
    </div>
  )
}

export default login