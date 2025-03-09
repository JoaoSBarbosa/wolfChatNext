"use client"

import {showToast} from "@/components/ToastMensage/ToastMessage";
import {ApiConnect} from "@/services/ApiConnection";
import {useState} from "react";
import {saveUserLoginSession} from "@/storage/AuthSTorage";
import {AxiosResponse} from "axios";
import {userTokenType} from "@/types/auth/userTokenType";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";

export default function LoginForm() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const router = useRouter(); // Uso correto do useRouter

    const { login } = useAuth();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validações manuais (opcional)
        if (userName.length < 4) {
            showToast({
                type: "error",
                message: "Usuário deve ter pelo menos 4 caracteres.",
            });
            return;
        }

        if (password.length < 4) {
            showToast({
                type: "error",
                message: "Senha deve ter pelo menos 4 caracteres.",
            });
            return;
        }

        // Dados do formulário
        const formData = {
            username: userName,
            password,
        };

        console.log("DADOS QUE VIERAM: ", formData);

        // Chamada à API (exemplo)
        handleLogin(formData);
    };

    const handleLogin = async (formData: {
        username: string;
        password: string;
    }) => {
        try {
            const loginResponse:AxiosResponse<userTokenType> = await ApiConnect(window.location.href).post("/login",
                {
                    username: formData.username,
                    password: formData.password,
                }
            );
            console.log("Resposta da API: ", loginResponse.data);


            login({
                token: loginResponse?.data?.token,
                refreshToken: loginResponse?.data?.refreshToken
            })
            // saveUserLoginSession({token: loginResponse?.data?.token, refreshToken: loginResponse?.data?.refreshToken})
            // showToast({
            //     type: "success",
            //     message: "Login realizado com sucesso",
            // });
            // router.push("/chat");


        } catch (error) {
            showToast({
                type: "error",
                message: "Erro ao realizar o login: " + error,
            });
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen p-8 pb-20 gap-16 sm:p-20 w-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full h-full lg:py-0">
                <div>
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    Flowbite
                </div>

                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Acessar o WolfChat
                        </h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Usuário
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    placeholder="wolf_teste"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Lembrar-me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Esqueceu sua senha?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Acessar
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Não tem uma conta?
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Criar conta
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}