
import './loginForm.css'

export function LoginForm({ onSubmit, error }) {

	return (
		<div className="input">
			<form className="input__form violet-border text_fields"
				action="#" method="POST" onSubmit={onSubmit}
			>
				<div className="input__form-title text_lil-title">Вход в аккаунт</div>

				<label className="input__label" htmlFor="login">Почта</label>
				<input className="input__field" id="login" name="login" type="email" required />

				<label className="input__label" htmlFor="password">Пароль</label>
				<input className="input__field" id="password" name="password" type="password" required />

				{error?.name === 'noSuchUser' &&
					<div className="calc-error red">{error.message}</div>
				}
				<button className="input__btn btn" type="submit" >Войти</button>
			</form>
		</div>
	)
}

