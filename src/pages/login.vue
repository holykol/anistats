<template>
   <Form :isLogin="true"/>
</template>

<script>
   import Form from '../components/Form'

   export default {
      name: 'Join',
      components: {
         Form,
      },
   }
</script>