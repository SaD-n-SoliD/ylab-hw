"use client"

import { useEffect, useState } from 'react'
import './loginForm.css'
// import { fetchApi } from '@/helpers/fetchApi'


export function LoginForm() {

	// const [data, setData] = useState()

	// useEffect(() => {
	// 	const data = fetchApi('/api/data', {})
	// 	console.log(data)
	// }
	// 	, [])

	return (
		<div className="input">
			<form className="input__form violet-border text_fields" action="#" method="POST">
				<div className="input__form-title text_lil-title">Вход в аккаунт</div>

				<label className="input__label" htmlFor="full-name">Почта</label>
				<input className="input__field" id="full-name" name="full-name" type="email" required />

				<label className="input__label" htmlFor="phone">Пароль</label>
				<input className="input__field" id="phone" name="phone" type="password" required />

				<button className="input__btn btn" type="submit" >Войти</button>
				<div className="calc-error green"></div>
			</form>
		</div>
	)
}

