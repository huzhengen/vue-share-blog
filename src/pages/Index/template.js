import request from '@/helpers/request.js'
import blog from '@/api/blog.js'




export default {
    data(){
        return {
            blogs:[]
        }
    },
    created(){
        blog.getIndexBlogs().then(res=>{
            this.blogs = res.data
        })
    },
    methods:{

    }
};