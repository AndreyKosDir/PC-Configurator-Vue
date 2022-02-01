<template>
    <span v-bind:class="direct" @click="click">{{info.text}}</span>
</template>

<script>
    export default {
        name: "Button2",
        props: ['info', 'direct'],
        data() {
            return {
                direction: this.direct
            }
        },
        methods: {
            click() {
                if (this.direction === 'ascending') {
                    this.direction = 'descending';
                } else if (this.direction === 'descending') {
                    this.direction = '';
                } else {
                    this.direction = 'ascending'
                }

                this.$emit('click', this.info.id, this.direction);
            }
        }
    }
</script>

<style scoped>

    span {
        padding: 0;
        cursor: pointer;
        font-weight: bold;
        color: teal;
        font-size: 18px;
    }

    span:hover {
        color: black;
    }

    .ascending:after {
        position: absolute;
        margin-left: 5px;
        content: '▲'

    }

    .descending:after {
        position: absolute;
        margin-left: 5px;
        content: '▼'
    }
</style>