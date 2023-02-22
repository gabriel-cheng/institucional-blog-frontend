<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    const allPosts = ref<Array<iPostAttributes>>([]);

    interface iPostAttributes {
        _id?: string,
        title?: string,
        nameImage?: string,
        shortDescription?: string,
        description?: string
    }

    onMounted(() => {
        requestPosts();
    });

    async function modalController(func: string, id: string) {
        const form = (document.querySelector("#postForm") as HTMLFormElement);

        openModal();

        if(func == "newPost") {
            form.reset();
            (document.querySelector("#formTitle") as HTMLTitleElement).textContent = "Criar postagem";
            (document.querySelector("#title") as HTMLInputElement).required = true;
            (document.querySelector("#nameImage") as HTMLInputElement).required = true;
            (document.querySelector("#shortDescription") as HTMLInputElement).required = true;
            (document.querySelector("#description") as HTMLTextAreaElement).required = true;

            form.onsubmit = (e) => {
                registerNewPost();

                e.preventDefault();
            }
        } else if(func == "updatePost") {
            (document.querySelector("#formTitle") as HTMLTitleElement).textContent = "Atualizar postagem";
            const post = allPosts.value.filter(el => el._id == id);

            (document.querySelector("#title") as HTMLInputElement).value = post[0].title as string;
            (document.querySelector("#shortDescription") as HTMLInputElement).value = post[0].shortDescription as string;
            (document.querySelector("#description") as HTMLTextAreaElement).value = post[0].description as string;

            form.onsubmit = (e) => {
                updatePost(id);

                e.preventDefault();
            }
        }

        return;
    }

    function openModal() {
        const containerModalWrapper = (document.querySelector("#containerModalWrapper") as HTMLDivElement);

        containerModalWrapper.classList.toggle("containerModalWrapper");

        return;
    }

    function closeModal() {
        openModal();

        return;
    }

    async function requestPosts() {
        const url = "http://localhost:5000/posts";

        try {
            const response = await fetch(url, {
                method: "GET",
            })
            .then(e => e.json())

            for(let i of response) {
                allPosts.value.push(i);
            }

            return response;
        } catch(err) {
            console.log({request_error: err});
        }

        return;
    }

    async function makeRequestAtMethod(method: string, url: string) {
        const title = (document.querySelector("#title") as HTMLInputElement).value;
        const file = (document.querySelector("#nameImage") as HTMLInputElement).files;
        const shortDescription = (document.querySelector("#shortDescription") as HTMLInputElement).value;
        const description = (document.querySelector("#description") as HTMLTextAreaElement).value;
        const formData = new FormData();

        if(title != "") {
            formData.append("title", title);
        }
        if(shortDescription != "") {
            formData.append("shortDescription", shortDescription);
        }
        if(description != "") {
            formData.append("description", description);
        }
        if(file) {
            formData.append("file", file[0]);
        }

        try {
            await fetch(url, {
                method: method,
                body: formData
            })
            .then(e => e.json());

            location.reload();
        }catch (err) {
            console.log({requests_error: err});
        }

        return;
    }

    async function registerNewPost() {
        const url = "http://localhost:5000/posts/register";
        try {
            await makeRequestAtMethod("POST", url);
            alert("Postagem criada com sucesso!");
        } catch(err) {
            console.log({create_new_post_error: err});
        }

        return;
    }

    async function updatePost(id: string) {
        const url = `http://localhost:5000/posts/update/${id}`;

        try {
            await makeRequestAtMethod("PATCH", url);

            alert("Postagem atualizada com sucesso!");

            return;
        } catch(err) {
            console.log({update_post_error: err});
        }

        return;
    }

    async function deletePost(id: string) {
        const url = `http://localhost:5000/posts/delete/${id}`
        const confirmacao = confirm("Prosseguir com a exclusão da postagem?");

        if(confirmacao) {
            try {
                await fetch(url, {
                    method: "DELETE",
                });

                location.reload();
            } catch(err) {
                console.log({delete_post_error: err});
            }
        }

        return;
    }
</script>

<template>
    <div id="app">
        <header class="bg-gray-600 w-full flex justify-center fixed top-0 z-20">
            <nav class="w-full max-w-2700 flex justify-between px-10 py-5 items-center">
                <div class="">
                    <h1 class="text-3xl uppercase text-white">blog citybens</h1>
                </div>
                <button @click="modalController('newPost', null);" class="text-white px-10 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700">Criar postagem</button>
            </nav>
        </header>

        <main class="flex flex-col justify-center items-center w-full h-screen relative">
            <div class="bg-gray-300 relative -z-0 w-5/6 h-4/6 border border-gray-400 shadow-md px-5 py-5 pt-10 rounded-lg">
                <div class="w-full h-10 absolute top-0 left-0 flex items-center justify-between uppercase text-black font-bold px-24">
                    <div class=""><p>Titulo</p></div>
                    <div class=""><p>Descrição</p></div>
                    <div class=""><p>Ferramentas</p></div>
                </div>
                <div class="w-full h-full bg-white overflow-auto p-2 pb-0">
                    <div v-for="(post, index) of allPosts.reverse()" :key="index" class="flex flex-wrap items-center justify-between px-6 py-7 border-2 mb-2">
                        <div class="w-full max-w-320px">
                            <h1 class="font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{{ post.title }}</h1>
                        </div>
                        <div class="w-full max-w-lg">
                            <p class="whitespace-nowrap overflow-hidden text-ellipsis">{{ post.description }}</p>
                        </div>
                        <div class="flex flex-wrap gap-5">
                            <div class="relative bg-purple-800 hover:bg-purple-700 text-white active:bg-purple-900">
                                <div class="relative z-10 border-2">
                                    <button @click="modalController('updatePost', post._id)" class="bg-transparent px-7 pr-8 py-1 ">Editar</button>
                                </div>
                                <i class="pi z-2 pi-file-edit absolute top-2.5 right-2"></i>
                            </div>
                            <div class="relative bg-blue-700 hover:bg-blue-600 text-white active:bg-blue-800">
                                <div class="relative z-10 border-2">
                                    <button @click="deletePost(`${post._id}`);" class="bg-transparent px-7 pr-9 py-1">Deletar</button>
                                </div>
                                <i class="pi pi-trash z-2 absolute top-2.5 right-2"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="containerModalWrapper" class="absolute z-50 opacity-0 -top-full left-0 bottom-0 bg-modalBg duration-500 w-full h-screen flex justify-center items-center">
                <div class="w-full h-screen flex justify-center items-center">
                    <div id="newPostFormContainerWrapper" class="bg-white w-3/6 rounded-md relative px-5 pb-5">
                        <div @click="closeModal();" class="bg-modalBg rounded-full w-10 h-10 flex justify-center items-center absolute cursor-pointer -right-5 -top-5 hover:bg-slate-600 active:bg-slate-900">
                            <i class="pi pi-times text-white"></i>
                        </div>
                        <div class="w-full flex justify-center border-b border-gray-400 py-4">
                            <h1 id="formTitle" class="text-2xl"></h1>
                        </div>
                        <form id="postForm" class="flex flex-col gap-3 mt-3" enctype="multipart/form-data">
                            <div class="">
                                <label class="text-xl font-semibold block" for="titulo">Titulo</label>
                                <input class="formNewPostInputs h-9 outline-none pl-3" type="text" name="" id="title" placeholder="Informe um título">
                            </div>
                            <div class="">
                                <label class="text-xl font-semibold block" for="capa">Imagem de capa</label>
                                <input class="formNewPostInputs h-9 outline-none p-0.5 cursor-pointer" type="file" name="" id="nameImage">
                            </div>
                            <div class="">
                                <label class="text-xl font-semibold block" for="descricaoCurta">Descrição curta</label>
                                <input class="formNewPostInputs h-9 outline-none pl-3" type="text" name="" id="shortDescription" placeholder="Informe um descrição curta">
                            </div>
                            <div class="">
                                <label class="text-xl font-semibold block" for="descricao">Descrição</label>
                                <textarea class="formNewPostInputs pl-3 pt-2" name="descricao" id="description" cols="30" rows="10" placeholder="Informe um uma descrição"></textarea>
                            </div>
                            <div class="w-full flex justify-center">
                                <input class="bg-city-blue text-white hover:bg-blue-600 cursor-pointer active:bg-blue-800 w-3/6 h-12" type="submit" value="Criar nova postagem">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
