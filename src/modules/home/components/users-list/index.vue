<template>
    <ul>
        <li v-for="(user, index) in users" :key="index">{{user.name}} {{user.lastname}}</li>
    </ul>
</template>

<script>
    export default {
        name: 'UsersList',
        props: {
            users: {
                type: Array,
                required: true
            }
        },
    };
</script>
