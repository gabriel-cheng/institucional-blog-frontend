<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
const baseURL = import.meta.env.VITE_AUTH_BASEURL;
const router = useRouter();
const username = ref('');
const password = ref('');

async function loginRequest() {
    try {
        const response = await fetch(`${baseURL}/auth/user/login`, {
            method: "POST",
            body: JSON.stringify({
                "username": username.value,
                "password": password.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(e => e.json());

        if(response.message == "Autenticação realizada com sucesso!") {
            sessionStorage.setItem("token", response.token);

            alert(response.message);
            router.push("/");
        } else alert(response.message);
    } catch(err) {
        alert("Não foi possível efetuar o login neste momento, tente novamente mais tarde!");
    }
}
</script>

<template>
    <main class="w-full h-screen bg-gradient-to-br from-city-blue to-city-green flex justify-center items-center">
        <div class="p-1 w-500px m-2 max-w-2700 bg-white shadow-default">
            <div class="border-2 border-city-blue p-11 rounded-md">
                <div class="w-full mb-10 flex justify-center">
                    <img src="/citybens/logotipo-preto-horiz.png" alt="">
                </div>
                <form @submit.prevent="loginRequest();">
                    <div class="relative mb-10">
                        <input class="w-full outline-0 pl-9 border-b-2 border-gray-300 placeholder:text-loginTxtColor" type="text" name="login" id="login" placeholder="Informe seu username" v-model="username" required>
                        <i class="pi absolute left-3 bottom-1.5 text-city-blue pi-user"></i>
                    </div>
                    <div class="relative mb-10">
                        <input class="w-full outline-0 pl-9 border-b-2 border-gray-300 placeholder:text-loginTxtColor" type="password" name="senha" id="senha" placeholder="Informe sua senha" v-model="password" required>
                        <i class="pi absolute left-3 bottom-1.5 text-city-blue pi-lock"></i>
                    </div>
                    <div class="w-full flex justify-center">
                        <input class="loginSubmitButton bg-city-blue w-2/3 h-14 text-white uppercase cursor-pointer hover:bg-blue-900" type="submit" value="Conectar-se">
                    </div>
                </form>
            </div>
        </div>
        <div id="popupBackground" class="w-500px h-20 border-b-4 rounded-md absolute top-0 opacity-0 duration-300">
            <div id="messageTextColor" class="relative w-full h-full rounded-md">
                <div class="flex items-center h-full">
                    <i id="popupIconBackground" class="p-2 rounded-full mx-3 text-white pi pi-check font-extrabold"></i>
                    <div class="">
                        <p id="statusMessage" class="font-extrabold text-lg"></p>
                        <p id="statusMessageDescription" class="font-normal"></p>
                    </div>
                </div>
                <span class="cursor-pointer font-bold absolute right-2 top-0 text-gray-700">X</span>
            </div>
        </div>
    </main>
</template>
