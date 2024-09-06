"use client"

import { Header } from "@/components/header";
import { LoginForm } from "@/components/loginForm";

import { fetchApi, mockFetchApi } from '@/service/fetchApi'
import { logger } from '@/utils/logger'

import { useState } from "react";

export default function Home() {

	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [fetchedUserData, setFetchedUserData] = useState(null)

	// Обычно аутентификация происходит отдельным запросом от запроса на получения данных. При этом используется хук useEffect. Но в нашем примере нет сервера. JWT токенов и куки тоже нет.
	async function onLoginAttempt(e) {
		e.preventDefault()
		setIsLoading(true)

		const formData = new FormData(e.currentTarget), data = {}

		// В не мокнутой версии fetch есть стандартные параметры. Если отправлять formdata, то     headers[content-type] нельзя указывать. Поэтому перезапишем headers.
		mockFetchApi('/api/data', { body: formData, headers: undefined })
			.then(data => (setFetchedUserData(data), setError(null), data))
			.then(logger())
			.catch(e => (setError(e), logger('error')(e)))
			.finally(_ => setIsLoading(false))
	}

	function logout() {
		setFetchedUserData(null)
	}

	return (
		<>
			<Header className="p-20">
				{error && (error?.name !== 'noSuchUser') &&
					<div className="text_lil-title red">
						{'Упс:( Что-то пошло не так'}
					</div>
				}
				{isLoading && <div>Loading...</div>}
				{fetchedUserData &&
					<>
						<div className="text_lil-title mb-20">
							Вы вошли! Смотрите данные в консоли
						</div>
						<button className="btn" onClick={logout}>
							Выйти
						</button>
					</>
				}
			</Header>
			<main className="main">
				{!fetchedUserData &&
					<LoginForm
						onSubmit={onLoginAttempt}
						error={error}
					/>
				}
			</main>
		</>
	);
}
