<script lang="ts" setup>

</script>

<template>
    <header class="absolute left-0 bg-city-blue flex justify-center h-full w-24 shadow-default hover:w-60 ease-in-out duration-300 z-50">
        <div class="flex flex-col w-full ease-in-out duration-300">
            <div class="p-4 relative after:content[''] after:absolute after:w-full after:h-px after:bg-afterBackground after:left-0 after:bottom-0">
                <img class="w-full max-w-247" src="/citybens/logotipo-branco-horiz.png" alt="ícone citybens">
            </div>
            <nav class="p-1 text-white">
                <div class="flex items-center bg-gray-500 hover:bg-gray-700 duration-300 active:bg-gray-800">
                    <i class="text-lg pi pi-plus-circle absolute left-9 cursor-pointer"></i>
                    <button class="navigation criar-postagem uppercase h-20 text-center z-2 grow-0 w-full opacity-0 py-7 pl-4 inline-block">Criar postagem</button>
                </div>
            </nav>
        </div>
    </header>
</template>
