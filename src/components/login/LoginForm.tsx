"use client"
import {showToast} from "@/components/ToastMensage/ToastMessage";
import {ApiConnect} from "@/services/ApiConnection";
import {useState} from "react";
import {AxiosResponse} from "axios";
import {userTokenType} from "@/types/auth/userTokenType";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import { FaUser, FaLock } from "react-icons/fa";

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
            login({
                token: loginResponse?.data?.token,
                refreshToken: loginResponse?.data?.refreshToken
            })
        } catch (error) {
            showToast({
                type: "error",
                message: "Erro ao realizar o login: " + error,
            });
        }
    };

    return (
        <section className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col items-center justify-center p-8">
                    <a
                        href="https://joaobarbosadev.vercel.app/"
                        target="_blank"
                        title="Acessar site"
                        rel="noopener noreferrer"
                        className="flex items-center mb-4 hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/img/logo.svg"
                            alt="logo"
                            className="w-14 h-14 mr-3"
                        />
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Wolf Chat
                            <span className="text-primary-600"> by BarbosaCode</span>
                        </h1>
                    </a>

                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">
                        Acesse sua conta
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <div className="relative">
                            <label
                                htmlFor="userName"
                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                            >
                                Usuário
                            </label>
                            <div className="flex items-center relative">
                                <FaUser className="absolute left-3 text-gray-400" />
                                <input
                                    type="text"
                                    id="userName"
                                    placeholder="wolf_teste"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                            >
                                Senha
                            </label>
                            <div className="flex items-center relative">
                                <FaLock className="absolute left-3 text-gray-400" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 dark:text-gray-300">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="w-4 h-4 mr-2 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                Lembrar-me
                            </label>

                            <a
                                href="#"
                                className="text-primary-600 hover:underline dark:text-primary-400"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 transition"
                        >
                            Acessar
                        </button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Não tem uma conta?
                            <a
                                href="#"
                                className="ml-1 text-primary-600 hover:underline dark:text-primary-400"
                            >
                                Criar conta
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </section>

        // <section className="bg-gray-50 dark:bg-gray-900 h-screen p-8 pb-20 gap-16 sm:p-20 w-screen">
        //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full h-full lg:py-0">
        //         <div className={"flex items-center"}>
        //            <a href={"https://joaobarbosadev.vercel.app/"} target={"_blank"} title={"Acessar site"}>
        //                <img
        //                    className="w-16 h-16 mr-2"
        //                    src="/img/logo.svg"
        //                    alt="logo"
        //                />
        //            </a>
        //             Wolf Chat By BarbosaCode
        //         </div>
        //
        //         <div
        //             className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        //                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        //                     Acessar o WolfChat
        //                 </h1>
        //
        //                 <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        //                     <div>
        //                         <label
        //                             htmlFor="userName"
        //                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        //                         >
        //                             Usuário
        //                         </label>
        //                         <input
        //                             type="text"
        //                             id="userName"
        //                             placeholder="wolf_teste"
        //                             className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                             value={userName}
        //                             onChange={(e) => setUserName(e.target.value)}
        //                         />
        //                     </div>
        //                     <div>
        //                         <label
        //                             htmlFor="password"
        //                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        //                         >
        //                             Senha
        //                         </label>
        //                         <input
        //                             type="password"
        //                             id="password"
        //                             placeholder="••••••••"
        //                             className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                             value={password}
        //                             onChange={(e) => setPassword(e.target.value)}
        //                         />
        //                     </div>
        //                     <div className="flex items-center justify-between">
        //                         <div className="flex items-start">
        //                             <div className="flex items-center h-5">
        //                                 <input
        //                                     id="remember"
        //                                     type="checkbox"
        //                                     className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
        //                                     checked={remember}
        //                                     onChange={(e) => setRemember(e.target.checked)}
        //                                 />
        //                             </div>
        //                             <div className="ml-3 text-sm">
        //                                 <label
        //                                     htmlFor="remember"
        //                                     className="text-gray-500 dark:text-gray-300"
        //                                 >
        //                                     Lembrar-me
        //                                 </label>
        //                             </div>
        //                         </div>
        //                         <a
        //                             href="#"
        //                             className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        //                         >
        //                             Esqueceu sua senha?
        //                         </a>
        //                     </div>
        //                     <button
        //                         type="submit"
        //                         className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        //                     >
        //                         Acessar
        //                     </button>
        //                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                         Não tem uma conta?
        //                         <a
        //                             href="#"
        //                             className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        //                         >
        //                             Criar conta
        //                         </a>
        //                     </p>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
}