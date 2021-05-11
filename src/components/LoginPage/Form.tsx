import "styles/Styles-form.scss";

const Form: React.FC = () => {

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <div className="container">
      <h2 className="title">Sign in</h2>
      <form className="form__group field" onSubmit={submitHandler}>
        <input type="email" className="form__field" placeholder="E-mail" name="email" id='email'/>
        <label htmlFor="email" className="form__label">E-mail</label>
        <input type="password" className="form__field" placeholder="Password" name="password" id='password'/>
        <label htmlFor="password" className="form__label">Password</label>
        <button className="btn">Sign</button>
      </form>
    </div>
  )
}

export default Form;