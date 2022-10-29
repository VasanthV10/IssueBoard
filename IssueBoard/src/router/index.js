import { createRouter, createWebHistory } from "vue-router";
import NewIssue from "../components/NewIssue.vue";
import IssuesList from "../components/IssuesList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "issues",
    },
    {
      path: "/issues",
      name: "IssuesList",
      component: IssuesList,
    },
    {
      path: "/newIssue",
      name: "NewIssue",
      component: NewIssue,
    },
   
  ],
});

export default router;
