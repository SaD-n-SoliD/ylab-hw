"use client"

import { Header } from "@/components/header";
import { LoginForm } from "@/components/loginForm";

import { UIError } from "./UIkit/UIError";
import { UIAccount } from "./UIkit/UIAccount";

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
				{/* Если ошибка, но не 'noSuchUser', то вероятнее всего это HTTP ошибка. Не тема этого дз, поэтому тут затычка с простеньким UI компонентом */}
				{error && (error?.name !== 'noSuchUser') && <UIError error={error} />}
				{isLoading && <div>Loading...</div>}
				{fetchedUserData && <UIAccount data={fetchedUserData} logout={logout} />}
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
