
<template>
    <div class="screen">
        <h1>List Of Issues :</h1>
        <div class = "button">
            <button @click="newIssue()"> Create New Issue</button>
        </div>
        <div v-bind:key="issue.title" v-for="(issue,index) in items" class="list">
            <h2> Title : {{issue.title}} </h2>
            <h2> Description : {{issue.description}} </h2>
            <button :id = "'edit' + index" @click="editButton()" class = "editButton"> edit </button>
            <button :id = "'delete' + index" @click="deleteButton()" class = "deleteButton"> delete </button>
        </div>
    </div>
</template>

<script>
import NewIssue from './NewIssue.vue';
import router from "../router/index.js";

export default {
    name: "IssuesList",
    setup() {
        function newIssue() {
            router.push("/newIssue");
        }
        function editButton() {
            router.push("/newIssue/title");
        }
        function deleteButton() {
            var deleteData = JSON.parse(localStorage.getItem("issues"));
            localStorage.removeItem("issues");
        }
        return {
            items: JSON.parse(localStorage.getItem("issues")),
            newIssue,
            editButton,
            deleteButton,
        };
    },
    components: { NewIssue }
}
</script>

<style scoped>
.screen {
    margin : 0px;
    width :100%;
    height : 100%;
    
}
.button {
    display:inline-block;
    width: 150px;
    height: 40px;
}
.list {
    display: block;
    height: 80px;
    width: 100%;
    border: 2px solid;
    background-color: aliceblue;
    position: relative;
    font-size: 12px;
}
.editButton {
    position: absolute;
    right: 150px;
    top: 25px;
    width: 100px;
    height: 30px;
    border-radius: 3px;
    border-color: blue;
    font-size: medium;
}
.editButton:hover {
    background-color: lightcyan;
}
.deleteButton {
    position: absolute;
    right: 40px;
    top: 25px;
    width: 100px;
    height: 30px;
    border-radius: 3px;
    border-color: blue;
    font-size: medium;

}
.deleteButton:hover {
    background-color: lightcyan;
}
</style>
