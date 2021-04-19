<template>
  <div class="add__container">
    <transition name="fade">
      <Toast v-if="isAdded">
        <div>
          <strong>{{ newLink.name }}</strong> <span>added.</span>
        </div>
      </Toast>
    </transition>
    <div class="add__container--backtolist mt-2">
      <i class="fas fa-arrow-left" @click="returnList"></i>
      <span @click="returnList">Return to List</span>
    </div>
    <div class="add__container--title mt-2">Add New Link</div>
    <div class="mt-2">
      <div class="add-label">Link Name:</div>
      <input class="add-input" type="text" v-model="newLink.name" placeholder="e.g. Alphabet"/>
    </div>
    <div class="mt-2">
      <div class="add-label">Link URL:</div>
      <input class="add-input" type="text" v-model="newLink.link" placeholder="e.g. http://abc.xyz"/>
    </div>
    <div class="add__container--btn mt-2">
      <button @click="addLink">Add</button>
    </div>
  </div>
</template>

<script>
import Toast from '../components/Toast';
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'AddLink',
  data() {
    return {
      newLink: {
        id: null,
        name: '',
        link: '',
        points: 0,
        vote: 0,
        date: null,
      },
      isAdded: false,
      duration: 2000,
    };
  },
  components: {
    Toast,
  },
  watch: {
    isAdded() {
      if (this.isAdded) {
        if (this.duration > 0) {
          setTimeout(() => {
            this.isAdded = false;
          }, this.duration);
        }
      }
    },
  },
  methods: {
    returnList() {
      this.$router.push('/');
    },
    addLink() {

      let links = [];
      let data = [];
      this.newLink.id = uuidv4();
      this.newLink.date = new Date();

      if (localStorage.getItem('links')){
        links = JSON.parse(localStorage.getItem('links'));
        links.forEach(item => {
          item.data.push(this.newLink)
          item.count = item.data.length;
        });
      } else{
        links = [];
        data.push(this.newLink);
        links = new Array({count:data.length, page:1, data: [...data]});
      }
      localStorage.setItem('links', JSON.stringify(links));
      this.isAdded = true;
    },
  }
};
</script>