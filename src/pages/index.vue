<template>
    <div id="app">
        my vue app
        <p>
            {{ msg }}
            {{ timer }}
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "hello vue",
                timer: 0
            };
        },
        mounted() {
            this.add();
        },
        methods: {
            add() {
                setTimeout(() => {
                    this.timer++;
                    this.add();
                }, 1000);
            }
        }
    };
</script>

<style lang="less">
    #app {
        color: aquamarine;
    }
</style>