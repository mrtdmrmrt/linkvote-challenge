<template>
  <div class="home__container">
    <transition name="fade">
      <Toast v-if="isRemove">
        <div>
          <strong>{{ removeCardData.name }}</strong> <span>removed.</span>
        </div>
      </Toast>
    </transition>
    <div class="add__wrapper">
      <button @click="addLikPage">+</button>
      <div class="add__wrapper--title">Submit a link</div>
    </div>
    <div class="hr"></div>
    <div v-if="paginationData" class="list__warapper">
      <select v-model="selectedOption" required @change="changeOption">
        <option value="" disabled selected hidden>Order By...</option>
        <option value="mostVoted">Most Voted (Z -> A)</option>
        <option value="lessVoted">Less Voted (A -> Z)</option>
      </select>
      <div
        class="card__wrapper"
        v-for="(item, key) in paginationData.querySet"
        :key="key"
      >
        <div class="card__wrapper--delete" @click="activeModal(item)">
          <i class="fas fa-minus-circle"></i>
        </div>
        <div class="card__wrapper--scor">
          <div class="card__wrapper--scor-point">{{ item.points }}</div>
          <div class="card__wrapper--scor-name">Points</div>
        </div>
        <div class="card__wrapper--info">
          <div class="card__wrapper--info-name">{{ item.name }}</div>
          <div class="card__wrapper--info-link">{{ item.link }}</div>
          <div class="card__wrapper--info-vote">
            <div @click="incPoint(item)">
              <i class="fas fa-arrow-up"></i> <span>Up Vote</span>
            </div>
            <div @click="decPoint(item)">
              <i class="fas fa-arrow-down"></i> <span>Down Vote</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="paginationData" class="pagination__wrapper">
      <ul class="pagination__wrapper--list">
        <li class="pagination__wrapper--list-prev" @click="prevPagination">&lt;</li>
        <li
          class="pagination__wrapper--list-item"
          v-for="(page, key) in paginationData.pages"
          :key="key"
          @click="changePagination(page)"
          :class="{'active-pagination': page == activePage}"
        >
          {{ page }}
        </li>
        <li class="pagination__wrapper--list-next" @click="nextPagination">&gt;</li>
      </ul>
    </div>
    <div v-if="isClosableModal" class="modal--mask">
      <div class="modal--wrapper">
        <div class="modal--container">
          <div class="modal--header">
            Remove Link
            <i
              class="modal--icon fa fa-times"
              role="button"
              @click="closeModal"
              @keyup.esc="closeModal"
            ></i>
          </div>

          <div class="modal--body">
            <div class="modal--body--content">
              <div class="modal--body--content-msg">Do you want to remove:</div>
              <div class="modal--body--content-name">
                {{ removeCardData.name }}
              </div>
            </div>
          </div>

          <div class="modal--footer">
            <div class="modal--footer--wrapper">
              <button class="modal--footer--wrapper-btn" @click="removeCard">
                OK
              </button>
              <button class="modal--footer--wrapper-btn" @click="closeModal">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../components/Toast';
import {
  sortDate,
  sortPoint,
  mostVotedName,
  lessVotedName,
} from '../helpers/index';
export default {
  name: 'Home',
  data() {
    return {
      selectedOption: '',
      links: [],
      isRemove: false,
      duration: 2000,
      removeCardData: '',
      isClosableModal: false,
      paginationData: null,
      activePage:1
    };
  },
  components: {
    Toast,
  },
  filters: {
    toUppercase(value) {
      return value.toUpperCase();
    },
  },
  watch: {
    isRemove() {
      if (this.isRemove) {
        if (this.duration > 0) {
          setTimeout(() => {
            this.isRemove = false;
          }, this.duration);
        }
      }
    },
  },
  methods: {
    closeModal() {
      this.isClosableModal = false;
    },
    changeOption() {
      if (this.selectedOption == 'mostVoted') {
        //mostVotedName(this.links[0].data);
        mostVotedName(this.paginationData.querySet);
      } else {
        //lessVotedName(this.links[0].data);
        lessVotedName(this.paginationData.querySet);
      }
    },
    addLikPage() {
      this.$router.push('/addlink');
    },
    activeModal(item) {
      this.isClosableModal = true;
      this.removeCardData = item;
    },
    removeCard() {
      let tmpLinks = [];

      tmpLinks = this.links.filter((card) => card.id != this.removeCardData.id);

      localStorage.setItem('links', JSON.stringify(tmpLinks));
      this.links = tmpLinks;
      this.isRemove = true;
      this.closeModal();
    },
    incPoint(card) {
      this.links[0].data.forEach((item) => {
        if (item.id == card.id) {
          item.points += 1;
          setTimeout(() => {
            //sortPoint(this.links[0].data);
            sortPoint(this.paginationData.querySet);
          }, 1000);
        }
      });
      localStorage.setItem('links', JSON.stringify(this.links));
    },
    decPoint(card) {
      this.links[0].data.forEach((item) => {
        if (item.id == card.id) {
          if (item.points > 0) {
            item.points -= 1;
            setTimeout(() => {
              //sortPoint(this.links[0].data);
              sortPoint(this.paginationData.querySet);
            }, 1000);
          }
        }
      });
      localStorage.setItem('links', JSON.stringify(this.links));
    },
    pagination(querySet, page = 1, rows = 5) {
      let trimStart = (page - 1) * rows;
      let trimEnd = trimStart + rows;

      let trimmedData = querySet.slice(trimStart, trimEnd);

      let pages = Math.ceil(querySet.length / rows);

      this.paginationData = {
        querySet: trimmedData,
        pages: pages,
      };
      sortDate(this.paginationData.querySet);
      this.selectedOption='';
    },
    changePagination(page){
      this.pagination(this.links[0].data, page, 5)
      this.activePage = page;
    },
    prevPagination(){
      if(this.activePage > 1){
        this.changePagination(--this.activePage);
      }
    },
    nextPagination(){
      if(this.activePage < this.paginationData.pages){
        this.changePagination(++this.activePage);
      }
    }
  },
  created() {
    this.links = JSON.parse(localStorage.getItem('links'));
    //sortDate(this.links[0].data);
    if(this.links) this.pagination(this.links[0].data, 1, 5);
  },
};
</script>