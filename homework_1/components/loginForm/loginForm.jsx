"use client"

import { useState } from 'react'
import './loginForm.css'

import { fetchApi, mockFetchApi } from '@/service/network/fetchApi'
import { logger } from '@/utils/logger'

export function LoginForm() {

	const [data, setData] = useState()
	const [error, setError] = useState()

	async function onSubmit(e) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget), data = {}

		// В не мокнутой версии fetch есть стандартные параметры. Если отправлять formdata, то content-type нельзя указывать. Поэтому перезапишем headers.
		mockFetchApi('/api/data', { body: formData, headers: undefined })
			.then(data => (setData(data), data))
			.then(logger())
			.catch(e => (setError(e), logger('error')(e)))
	}




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

				<button className="input__btn btn" type="submit" >Войти</button>
				<div className="calc-error green"></div>
			</form>
		</div>
	)
}

