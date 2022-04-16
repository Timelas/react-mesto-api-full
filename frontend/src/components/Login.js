import React from 'react';

function Login({authorization}) {
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");
  
    function handleChangePassword(e) {
      setValuePassword(e.target.value);
    }
  
    function handleChangeEmail(e) {
      setValueEmail(e.target.value);
    }
  
    function handleSubmit(evt) {
      evt.preventDefault();
      const email = valueEmail;
      const password = valuePassword;
      authorization({ password, email });
    }
    
    return(
        <div className="login">
        <h1 className="login__title">Вход</h1>
        <form 
            onSubmit={handleSubmit} 
            className="login__form">
          <input
            value={valueEmail}
            onChange={handleChangeEmail}
            className="login__input"
            placeholder="Email"
          />
          <input
            type="password"
            value={valuePassword}
            onChange={handleChangePassword}
            className="login__input"
            placeholder="Password"
          />
          <button className="login__button">Войти</button>
        </form>
      </div>
    );
}

export default Login; 