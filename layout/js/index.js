const {remote} = require('electron');

let _id = 0;
// const base_url = 'http://127.0.0.1:3001'
const base_url = 'http://todos.xiaosunan.cn'



new Vue({
    el: '#root',
    data: {
        title: 'TODOS',
        type: 'all',    //all, done, undone
        newTodo: '',
        todos: [
            //{title: '任务标题', done: true}
        ]
    },
    computed: {
        showTodos() {
            return this.todos.filter(todo => {
                switch(this.type) {
                    default:
                    case 'all':
                        return true;
                    case 'done':
                        return todo.status;
                    case 'undone':
                        return !todo.status;
                }
            });
        }
    },
    methods: {
        // 关闭应用
        closeApp() {
            // app对象只能通过主线程调用
            remote.app.exit();
        },
        // 最小化应用窗口
        miniApp() {
            // 通过remote下的一个方法来获取当前窗口对象（BrowserWindow）
            remote.getCurrentWindow().minimize();
        },
        getTodos(type) {
          axios.get(base_url+ '/getTodos',  {
            params: {
              status: type || 2
            }
          }).then(res => {
            this.todos = res.data.data
          })
        },
        // 添加任务
        addTodo() {
            axios.post(base_url+ '/add', {
              content: this.newTodo
            })
            .then((response)=> {
              console.log(response);
              this.todos.unshift(
                response.data.data
              );
            })
            .catch(function (error) {
              console.log(error);
            });
            this.newTodo = '';
        },

        // 任务状态切换
        toggle(todo) {
          axios.post(base_url+ '/toogle', {
            id: todo.id
          }).then(res => {
            console.log(res.data.data.status)
            todo.status = res.data.data.status
          })
        },
        // 移除任务
        remove(todo) {
            // 保留下来，todos中与传入的todo不一样的任务
            axios.post(base_url+ '/delete', {
              id: todo.id
            }).then(res => {
              console.log(res)
              if(res.data.code==0) {
                this.todos = this.todos.filter( item => item != todo );
              }
            })
        },

        // 更改查看的任务类型
        choose(type) {
            this.type = type;
        }
    },
    mounted() {
      this.getTodos()
    },
});
