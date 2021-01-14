<template>
  <div class="container">
    <form @submit.prevent="postComment" enctype="multipart/form-data">
      <div class="row">
        <div class="col-12 spacer2"></div>
        <div class="col-6 text-left">
          <h2>Review</h2>
        </div>
        <div class="col-6">
          <div class="ml-auto" style="width: fit-content">
              <star-rating
              v-model="comment.review_star"
              :star-size="30"
              :show-rating="false"
              ></star-rating>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <input
            type="text"
            v-model="comment.name"
            placeholder="Tulis nama kamu"
            class="w-100 b-0 grey set-input"
          />
        </div>
        <div class="col-12 spacer2"></div>
        <div class="col-12">
          <textarea
            cols="40"
            rows="6"
            placeholder="Tulis Review terbaikmu"
            v-model="comment.review_comment"
            class="w-100 grey set-input b-0"
          >
          </textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-4 position-relative">
          <div class="inputfiles h-100 grey">Upload Files</div>
          <input class="position-absolute input" type="file" @change="imgProcess($event)" multiple />
        </div>
        <div class="col-4 ml-auto">
          <button class="w-100 btn" type="submit">Kirim</button>
        </div>
      </div>
    </form>

    <hr style="border: 0.2px black solid" />

    <div
      v-for="(dataComment, index) in dataReview.slice().reverse()"
      :key="index + 'a'"
    >
      <Comment :propsComment="dataComment" :load="load" @delete="delComment" @edit="editComment"/>
    </div>

    <div>
      <b-modal title="Edit Review" hide-footer centered ref="edit-modal">
        <form @submit.prevent="postEditComment" enctype="multipart/form-data">
          <div class="row">
            <div class="col-6">
              <h2>Review</h2>
            </div>
            <div class="col-6">
              <div class="ml-auto" style="width: fit-content">
              <star-rating
              v-model="editReview.review_star"
              :star-size="30"
              :show-rating="false"
              >asasas</star-rating>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <input
                type="text"
                v-model="editReview.name"
                placeholder="Tulis nama kamu"
                class="grey set-input w-100"
              />
            </div>
            <div class="col-12 spacer2"></div>
            <div class="col-12">
              <textarea
                cols="40"
                rows="6"
                placeholder="Tulis Review terbaikmu"
                class="grey set-input w-100"
                v-model="editReview.review_comment"
              >
              </textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-4 position-relative">
              <div class="inputfiles h-100 grey">Upload Files</div>
              <input class="position-absolute input" type="file" @change="imgProcessEdit($event)" multiple />
            </div>
            <div class="col-4 ml-auto">
              <button type="submit" class="w-100 btn">Kirim</button>
            </div>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Comment from '@/components/Comment.vue'
import { mapActions, mapGetters } from 'vuex'

import StarRating from 'vue-star-rating'

export default {
  name: 'Home',
  components: {
    Comment,
    StarRating
  },
  data () {
    return {
      load: true,
      comment: {
        name: '',
        review_comment: '',
        review_star: null,
        images: null
      },
      editReview: {
        name: '',
        review_comment: '',
        review_star: null,
        images: null,
        id_user: null
      },
      editModal: false
    }
  },
  methods: {
    ...mapActions({
      getDataReview: 'review/getReview',
      postDataReview: 'review/postComment',
      deleteDataReview: 'review/deleteComment',
      editDataReview: 'review/editComment'
    }),
    postComment () {
      this.postDataReview(this.comment)
        .then((res) => {
          alert(res.msg)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    imgProcess () {
      this.comment.images = event.target.files
    },
    imgProcessEdit () {
      this.editReview.images = event.target.files
    },
    delComment (id) {
      this.deleteDataReview(id)
        .then((res) => {
          alert(res.msg)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editComment (id) {
      this.editReview.id_user = id
      this.showModal()
    },
    showModal () {
      this.$refs['edit-modal'].show()
    },
    postEditComment () {
      this.editDataReview(this.editReview)
        .then((res) => {
          alert(res.msg)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getDataReview().then((res) => {
      res.data.map((e) => {
        const created = new Date(e.created_at)
        e.date = created.toLocaleString('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        e.generateStar = new Array(e.review_star)
      })
      this.load = false
    })
  },
  computed: {
    ...mapGetters({
      dataReview: 'review/getReview'
    })
  }
}
</script>

<style scoped>
.btn {
  background: #c4c4c4;
  border-radius: 0;
}
.grey{
  background: #c4c4c4;
}
.inputfiles {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  left: 15px;
  top: 0px;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.set-input {
  border: none;
  padding: 15px;
}

</style>
