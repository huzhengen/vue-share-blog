import blog from '@/api/blog.js'

export default {
    data() {
        return {
            blogs: [],
            user: {},
            page: 1,
            total: 0,
        }
    },
    created() {
        this.userId = this.$route.params.userId
        this.page = this.$route.query.page || 1
        blog.getBlogsByUserId(this.userId, { page: this.page }).then(res => {
            this.blogs = res.data
            this.page = res.page
            this.total = res.total
            if (res.data.length > 0) {
                this.user = res.data[0].user
            }
        })
    },
    methods: {
        splitDate(dateStr) {
            let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
            return {
                date: dateObj.getDate(),
                month: dateObj.getMonth() + 1,
                year: dateObj.getFullYear()
            }
        },
        onPageChange(newPage) {
            console.log(newPage)
            blog.getBlogsByUserId(this.userId, { page: newPage }).then(res => {
                this.blogs = res.data
                this.page = res.page
                this.total = res.total
                if (res.data.length > 0) {
                    this.user = res.data[0].user
                }
                this.$router.push({ path: `/user/${this.userId}`, query: { page: newPage } })
            })
        },
    }
};