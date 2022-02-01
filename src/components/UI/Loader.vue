<template>
    <div class="wrapper-loader">
        <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>
    .wrapper-loader {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loader {
        color: red;
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .loader div {
        transform-origin: 40px 40px;
        animation: lds-spinner 1.2s linear infinite;
    }
    .loader div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 3px;
        left: 37px;
        width: 6px;
        height: 18px;
        border-radius: 20%;
        background: teal;
    }
    .loader div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
    }
    .loader div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
    }
    .loader div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
    }
    .loader div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
    }
    .loader div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
    }
    .loader div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
    }
    .loader div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
    }
    .loader div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
    }
    .loader div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
    }
    .loader div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
    }
    .loader div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
    }
    .loader div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
    }
    @keyframes lds-spinner {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>