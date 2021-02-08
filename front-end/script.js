const url = "http://localhost:3000/users/";

const vm = new Vue({
  el: "#app",
  data: {
    users: [],
    msg:"",
    create: {
      name:null,
      age:null
    },
  },
  async mounted(){
    axios.get(url).then(res => {
      this.users = res.data
    })
    console.log(this.users);
  },
  methods:{
    async deleteUser(index){
      const id = this.users[index]._id;
      console.log(url + id);
      await axios.delete(url + id).then(req => {
        console.log(req);
      });
      this.users.splice(index,1);
    },
    async createUser(){
      await axios.post(url,this.create);
      await axios.get(url).then(res => {
      this.users = res.data;
      })
    },
    async updateUser(index) {
      const id = this.users[index]._id;
      await axios.put(url + id, this.users[index]);
    }
  }
})