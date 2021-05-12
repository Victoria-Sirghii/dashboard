import "styles/Styles-form.scss";

const Form: React.FC = () => {

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <div className="container">
      <div className="box flex">
        <h2 className="title">Login Form</h2>
        <form className="form__group field flex" onSubmit={submitHandler}>
          <input type="email" className="form__field" placeholder="E-mail" name="email" id='email'/>
          <input type="password" className="form__field" placeholder="Password" name="password" id='password'/>
          <a href="" className="link center">Forgot Password?</a>
          <button className="btn">Login</button>
          <p className="center">Not a member? <a href="" className="link">Signup now</a></p>
        </form>
      </div>
    </div>
  )
}

export default Form;